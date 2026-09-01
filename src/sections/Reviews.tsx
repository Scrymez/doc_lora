import { useRef, useState } from 'react'

type Review = { name: string; time: string; text: string; outcome: string }

// Тексты — реальные отзывы из макета (Telegram). «Alёna» подтверждён дословно,
// остальные — сжатые версии, сверить/дополнить при финале (в макете 11 карточек).
const reviews: Review[] = [
  {
    name: 'Alёna',
    time: 'изменено 21:36',
    text: `Здравствуйте 🤝 Маржанат Магомедовна, до того как я всё таки решила прийти на курс, у меня уже было три ваших гайда — Аденоиды, Хронический тонзиллит, Гайморит. Приятно и понятно вас слушать, скачала все гайды, и если что всегда можно открыть и сразу знаешь как нужно действовать, шпаргалка :) За эту осень 2024 г. у ребёнка уже было три ОРВИ, проходили в лёгкой форме, с соплями и кашлем, справлялась за неделю! Хотя предыдущие две осени 2022 и 2023 г. были затяжные ОРВИ, с высокой температурой, а в предыдущую осень 2023 г. были и АБ. Благодарю вас 🙏`,
    outcome:
      'Понятная система действий при ОРВИ — болезни стали короче и легче, без антибиотиков.',
  },
  {
    name: 'Елена Терешенко',
    time: '11:34',
    text: `Всем привет! 🙋 Я купила курс из-за проблем с аденоидами у дочки. На курсе был гайд в подарок — и не пожалела, что пошла к доктору Маржанат Магомедовне! Супер специалист, всё чётко и конкретно по каждому заболеванию. Если ребёнок заболеет, я уже знаю, что делать 👍 Наконец-то разобрались со своими аденоидами! Лучший доктор 🥰`,
    outcome:
      'Разобрались с аденоидами у дочки — есть чёткий план действий при болезнях.',
  },
  {
    name: 'Отзыв из Telegram',
    time: '16:44',
    text: `Маржанат, спасибо огромное за гайд «Аденоиды» ❤️ Сын около 6 мес на безглютеновом и безлактозном питании. В вашем гайде открыла для себя, что пармезан — безлактозный сыр. Информация в гайде наиценнейшая! Узнала много интересного про аденоиды. Спасибо за ваш труд ❤️`,
    outcome: 'Расширили безлактозный рацион сына, больше ясности по аденоидам.',
  },
  {
    name: 'Kristina',
    time: '22:44',
    text: `Присоединяюсь ко всем поздравлениям 🎉 У девочки (1,8) появились сопельки. Подключила схему из курса — и о чудо, ребёнок справился за 4 дня! Крайний раз болел 3 недели! Средства действительно работают, ребёнок все ночи спал спокойно. Для меня это большая радость!`,
    outcome: 'Ребёнок справился с простудой за 4 дня вместо прежних 3 недель.',
  },
]

export default function Reviews() {
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  function onScroll() {
    const el = ref.current
    if (!el) return
    const pitch = el.scrollWidth / reviews.length
    const i = Math.round(el.scrollLeft / pitch)
    setActive(Math.min(reviews.length - 1, Math.max(0, i)))
  }

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
        <span className="rounded-full bg-[#eaf6ea] px-3 py-1 text-[13px] font-medium text-green-700">
          ✓ реальные
        </span>
      </div>

      {/* Карусель */}
      <div
        ref={ref}
        onScroll={onScroll}
        className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none]"
      >
        {reviews.map((r, i) => (
          <article
            key={i}
            className="w-[290px] shrink-0 snap-center rounded-[20px] bg-white p-5"
          >
            <p className="text-[15px] font-bold text-[#3a8ac0]">{r.name}</p>
            <p className="mt-2 whitespace-pre-line text-[14px] leading-relaxed text-brown">
              {r.text}
            </p>
            <p className="mt-3 text-right text-[12px] text-brown/40">{r.time}</p>
          </article>
        ))}
      </div>

      {/* Точки-пагинация */}
      <div className="mt-4 flex justify-center gap-2">
        {reviews.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === active ? 'bg-brown' : 'bg-brown/25'
            }`}
          />
        ))}
      </div>

      {/* Что решило */}
      <div className="mx-5 mt-5 rounded-[20px] bg-[#42281e] p-6">
        <p className="text-[15px] font-extrabold uppercase tracking-wide text-[#f0c88a]">
          Что решило
        </p>
        <p className="mt-2 text-[17px] leading-snug text-[#fdf4e4]">
          {reviews[active].outcome}
        </p>
      </div>
    </section>
  )
}
