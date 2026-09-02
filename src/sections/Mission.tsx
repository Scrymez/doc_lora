export default function Mission() {
  return (
    <section className="mission-section bg-[#fcf5e9] px-5 pt-5 pb-8">
      <p className="text-center font-display text-[12px] font-extrabold uppercase leading-[16px] text-brown">
        Только мы ответственны за здоровье своих детей — а значит, можем
        выбирать в его пользу каждый день.{' '}
        <span className="text-accent">
          Моя задача — дать вам инструменты ежедневного влияния,
        </span>{' '}
        показать, как выйти из замкнутого круга симптомов и заболеваний и как
        сделать так, чтобы{' '}
        <span className="text-accent">результат был устойчивым.</span>
      </p>

      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="text-[12px] font-semibold text-brown">
          Ваша доктор Маржанат
        </span>
        <svg
          viewBox="0 0 32 30"
          className="h-5 w-5 shrink-0"
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
