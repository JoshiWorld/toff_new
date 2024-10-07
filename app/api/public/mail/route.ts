import { NextResponse } from "next/server";
import { EmailService } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { name, email, company, content } = await req.json();

    if(!name || !email || !content) {
        return NextResponse.json(
          { error: "All fields are required" },
          { status: 400 }
        );
    }

    // Create Mail
    const emailService = new EmailService();
    await emailService.sendEmail({
      subject: `TOFF Kontaktformular | ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nFirma: ${company}\nNachricht: ${content}`,
      html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Firma:</strong> ${company}</p>
            <p><strong>Nachricht:</strong> ${content}</p>
        `,
    });

    return NextResponse.json({ success: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
