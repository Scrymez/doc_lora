import type { ReactNode } from 'react'

function Gold({ children }: { children: ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-[#ffefd4] to-[#ffc26f] bg-clip-text text-transparent">
      {children}
    </span>
  )
}

const items: ReactNode[] = [
  <>
    Поймёте, <Gold>как устроены нос, уши и горло</Gold> у ребёнка — и что на
    самом деле стоит за «вечными соплями»
  </>,
  <>
    Разберётесь с <Gold>дыханием ртом и храпом</Gold> — почему это не мелочь и
    когда пора действовать
  </>,
  <>
    Узнаете про <Gold>аденоиды</Gold> — когда достаточно наблюдать, а когда
    операция действительно нужна
  </>,
  <>
    Научитесь <Gold>справляться с отитами</Gold> и понимать, что происходит с
    ушами ребёнка
  </>,
  <>
    Разорвёте <Gold>круг бесконечных ОРВИ</Gold> — поймёте, почему ребёнок болеет
    снова и снова
  </>,
  <>
    Перестанете бояться <Gold>антибиотиков без перестраховки</Gold> — когда они
    правда нужны, а когда нет
  </>,
]

export default function CourseValue() {
  return (
    <section className="px-5 py-8">
      <div className="relative rounded-[20px] bg-[#42281e] px-5 pt-8 pb-7">
        {/* Звёздочка */}
        <span className="absolute -top-6 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffe9c0,#e0a55a)]">
          <svg viewBox="0 0 24 24" className="h-9 w-9" aria-hidden>
            <g fill="#42281e">
              <rect x="10.1" y="1.5" width="3.8" height="21" rx="1.9" />
              <rect x="10.1" y="1.5" width="3.8" height="21" rx="1.9" transform="rotate(60 12 12)" />
              <rect x="10.1" y="1.5" width="3.8" height="21" rx="1.9" transform="rotate(120 12 12)" />
            </g>
          </svg>
        </span>

        <h2 className="font-display text-[18px] font-extrabold uppercase leading-[20px]">
          <Gold>Что вы получите на курсе:</Gold>
        </h2>

        <div className="mt-6 flex flex-col gap-5">
          {items.map((text, i) => (
            <div key={i}>
              <div className="font-display text-[22px] font-extrabold leading-none">
                <Gold>{i + 1}</Gold>
              </div>
              <p className="mt-2.5 text-[14px] leading-[20px] text-[#fff1f1]">
                {text}
              </p>
            </div>
          ))}
        </div>

        <hr className="my-6 border-white/15" />
        <p className="text-center text-[14px] leading-[20px] text-[#fff1f1]">
          А на руках останутся гайды, чек-листы и дневник наблюдений — чтобы
          возвращаться к ним в любой момент
        </p>
      </div>
    </section>
  )
}
