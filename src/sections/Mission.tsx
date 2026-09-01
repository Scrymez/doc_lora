export default function Mission() {
  return (
    <section className="bg-[#fcf5e9] px-5 pt-4 pb-12">
      <p className="text-center font-display text-[16px] font-extrabold uppercase leading-[22px] text-brown">
        Вы можете{' '}
        <span className="text-accent">
          влиять на здоровье своего ребёнка каждый день.
        </span>{' '}
        Я покажу, как разорвать круг постоянных симптомов и заболеваний и
        добиться <span className="text-accent">устойчивого результата.</span>
      </p>

      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="text-[15px] font-semibold text-brown">
          Ваша доктор Маржанат
        </span>
        <svg
          viewBox="0 0 32 30"
          className="h-7 w-7 shrink-0"
          fill="none"
          stroke="#e2551f"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M16 27 C8 20 3 15 3 9.5 C3 5.5 6 3 9.5 3 C12.5 3 15 5 16 7.5 C17 5 19.5 3 22.5 3 C26 3 29 5.5 29 9.5 C29 15 24 20 16 27 Z" />
        </svg>
      </div>
    </section>
  )
}
