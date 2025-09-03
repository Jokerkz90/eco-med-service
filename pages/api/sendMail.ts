// pages/api/sendMail.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Метод не разрешён" });
  }

  const { name, company, phone, email } = req.body;

  if (!name || !company || !phone || !email) {
    return res.status(400).json({ message: "Все поля обязательны" });
  }

  try {
    // Настройка SMTP через Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // ecomedkaraganda@gmail.com
        pass: process.env.EMAIL_PASS, // пароль приложения
      },
    });

    // Формируем письмо
    await transporter.sendMail({
      from: `"ECO MED SERVICE" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO, // получатель (может быть тот же email)
      subject: "Новая заявка с сайта",
      text: `
Имя: ${name}
Организация: ${company}
Телефон: ${phone}
Email: ${email}
      `,
    });

    return res.status(200).json({ message: "✅ Письмо успешно отправлено!" });
  } catch (error) {
    console.error("Ошибка при отправке:", error);
    return res.status(500).json({ message: "❌ Ошибка при отправке письма" });
  }
}
