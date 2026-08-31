import type { ReactNode } from 'react'

function Hl({ children }: { children: ReactNode }) {
  return (
    <span className="underline decoration-accent decoration-[1.5px] underline-offset-[2px]">
      {children}
    </span>
  )
}

const items = [
  {
    title: (
      <>
        Дыхание ртом
        <br />
        становится нормой
      </>
    ),
    body: (
      <>
        Заложенный нос — это не «просто сопли». Мозг ребёнка{' '}
        <Hl>недополучает кислород</Hl>: отсюда усталость, капризы, плохой сон и
        проблемы с концентрацией. Со временем{' '}
        <Hl>меняются даже прикус и форма лица</Hl>.
      </>
    ),
  },
  {
    title: (
      <>
        Болезни идут
        <br />
        по кругу
      </>
    ),
    body: (
      <>
        <Hl>Насморк → отит → антибиотики → пара недель в саду → снова насморк.</Hl>{' '}
        Каждый круг — это ваши нервы, больничные и лекарства, которые лечат
        симптом, а не причину.
      </>
    ),
  },
  {
    title: (
      <>
        Решения принимаются
        <br />
        из страха
      </>
    ),
    body: (
      <>
        Когда не понимаешь, что происходит, соглашаешься на всё подряд:{' '}
        <Hl>лишние капли, антибиотик «на всякий случай», операцию, к которой не
        готова</Hl>. Или наоборот — тянешь, когда действовать нужно сейчас.
      </>
    ),
  },
]

export default function Waiting() {
  return (
    <section className="px-5 pt-9 pb-10">
      <h2 className="h-display max-w-[287px] text-[16px] leading-[20px] text-brown">
        Если просто <span className="text-accent">ждать,</span>
        <br />
        <span className="text-accent">что всё пройдёт с возрастом:</span>
      </h2>

      <div className="mt-[18px] flex flex-col gap-[22px]">
        {items.map((it, i) => (
          <div key={i}>
            <h3 className="text-[14px] font-semibold uppercase leading-[16px] text-brown">
              {it.title}
            </h3>
            <p className="mt-2 max-w-[281px] text-[12px] leading-[16px] text-brown">
              {it.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
