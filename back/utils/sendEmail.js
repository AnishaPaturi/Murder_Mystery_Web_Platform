import nodemailer from "nodemailer";

export const sendMfaEmail = async (toEmail, otpCode) => {
  // Check if SMTP configuration exists in .env
  const hasSmtpConfig = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

  if (!hasSmtpConfig) {
    console.log(`\n============================================================`);
    console.log(`[SMTP CONFIG NOTICE] SMTP host/credentials not fully set in backend .env.`);
    console.log(`[EMAIL BYPASS LOG] Verification code for ${toEmail} is:`);
    console.log(`🚨 >>>  ${otpCode}  <<< 🚨`);
    console.log(`============================================================\n`);
    return false;
  }

  // Create transporter configuration
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true for port 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM || '"The Bytes of Wrath" <no-reply@bytesofwrath.org>',
    to: toEmail,
    subject: "[The Bytes of Wrath] Security Authentication Passcode",
    html: `
      <div style="background-color: #0a0a0f; color: #e8e6e3; padding: 40px; font-family: monospace; border: 2px solid #8b0000; max-width: 600px; margin: 0 auto; border-radius: 8px;">
        <h2 style="color: #8b0000; font-family: serif; font-style: italic; border-bottom: 1px solid #8b0000; padding-bottom: 10px; margin-top: 0;">The Bytes of Wrath</h2>
        <p style="font-size: 14px; line-height: 1.6;">A login request was initiated for your detective account. Use the following decryption passcode to authorize access:</p>
        <div style="background-color: #16161d; border: 1px solid #8b0000; padding: 20px; text-align: center; margin: 30px 0; border-radius: 4px;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #ff3b3b; text-shadow: 0 0 10px rgba(255, 59, 59, 0.4);">${otpCode}</span>
        </div>
        <p style="font-size: 11px; color: #9ca3af;">This passcode is valid for 5 minutes. If you did not request this access, please inspect security logs immediately.</p>
        <hr style="border-color: #8b0000; border-style: solid; border-width: 0.5px; margin-top: 30px;" />
        <p style="font-size: 10px; color: #555; text-align: center; margin-bottom: 0;">BYTECORP SECURITY SYSTEM MAINFRAME | CASE FILE #2026-042</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[SMTP SUCCESS] MFA passcode sent successfully to ${toEmail}. MessageID: ${info.messageId}`);
    return true;
  } catch (err) {
    console.error("❌ SMTP ERROR sending email:", err.message);
    console.log(`[EMAIL FALLBACK] Verification code for ${toEmail} is: ${otpCode}`);
    return false;
  }
};
