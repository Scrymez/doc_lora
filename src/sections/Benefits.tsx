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
      className="mt-[2px] h-3 w-3 shrink-0"
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
    <section className="bg-cream px-5 pt-2 pb-10">
      <h2 className="font-display text-[16px] font-extrabold uppercase leading-[20px] text-brown">
        Благодаря курсу вы:
      </h2>

      <div className="mt-5 flex flex-col gap-5">
        {items.map((text, i) => (
          <div key={i} className="flex gap-2.5">
            <Arrow />
            <p className="text-[12px] font-bold uppercase leading-[16px] text-brown">
              {text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <a
          href="#zapis"
          className="w-[261px] rounded-[10px] bg-[linear-gradient(122deg,#f34d05_1.6%,#ec734b_52%,#f34d05_109%)] py-3.5 text-center text-[14px] font-medium uppercase tracking-wide text-white shadow-[inset_0_0_39.33px_#FFFFFF,0_10px_20px_-6px_rgba(243,77,5,0.35)] transition active:scale-[0.99]"
        >
          Хочу так же
        </a>
      </div>
    </section>
  )
}
