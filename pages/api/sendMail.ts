import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Метод не разрешён" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Все поля обязательны" });
  }

  try {
    console.log("📨 Подключение к SMTP...");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // для Gmail обязательно true
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log("✅ SMTP готов, отправляем письмо...");

    const info = await transporter.sendMail({
      from: `"Eco Med Service" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      subject: "Новая заявка с сайта",
      text: `
        Имя: ${name}
        Email: ${email}
        Сообщение: ${message}
      `,
      html: `
        <h3>Новая заявка с сайта</h3>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Сообщение:</strong> ${message}</p>
      `,
    });

    console.log("📧 Письмо успешно отправлено:", info.messageId);

    return res.status(200).json({ message: "Письмо отправлено!" });
  } catch (error: any) {
    console.error("❌ Ошибка при отправке письма:", error);
    return res.status(500).json({
      message: "Ошибка при отправке письма",
      error: error.message || error.toString(),
    });
  }
}
