type Review = { name: string; text: string }

// Тексты — реальные отзывы из макета (Telegram-скрины). Длинные подтверждены
// по «Alёna»; остальные — по раннему рендеру, сверить при финале.
const reviews: Review[] = [
  {
    name: 'Alёna',
    text: `Здравствуйте 🤝 Маржанат Магомедовна, до того как я всё таки решила прийти на курс, у меня уже было три ваших гайда — Аденоиды, Хронический тонзиллит, Гайморит. Приятно и понятно вас слушать, скачала все гайды, и если что всегда можно открыть и сразу знаешь как нужно действовать, шпаргалка :) За эту осень 2024 г. у ребёнка уже было три ОРВИ, проходили в лёгкой форме — а раньше были затяжные, с температурой и антибиотиками.`,
  },
  {
    name: 'Елена Терешенко',
    text: `Всем привет! 🙋 Я купила курс из-за проблем с аденоидами у дочки. На курсе был гайд в подарок — и не пожалела, что пошла к доктору Маржанат Магомедовне! Супер специалист, всё чётко и конкретно по каждому заболеванию. Если ребёнок заболеет, я уже знаю, что делать 👍 Наконец-то разобрались со своими аденоидами! Лучший доктор 🥰`,
  },
  {
    name: 'Отзыв из Telegram',
    text: `Маржанат, спасибо огромное за гайд «Аденоиды» ❤️ Сын около 6 мес на безглютеновом и безлактозном питании. В вашем гайде открыла для себя, что пармезан — безлактозный сыр. Информация в гайде наиценнейшая! Узнала много интересного про аденоиды. Спасибо за ваш труд ❤️`,
  },
  {
    name: 'Kristina',
    text: `Присоединяюсь ко всем поздравлениям 🎉 У девочки (1,8) появились сопельки. Подключила схему из курса — и о чудо, ребёнок справился за 4 дня! Крайний раз болел 3 недели! Средства действительно работают, ребёнок все ночи спал спокойно. Для меня это большая радость!`,
  },
]

export default function Reviews() {
  return (
    <section className="bg-[#fcf5e9] pb-10 pt-4">
      <h2 className="h-display px-5 text-[28px] leading-[1.05] text-brown">
        Что говорят <span className="text-accent">мамы</span>,
        <br />
        <span className="text-accent">которые прошли курс:</span>
      </h2>

      {/* Шапка-пилл */}
      <div className="mx-5 mt-6 flex items-center justify-between rounded-full bg-white px-4 py-3">
        <span className="flex items-center gap-2 text-[16px] text-brown">
          <span className="text-accent">✈</span> Отзывы из Telegram
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-[#eaf6ea] px-3 py-1 text-[13px] font-medium text-green-700">
          ✓ реальные
        </span>
      </div>

      {/* Карусель */}
      <div className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none]">
        {reviews.map((r, i) => (
          <article
            key={i}
            className="w-[290px] shrink-0 snap-start rounded-[20px] bg-white p-5"
          >
            <p className="text-[15px] font-bold text-[#3a8ac0]">{r.name}</p>
            <p className="mt-2 whitespace-pre-line text-[14px] leading-relaxed text-brown">
              {r.text}
            </p>
          </article>
        ))}
      </div>
      <p className="px-5 text-[12px] text-brown/40">← листайте отзывы →</p>
    </section>
  )
}
