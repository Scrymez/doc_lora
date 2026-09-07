import type { ReactNode } from 'react'

function Gold({ children }: { children: ReactNode }) {
  return (
    <span className="bg-[linear-gradient(90deg,#ffefd4,#ffc26f)] bg-clip-text text-transparent">
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
    <section className="course-value-section px-5 py-8">
      <div className="course-value-card relative rounded-[20px] bg-[#42281e] px-5 pt-8 pb-7">
        {/* Звёздочка */}
        <span className="course-star absolute -top-7 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#ffd28f]">
          <svg
            viewBox="0 0 24 24"
            className="h-[26px] w-[26px]"
            fill="none"
            stroke="#4a2e22"
            strokeWidth="4"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M12 3 V21" />
            <path d="M4.2 7.5 L19.8 16.5" />
            <path d="M19.8 7.5 L4.2 16.5" />
          </svg>
        </span>

        <h2 className="font-display text-[18px] font-extrabold uppercase leading-[20px]">
          <Gold>Что вы получите на курсе</Gold>
        </h2>

        <div className="course-value-grid mt-6 flex flex-col gap-5">
          {items.map((text, i) => (
            <div key={i} className="course-value-item">
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
