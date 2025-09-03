"use client";
import { useState } from "react";
import Image from "next/image";

export default function HomePage() {
  const [lang, setLang] = useState<"ru" | "kz">("ru");
  const [section, setSection] = useState<"home" | "waste" | "contacts">("home");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("Ваше сообщение отправлено!");
      setShowForm(false);
      setFormData({ name: "", company: "", phone: "", email: "" });
    } else {
      alert("Ошибка при отправке. Попробуйте снова.");
    }
  };

  const texts = {
    ru: {
      title: "ТОО «ECO MED SERVICE»",
      subtitle: "Профессиональная утилизация медицинских отходов",
      homeTitle: "Главная",
      home:
        "Мы специализируемся на безопасной и экологичной утилизации медицинских отходов, гарантируя соблюдение всех санитарных норм.",
      wasteTitle: "Медицинские отходы",
      waste:
        "Медицинские отходы делятся на несколько классов в зависимости от уровня опасности:",
      wasteClasses: [
        { title: "Класс А", desc: "Неопасные отходы, близкие по составу к бытовым." },
        { title: "Класс Б", desc: "Опасные отходы: материалы, контактировавшие с кровью и биологическими жидкостями." },
        { title: "Класс В", desc: "Чрезвычайно опасные отходы, в том числе материалы от больных особо опасными инфекциями." },
        { title: "Класс Г", desc: "Отходы, содержащие токсичные вещества, включая лекарства с истёкшим сроком." },
        { title: "Класс Д", desc: "Отходы, содержащие радиоактивные элементы." },
      ],
      contactsTitle: "Контакты",
      address: "г. Караганды, Улица Терешковой, ст-е 1А ",
      phone: "+7 (775) 774-69-06",
      email: "ecomedkaraganda@gmail.com",
      writeUs: "Написать нам",
    },
    kz: {
      title: "«ECO MED SERVICE» ЖШС",
      subtitle: "Медициналық қалдықтарды кәсіби түрде кәдеге жарату",
      homeTitle: "Басты бет",
      home:
        "Біз медициналық қалдықтарды қауіпсіз және экологиялық тұрғыда кәдеге жаратумен айналысамыз, барлық санитарлық нормалардың сақталуына кепілдік береміз.",
      wasteTitle: "Медициналық қалдықтар",
      waste:
        "Медициналық қалдықтар қауіптілік деңгейіне байланысты бірнеше класқа бөлінеді:",
      wasteClasses: [
        { title: "A сыныбы", desc: "Тұрмыстыққа ұқсас қауіпті емес қалдықтар." },
        { title: "Б сыныбы", desc: "Қауіпті қалдықтар: қанмен және биологиялық сұйықтықтармен жанасқан материалдар." },
        { title: "В сыныбы", desc: "Өте қауіпті қалдықтар, оның ішінде аса қауіпті инфекциялары бар науқастардан шыққан материалдар." },
        { title: "Г сыныбы", desc: "Улы заттарды қамтитын қалдықтар, сонымен қатар жарамдылық мерзімі өткен дәрілер." },
        { title: "Д сыныбы", desc: "Радиоактивті элементтері бар қалдықтар." },
      ],
      contactsTitle: "Байланыс",
      address: "Караганды қ., көшесі Терешковой, ст-е 1А",
      phone: "+7 (775) 774-69-06",
      email: "ecomedkaraganda@gmail.com",
      writeUs: "Бізге жазу",
    },
  };

  const t = texts[lang];

  return (
    <main className="wrap">
      <header>
        <div className="brand">
          <Image
            src="/logo.png"
            alt="ECO MED SERVICE"
            width={60}
            height={60}
            className="logo"
          />
          <div>
            <h1>{t.title}</h1>
            <div className="subtitle">{t.subtitle}</div>
          </div>
        </div>

        <nav>
          <button
            className={`nav-btn ${section === "home" ? "active" : ""}`}
            onClick={() => setSection("home")}
          >
            {t.homeTitle}
          </button>
          <button
            className={`nav-btn ${section === "waste" ? "active" : ""}`}
            onClick={() => setSection("waste")}
          >
            {t.wasteTitle}
          </button>
          <button
            className={`nav-btn ${section === "contacts" ? "active" : ""}`}
            onClick={() => setSection("contacts")}
          >
            {t.contactsTitle}
          </button>
        </nav>

        <div className="lang">
          <button
            className={lang === "ru" ? "active" : ""}
            onClick={() => setLang("ru")}
          >
            RU
          </button>
          <button
            className={lang === "kz" ? "active" : ""}
            onClick={() => setLang("kz")}
          >
            KZ
          </button>
        </div>
      </header>

      <section>
        {section === "home" && (
          <div>
            <h2>{t.homeTitle}</h2>
            <p>{t.home}</p>
            <Image
              src="/onas.png"
              alt="Главная"
              width={1200}
              height={400}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "12px",
                marginTop: "1.5rem",
              }}
            />
          </div>
        )}

        {section === "waste" && (
          <div>
            <h2>{t.wasteTitle}</h2>
            <p>{t.waste}</p>
            <ul>
              {t.wasteClasses.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.title}:</strong> {item.desc}
                </li>
              ))}
            </ul>
            <Image
              src="/waste.png"
              alt="Медицинские отходы"
              width={1200}
              height={400}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "12px",
                marginTop: "1.5rem",
              }}
            />
          </div>
        )}

        {section === "contacts" && (
          <div>
            <h2>{t.contactsTitle}</h2>
            <p>{t.address}</p>
            <p>{t.phone}</p>
            <p>{t.email}</p>
            <Image
              src="/contacts.png"
              alt="Контакты"
              width={1200}
              height={400}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "12px",
                marginTop: "1.5rem",
              }}
            />
          </div>
        )}
      </section>

      <footer>© 2025 ECO MED SERVICE</footer>

      {/* Кнопка "Написать нам" */}
      <button
        onClick={() => setShowForm(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#0a5c36",
          color: "white",
          padding: "0.8rem 1.2rem",
          borderRadius: "50px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          zIndex: 999,
        }}
      >
        {t.writeUs}
      </button>

      {/* Модальное окно */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowForm(false)}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              width: "400px",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{t.writeUs}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Имя"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
              />
              <input
                type="text"
                placeholder="Организация"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
                style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
              />
              <input
                type="tel"
                placeholder="Телефон"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
              />
              <button
                type="submit"
                style={{
                  background: "#0a5c36",
                  color: "white",
                  padding: "0.7rem 1.2rem",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
