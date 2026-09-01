import { useState } from 'react'

type Item = { name: string; eyebrow: string; title: string; body: string }

// Реальный контент нарисован в макете только у «Храп и дыхание ртом».
// Остальные — в той же стилистике (черновик), заменить финальным текстом.
const items: Item[] = [
  {
    name: 'Аденоиды',
    eyebrow: 'Аденоиды',
    title: 'Когда операция правда нужна — а когда её торопят',
    body: 'Разберём, что реально считается показанием к удалению, а что можно наблюдать. И какие вопросы задать врачу, чтобы решать осознанно, а не из страха.',
  },
  {
    name: 'Храп и дыхание ртом',
    eyebrow: 'Храп и дыхание ртом',
    title: 'Норма или тревога — и что делать прямо сейчас',
    body: 'Поймёте, когда храп это возрастное, а когда сигнал. Разберём упражнения и простые шаги, которые можно начать применять уже сегодня.',
  },
  {
    name: 'Частые отиты',
    eyebrow: 'Частые отиты',
    title: 'Почему отиты повторяются — и как разорвать цепочку',
    body: 'Разберём, что усиливает риск отитов и как выстроить тактику, чтобы не лечить одно и то же по кругу.',
  },
  {
    name: 'Бесконечные ОРВИ',
    eyebrow: 'Бесконечные ОРВИ',
    title: 'Почему ребёнок болеет кругами',
    body: 'Поймёте, что стоит за «постоянными простудами», когда это норма адаптации, а когда сигнал разобраться глубже.',
  },
  {
    name: 'Антибиотики',
    eyebrow: 'Антибиотики',
    title: 'Когда антибиотик нужен, а когда нет',
    body: 'Научитесь понимать логику назначений и задавать врачу правильные вопросы — без лишних препаратов «на всякий случай».',
  },
]

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-5 w-5 shrink-0 text-brown transition-transform ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 8 L10 13 L15 8" />
    </svg>
  )
}

export default function WorryTabs() {
  const [open, setOpen] = useState(1)

  return (
    <section className="bg-[#fcf5e9] px-5 pt-4 pb-6">
      <h2 className="h-display text-[20px] leading-[1.05] text-brown">
        Что вас <span className="text-accent">тревожит</span> больше всего?
      </h2>
      <p className="mt-2 text-[13px] leading-snug text-brown-soft">
        Нажмите на свою тему — покажу, что станет понятно после курса.
      </p>

      <div className="mt-4 flex flex-col gap-2">
        {items.map((it, i) => {
          const active = i === open
          return (
            <div key={it.name} className="overflow-hidden rounded-[12px]">
              <button
                type="button"
                onClick={() => setOpen(active ? -1 : i)}
                className="flex w-full items-center justify-between bg-white px-4 py-3 text-left"
              >
                <span className="text-[14px] text-brown">{it.name}</span>
                <Chevron open={active} />
              </button>

              {active && (
                <div className="border-2 border-accent bg-[#fdf6ea] px-4 pb-4 pt-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-accent">
                    {it.eyebrow}
                  </p>
                  <h3 className="mt-1.5 text-[13px] font-extrabold uppercase leading-snug text-brown">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-[11px] leading-[1.45] text-brown-soft">
                    {it.body}
                  </p>
                  <span className="mt-3 inline-block rounded-[10px] bg-[#c87654] px-4 py-2 text-[11px] text-white">
                    Модуль «{it.name}»
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
