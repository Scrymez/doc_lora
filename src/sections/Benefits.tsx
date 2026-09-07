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
      viewBox="0 0 32 29"
      className="mt-[2px] h-[22px] w-[26px] shrink-0"
      fill="none"
      stroke="#af4e29"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 2V9.46995C2 11.5035 2.74307 13.4537 4.06575 14.8916C5.38842 16.3295 7.18235 17.1373 9.0529 17.1373H29.9982M22.5292 26.4474L29.2242 19.1692C29.4701 18.9022 29.6651 18.5852 29.7983 18.2362C29.9314 17.8873 29.9999 17.5132 30 17.1354M22.531 7.82529L29.2242 15.1055C29.7408 15.6671 30 16.4032 30 17.1392" />
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
          className="w-[281px] rounded-[10px] bg-[linear-gradient(122deg,#f34d05_7%,#ec734b_51%,#f34d05_100%)] py-3.5 text-center text-[14px] font-medium uppercase tracking-wide text-white shadow-[inset_0_0_39.33px_rgba(255,255,255,0.6),0_0_40px_rgba(243,77,5,0.30)] transition active:scale-[0.99]"
        >
          Хочу так же
        </a>
      </div>
    </section>
  )
}
