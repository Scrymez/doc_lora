import glow from '../assets/1 БЛОК/Ellipse 2536.png'
import badgeBg from '../assets/1 БЛОК/Rectangle 240649020.png'
import heroPhoto from '../assets/Новая папка 2/1 БЛОК/image_150-removebg 1.svg'
import userIcon from '../assets/Новая папка/1 БЛОК/1 БЛОК/basil_user-solid.svg'

export default function Hero() {
  return (
    <section className="hero-section overflow-hidden px-6 pt-8 pb-6 text-center">
      <div className="hero-copy">
      <p className="text-[11px] font-normal uppercase tracking-wide text-brown/50">
        Авторский онлайн-курс «Жизнь без соплей»
      </p>

      <h1 className="h-display mt-4 text-[23px] leading-[1.05] tracking-[-0.02em] text-brown">
        Курс для мам,
        <br />
        <span className="text-accent">которые устали бояться</span>
      </h1>

      <div className="mt-4 flex justify-center">
        <span className="rounded-[10px] bg-[#a84322] px-4 py-2 text-[15px] font-semibold text-white">
          15 минут в день, с телефона и Вы:
        </span>
      </div>

      <p className="mt-3 text-[15px] leading-relaxed text-brown">
        наконец понимаете, что происходит с ребёнком и когда правда пора бить
        тревогу
      </p>

      <a
        href="#zapis"
        className="mt-6 block w-full rounded-2xl bg-[linear-gradient(122deg,#f34d05_1.6%,#ec734b_52%,#f34d05_109%)] py-4 text-[16px] font-semibold uppercase tracking-wide text-white shadow-[inset_0_2px_10px_rgba(255,255,255,0.4),0_18px_38px_-10px_rgba(240,80,25,0.55)] transition active:scale-[0.99]"
      >
        Хочу на курс
      </a>
      </div>

      {/* Фото + бейдж */}
      <div className="hero-visual relative mt-8 flex justify-center">
        {/* Тёплое свечение-подложка */}
        <img
          src={glow}
          alt=""
          className="pointer-events-none absolute bottom-[-7%] left-1/2 z-20 h-[95px] w-[112%] max-w-none -translate-x-1/2 translate-y-[9px] select-none object-fill"
        />
        {/* Бейдж-плашка */}
        <div className="absolute left-[58%] top-0 z-0 flex h-[157px] w-[73px] -translate-x-1/2 flex-col items-center pt-8">
          <img
            src={badgeBg}
            alt=""
            className="absolute inset-0 h-full w-full rounded-2xl object-cover"
          />
          {/* Иконка-человечек */}
          <span className="absolute -top-3 z-20 flex h-7 w-7 items-center justify-center rounded-[7px] bg-white">
            <img src={userIcon} alt="" className="h-[14px] w-[14px]" />
          </span>
          <div className="relative z-10 text-center text-cream">
            <p className="text-[8px] font-medium tracking-wide">БОЛЕЕ</p>
            <p className="text-[26px] font-extrabold leading-none">31</p>
            <p className="text-[9px] font-semibold tracking-wide">ТЫСЯЧ</p>
            <p className="mt-1.5 px-1 text-[7px] leading-tight text-cream/80">
              количество мам-подписчиц у врача в инстаграм
            </p>
          </div>
        </div>

        <img
          src={heroPhoto}
          alt="Врач ЛОР с ребёнком"
          className="relative z-10 w-[78%] select-none"
          draggable={false}
        />
      </div>
    </section>
  )
}
