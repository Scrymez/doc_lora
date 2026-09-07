import heart from '../assets/heart.svg'

export default function Mission() {
  return (
    <section className="mission-section bg-[linear-gradient(180deg,#f7e1c2_0%,#fcf5e9_50%,#f7e1c2_100%)] px-5 pt-5 pb-8">
      <p className="text-center font-display text-[12px] font-extrabold uppercase leading-[16px] text-brown">
        Только мы ответственны за здоровье своих детей — а значит, можем
        выбирать в его пользу каждый день.{' '}
        <span className="text-[#b85825]">
          Моя задача — дать вам инструменты ежедневного влияния,
        </span>{' '}
        показать, как выйти из замкнутого круга симптомов и заболеваний и как
        сделать так, чтобы{' '}
        <span className="text-[#b85825]">результат был устойчивым.</span>
      </p>

      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="text-[12px] font-semibold text-brown">
          Ваша доктор Маржанат
        </span>
        <img
          src={heart}
          alt=""
          className="mission-heart h-[42px] w-[36px] shrink-0 rotate-[0deg] select-none"
          draggable={false}
        />
      </div>
    </section>
  )
}
