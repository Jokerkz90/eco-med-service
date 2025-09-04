import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, phone, company, email } = req.body as {
    name?: string;
    phone?: string;
    company?: string;
    email?: string;
  };

  // Обязательны только name и phone
  if (!name || !phone) {
    return res.status(400).json({ message: "Нужно заполнить: имя и телефон" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Eco Med Service" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      subject: "Новая заявка с сайта",
      html: `
        <h3>Новая заявка с сайта</h3>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Компания:</strong> ${company || "-"}</p>
        <p><strong>Email:</strong> ${email || "-"}</p>
      `,
    });

    return res.status(200).json({ message: "Письмо отправлено!" });
  } catch (error: any) {
    console.error("❌ Ошибка при отправке письма:", error);
    return res.status(500).json({
      message: "Ошибка при отправке письма",
      error: error.message || String(error),
    });
  }
}
