import { useEffect, useRef } from 'react'
import heart from '../assets/images/heart.svg'

const segments: { t: string; accent?: boolean }[] = [
  { t: 'Только мы ответственны за здоровье своих детей — а значит, можем выбирать в его пользу каждый день.' },
  { t: 'Моя задача — дать вам инструменты ежедневного влияния,', accent: true },
  { t: 'показать, как выйти из замкнутого круга симптомов и заболеваний и как сделать так, чтобы' },
  { t: 'результат был устойчивым.', accent: true },
]

const STEP = 35 // мс между словами

export default function Mission() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('in')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add('in')
            io.disconnect()
          }
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  let i = 0
  return (
    <section
      ref={ref}
      className="mission-section mission-animate bg-[linear-gradient(180deg,#f7e1c2_0%,#fcf5e9_50%,#f7e1c2_100%)] px-5 pt-5 pb-8"
    >
      <p className="text-center font-display text-[12px] font-extrabold uppercase leading-[16px] text-brown">
        {segments.map((seg, si) => (
          <span key={si} className={seg.accent ? 'text-[#b85825]' : undefined}>
            {seg.t.split(' ').map((w, wi) => {
              const idx = i++
              return (
                <span key={wi}>
                  <span className="word" style={{ transitionDelay: `${idx * STEP}ms` }}>
                    {w}
                  </span>{' '}
                </span>
              )
            })}
          </span>
        ))}
      </p>

      <div className="mt-3 flex items-center justify-center gap-2">
        <span
          className="word text-[12px] font-semibold text-brown"
          style={{ transitionDelay: `${i * STEP + 120}ms` }}
        >
          Доктор Маржанат Омарова
        </span>
        <img
          src={heart}
          alt=""
          className="mission-heart word h-[42px] w-[36px] shrink-0 select-none"
          style={{ transitionDelay: `${i * STEP + 220}ms` }}
          draggable={false}
        />
      </div>
    </section>
  )
}
