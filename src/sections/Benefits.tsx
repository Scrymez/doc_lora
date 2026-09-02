import type { ReactNode } from 'react'

function Ac({ children }: { children: ReactNode }) {
  return <span className="text-accent">{children}</span>
}

const items: ReactNode[] = [
  <>
    Начнёте <Ac>спать по ночам</Ac> — ребёнок дышит носом, а не храпит
  </>,
  <>
    Перестанете <Ac>гуглить симптомы по ночам</Ac> и накручивать себя
  </>,
  <>
    Придёте к врачу <Ac>подготовленной</Ac> — с вопросами, а не с паникой
  </>,
  <>
    Аптечка <Ac>похудеет</Ac> — уйдут лишние капли и препараты «на всякий случай»
  </>,
  <>
    Реже будете <Ac>сидеть на больничном</Ac> — круг простуд наконец разорвётся
  </>,
]

function Arrow() {
  return (
    <svg
      viewBox="0 0 12 11"
      className="mt-[2px] h-4 w-4 shrink-0"
      fill="none"
      stroke="#a84322"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 1 V6 H10" />
      <path d="M7 3.2 L10 6 L7 8.8" />
    </svg>
  )
}

export default function Benefits() {
  return (
    <section className="benefits-section px-5 pt-2 pb-10">
      <h2 className="font-display text-[16px] font-extrabold uppercase leading-[20px] text-brown">
        <span className="benefits-title-mobile">Благодаря курсу вы:</span>
        <span className="benefits-title-desktop">В течение курса вы:</span>
      </h2>

      <div className="benefits-grid mt-5 flex flex-col gap-5">
        {items.map((text, i) => (
          <div key={i} className="flex gap-2.5">
            <Arrow />
            <p className="text-[14px] font-bold uppercase leading-[20px] text-brown">
              {text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <a
          href="#zapis"
          className="w-[281px] rounded-[10px] bg-[linear-gradient(122deg,#f34d05_1.6%,#ec734b_52%,#f34d05_109%)] py-3.5 text-center text-[14px] font-medium uppercase tracking-wide text-white shadow-[inset_0_2px_10px_rgba(255,255,255,0.4),0_18px_38px_-10px_rgba(240,80,25,0.55)] transition active:scale-[0.99]"
        >
          Хочу так же
        </a>
      </div>
    </section>
  )
}
