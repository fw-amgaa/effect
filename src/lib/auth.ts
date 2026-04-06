import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { admin } from "better-auth/plugins"
import { db } from "./db"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  basePath: "/api/auth",
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "Effect Med <onboarding@resend.dev>",
        to: user.email,
        subject: "Нууц үг сэргээх - Эффект Эмнэлэг",
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#ffffff;border-radius:12px;overflow:hidden;">
        <tr><td style="background-color:#00639c;padding:24px 32px;text-align:center;">
          <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;">Эффект Эмнэлэг</h1>
        </td></tr>
        <tr><td style="padding:32px;">
          <h2 style="margin:0 0 16px;font-size:18px;color:#0b1c30;">Нууц үг сэргээх</h2>
          <p style="margin:0 0 24px;font-size:14px;color:#334155;line-height:1.6;">
            Таны бүртгэлтэй имэйл хаягаар нууц үг сэргээх хүсэлт ирлээ. Доорх товч дээр дарж шинэ нууц үг тохируулна уу.
          </p>
          <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
            <tr><td style="background-color:#4a9fe5;border-radius:8px;padding:12px 24px;">
              <a href="${url}" style="color:#ffffff;text-decoration:none;font-size:14px;font-weight:500;">
                Нууц үг сэргээх
              </a>
            </td></tr>
          </table>
          <p style="margin:24px 0 0;font-size:12px;color:#94a3b8;line-height:1.6;">
            Хэрэв та энэ хүсэлтийг илгээгээгүй бол энэ имэйлийг үл тоомсорлоно уу.
          </p>
        </td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid #e2e8f0;text-align:center;">
          <p style="margin:0;font-size:12px;color:#94a3b8;">Эффект Эмнэлэг</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      })
    },
  },
  plugins: [admin()],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "staff",
        input: true,
      },
    },
  },
})
