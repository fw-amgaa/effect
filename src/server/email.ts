import { createServerFn } from "@tanstack/react-start"
import { Resend } from "resend"
import { db } from "@/lib/db"
import { patientTests, patients } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendTestResultEmail = createServerFn({ method: "POST" })
  .inputValidator((data: { testId: string }) => data)
  .handler(async ({ data }) => {
    const [test] = await db
      .select()
      .from(patientTests)
      .where(eq(patientTests.id, data.testId))

    if (!test) return { error: "Шинжилгээ олдсонгүй" }
    if (!test.fileUrl) return { error: "Файл байхгүй байна" }

    const [patient] = await db
      .select()
      .from(patients)
      .where(eq(patients.id, test.patientId))

    if (!patient) return { error: "Өвчтөн олдсонгүй" }
    if (!patient.email) return { error: "Өвчтөний имэйл хаяг байхгүй байна" }

    try {
      const { error } = await resend.emails.send({
        from: "Effect Med <effect.mon@gmail.com>",
        to: patient.email,
        subject: `Шинжилгээний хариу - ${test.testType}`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#ffffff;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background-color:#0f172a;padding:24px 32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;">Effect Med</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <h2 style="margin:0 0 16px;font-size:18px;color:#0f172a;">Сайн байна уу, ${patient.lastName} ${patient.firstName}!</h2>
              <p style="margin:0 0 12px;font-size:14px;color:#334155;line-height:1.6;">
                Таны <strong>${test.testType}</strong> шинжилгээний хариу бэлэн боллоо.
              </p>
              <p style="margin:0 0 24px;font-size:14px;color:#334155;line-height:1.6;">
                Шинжилгээний хариугаа доорх товч дээр дарж татаж авна уу:
              </p>
              <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="background-color:#0f172a;border-radius:8px;padding:12px 24px;">
                    <a href="${test.fileUrl}" style="color:#ffffff;text-decoration:none;font-size:14px;font-weight:500;">
                      Шинжилгээний хариу татах
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94a3b8;">
                Хүндэтгэсэн, Effect Med
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      })

      if (error) {
        console.error("Resend error:", error)
        return { error: `Имэйл илгээхэд алдаа: ${error.message}` }
      }

      await db
        .update(patientTests)
        .set({
          emailSent: true,
          emailSentAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(patientTests.id, data.testId))

      return { error: null }
    } catch (e) {
      console.error("Email send error:", e)
      const message =
        e instanceof Error ? e.message : "Имэйл илгээхэд алдаа гарлаа"
      return { error: message }
    }
  })
