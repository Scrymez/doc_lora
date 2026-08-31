import iconAdenoids from '../assets/icons/adenoids.svg'
import iconAntibiotics from '../assets/icons/antibiotics.svg'
import iconEar from '../assets/icons/ear.svg'
import iconNose from '../assets/icons/nose.svg'
import iconOrvi from '../assets/icons/orvi.svg'

type Bullet = { text: string; hl?: boolean }
type Card = { icon: string; title: string; bullets: Bullet[] }

const cards: Card[] = [
  {
    icon: iconNose,
    title: 'Нос и дыхание',
    bullets: [
      { text: 'Постоянно заложен нос', hl: true },
      { text: 'Дышит ртом, а не носом' },
      { text: 'Храпит по ночам' },
      { text: 'Насморк, который не проходит' },
    ],
  },
  {
    icon: iconEar,
    title: 'Уши и отиты',
    bullets: [
      { text: 'Жалуется на боль в ухе' },
      { text: 'Частые отиты', hl: true },
      { text: 'Стал хуже слышать, переспрашивает' },
      { text: 'Не знаете, чем и когда лечить' },
    ],
  },
  {
    icon: iconAdenoids,
    title: 'Аденоиды',
    bullets: [
      { text: 'Гнусавит, говорит «в нос»' },
      { text: 'Сказали «будем удалять»', hl: true },
      { text: 'Спит с открытым ртом' },
      { text: 'Не знаете: наблюдать или оперировать' },
    ],
  },
  {
    icon: iconOrvi,
    title: 'Бесконечные ОРВИ',
    bullets: [
      { text: 'Две недели в саду — снова дома' },
      { text: 'Простуды сменяют друг друга' },
      { text: 'Болеет по кругу', hl: true },
      { text: 'Кажется, иммунитета просто нет' },
    ],
  },
  {
    icon: iconAntibiotics,
    title: 'Антибиотики',
    bullets: [
      { text: 'Назначают «на всякий случай»', hl: true },
      { text: 'Пьёте курс за курсом' },
      { text: 'Боитесь и давать, и не давать' },
      { text: 'Не понимаете, когда правда нужны' },
    ],
  },
]

export default function Symptoms() {
  return (
    <section className="bg-cream px-5 pt-6 pb-10">
      <h2 className="h-display text-[16px] leading-[20px] text-brown">
        <span className="text-accent">С какими симптомами</span>
        <br />
        мы разбираемся на курсе:
      </h2>

      <div className="mt-5 flex flex-col gap-[10px]">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-[20px] border-[3px] border-[#a84322] bg-[#ffeed5] p-[17px]"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#cdcdcd]/75">
                <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-[#a84322]">
                  <img
                    src={card.icon}
                    alt=""
                    className="h-[17px] w-[17px] object-contain"
                  />
                </span>
              </span>
              <h3 className="text-[16px] font-bold uppercase leading-none text-brown">
                {card.title}
              </h3>
            </div>

            <ul className="mt-3 flex flex-col gap-2">
              {card.bullets.map((b) => (
                <li key={b.text} className="flex items-center gap-2.5">
                  <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#42281e]" />
                  {b.hl ? (
                    <span className="rounded-[5px] bg-[#a84322] px-2 py-[3px] text-[12px] leading-none text-[#fff1f1]">
                      {b.text}
                    </span>
                  ) : (
                    <span className="text-[12px] leading-none text-brown">
                      {b.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Тёмная карточка-итог */}
        <div className="rounded-[20px] bg-[#482f26] p-5">
          <h3 className="bg-gradient-to-r from-[#ffefd4] to-[#ffc26f] bg-clip-text text-[16px] font-extrabold uppercase leading-[22px] text-transparent">
            Узнали хотя бы пару пунктов?
          </h3>
          <p className="mt-2 text-[12px] leading-[14px] text-[#fff1f1]">
            Значит, курс собран ровно про вашу ситуацию. Каждый из этих модулей —
            внутри.
          </p>
        </div>
      </div>
    </section>
  )
}
