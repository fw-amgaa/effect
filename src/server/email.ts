import { createServerFn } from "@tanstack/react-start"
import { sendMail } from "@/lib/mail"
import { db } from "@/lib/db"
import { patientTests, patients, testFiles } from "@/lib/db/schema"
import { eq, inArray } from "drizzle-orm"

export const sendBulkTestResultEmail = createServerFn({ method: "POST" })
  .inputValidator((data: { testIds: string[]; patientId: string }) => data)
  .handler(async ({ data }) => {
    if (data.testIds.length === 0) return { error: "Шинжилгээ сонгоогүй байна" }

    const [patient] = await db
      .select()
      .from(patients)
      .where(eq(patients.id, data.patientId))

    if (!patient) return { error: "Үйлчлүүлэгч олдсонгүй" }
    if (!patient.email)
      return { error: "Үйлчлүүлэгчийн имэйл хаяг байхгүй байна" }

    const tests = await db
      .select()
      .from(patientTests)
      .where(inArray(patientTests.id, data.testIds))

    if (tests.length === 0) return { error: "Шинжилгээ олдсонгүй" }

    // Fetch all files for these tests
    const files = await db
      .select()
      .from(testFiles)
      .where(inArray(testFiles.testId, data.testIds))

    const testsWithFiles = tests.map((test) => ({
      ...test,
      files: files.filter((f) => f.testId === test.id),
    }))

    // Filter tests that have at least one file
    const testsWithResults = testsWithFiles.filter((t) => t.files.length > 0)
    if (testsWithResults.length === 0)
      return { error: "Файлтай шинжилгээ олдсонгүй" }

    const testRows = testsWithResults
      .map((test, idx) => {
        const fileLinks = test.files
          .map(
            (file) =>
              `<tr>
                <td style="padding:6px 0 6px 24px;">
                  <a href="${file.fileUrl}" style="display:inline-flex;align-items:center;gap:8px;color:#1960a3;text-decoration:none;font-size:13px;font-weight:500;">
                    <img src="https://img.icons8.com/fluency/24/pdf.png" width="20" height="20" alt="PDF" style="vertical-align:middle;" />
                    ${file.fileName}
                  </a>
                </td>
              </tr>`,
          )
          .join("")

        return `
          <tr>
            <td style="padding:${idx === 0 ? "0" : "16px"} 0 8px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
                <tr>
                  <td style="background-color:#f8fafc;padding:12px 16px;border-bottom:1px solid #e2e8f0;">
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td>
                          <span style="font-size:14px;font-weight:600;color:#0b1c30;">${test.testType}</span>
                        </td>
                        <td align="right">
                          <span style="font-size:11px;color:#64748b;font-weight:500;">${test.files.length} файл</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 16px 12px;">
                    <table cellpadding="0" cellspacing="0" width="100%">
                      ${fileLinks}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
      })
      .join("")

    try {
      const testCount = testsWithResults.length
      const subject =
        testCount === 1
          ? `Шинжилгээний хариу - ${testsWithResults[0].testType}`
          : `Шинжилгээний хариу - ${testCount} шинжилгээ`

      await sendMail({
        to: patient.email,
        subject,
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
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#00639c 0%,#004a75 100%);padding:28px 32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">Эффект Эмнэлэг</h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:12px;font-weight:500;">Шинжилгээний хариу</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <!-- Greeting -->
              <h2 style="margin:0 0 8px;font-size:18px;color:#0b1c30;font-weight:700;">Сайн байна уу, ${patient.lastName} ${patient.firstName}!</h2>
              <p style="margin:0 0 24px;font-size:14px;color:#475569;line-height:1.6;">
                Таны ${testCount === 1 ? "шинжилгээний хариу" : `<strong>${testCount}</strong> шинжилгээний хариу`} бэлэн боллоо. Доорх холбоосуудаас татаж авна уу.
              </p>

              <!-- Test results -->
              <table width="100%" cellpadding="0" cellspacing="0">
                ${testRows}
              </table>

              <!-- Info box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
                <tr>
                  <td style="background-color:#f0f9ff;border-radius:10px;padding:14px 16px;border-left:3px solid #4a9fe5;">
                    <p style="margin:0;font-size:12px;color:#475569;line-height:1.5;">
                      Файлууд нь PDF форматтай бөгөөд аюулгүй холбоосоор дамжуулагдсан болно. Асуудал гарвал бидэнтэй холбогдоно уу.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #e2e8f0;text-align:center;background-color:#fafafa;">
              <p style="margin:0 0 4px;font-size:13px;color:#64748b;font-weight:600;">
                Хүндэтгэсэн, Эффект Эмнэлэг
              </p>
              <p style="margin:0;font-size:11px;color:#94a3b8;">
                Энэхүү имэйл нь автоматаар илгээгдсэн болно.
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

      // Mark all tests as email sent
      await db
        .update(patientTests)
        .set({
          emailSent: true,
          emailSentAt: new Date(),
          updatedAt: new Date(),
        })
        .where(inArray(patientTests.id, data.testIds))

      return { error: null }
    } catch (e) {
      console.error("Email send error:", e)
      const message =
        e instanceof Error ? e.message : "Имэйл илгээхэд алдаа гарлаа"
      return { error: message }
    }
  })
