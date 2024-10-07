import nodemailer from "nodemailer";

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Send email
  public async sendEmail({
    subject,
    text,
    html,
  }: {
    subject: string;
    text?: string;
    html?: string;
  }): Promise<void> {
    const to = process.env.SMTP_TO;

    try {
      const mailOptions = {
        from: `TOFF-Website <${process.env.SMTP_FROM}>`,
        to,
        subject,
        text,
        html,
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error("Error sending email", error);
      throw new Error("Failed to send email");
    }
  }
}
