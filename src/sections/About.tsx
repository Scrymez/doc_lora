import av1 from '../assets/Новая папка/БЛОК 6/Ellipse 2525.png'
import av2 from '../assets/Новая папка/БЛОК 6/Ellipse 2526.png'
import av3 from '../assets/Новая папка/БЛОК 6/Ellipse 2527.png'
import av4 from '../assets/Новая папка/БЛОК 6/Ellipse 2528.png'
import av5 from '../assets/Новая папка/БЛОК 6/Ellipse 2529.png'
import photo from '../assets/Новая папка 2/БЛОК 6/Маржана.svg'
import photoDesktop from '../assets/doctor-desktop.png'

const avatars = [av1, av2, av3, av4, av5]

export default function About() {
  return (
    <section className="about-section bg-[#fcf5e9] pb-10">
      {/* Фото на всю ширину + бейдж 8+, скругление низа 20 */}
      <div className="about-photo relative overflow-hidden rounded-b-[20px] bg-gradient-to-b from-[#fcf5e9] to-[#f6ddb8]">
        <img
          src={photo}
          alt="Омарова Маржана — врач"
          className="about-photo-mobile w-full select-none"
          draggable={false}
        />
        <img
          src={photoDesktop}
          alt="Омарова Маржана — врач"
          className="about-photo-desktop select-none"
          draggable={false}
        />
        <div className="absolute bottom-[5px] left-[19.7%] rounded-[16px] bg-[#cdcdcd]/70 p-[6px]">
          <div className="relative h-[66px] w-[59px] overflow-hidden rounded-[15px] bg-[#a84322]">
            <p className="absolute left-[7px] top-[6px] font-['Manrope'] text-[8px] font-medium leading-[9px] text-white">
              опыт работы
              <br />
              больше 8 лет
            </p>
            <p className="absolute top-[20px] left-[5px] flex items-center font-['Manrope'] font-extrabold leading-none tracking-[-0.11em]">
              <span className="bg-[linear-gradient(90deg,#ffefd4,#ffc26f)] bg-clip-text text-[54px] text-transparent">8</span>
              <span className="bg-[linear-gradient(90deg,#ffefd4,#ffc26f)] bg-clip-text text-[40px] text-transparent">+</span>
            </p>
          </div>
        </div>
      </div>

      <div className="about-copy px-5 pt-5">
        <h3 className="about-title h-display text-[22px] leading-[1.1] text-brown">
          <span className="about-title-main">
            Я больше <span className="text-accent">8 лет</span>
          </span>{' '}
          <span className="about-title-sub">
            помогаю детям <span className="text-accent">дышать свободно</span>
          </span>
        </h3>

        {/* Соцпруф — терракот-пилл + фото-аватары */}
        <div className="mt-4 flex items-center gap-3 rounded-full bg-[#a84322] px-2 py-1.5">
          <div className="flex -space-x-2.5">
            {avatars.map((a, i) => (
              <img
                key={i}
                src={a}
                alt=""
                className="h-8 w-8 rounded-full border-2 border-[#a84322] object-cover"
              />
            ))}
          </div>
          <span className="text-[13px] font-medium">
            <b className="font-bold text-white">200+ мам</b>{' '}
            <span className="bg-[linear-gradient(90deg,#ffefd4,#ffc26f)] bg-clip-text text-transparent">
              уже прошли этот курс
            </span>
          </span>
        </div>

        <p className="mt-5 text-center text-[15px] leading-relaxed text-brown-soft">
          <b className="text-brown">
            Я имею опыт и в хирургии, и в амбулаторной практике,
          </b>{' '}
          поэтому хорошо понимаю, когда операция действительно необходима, а
          когда причину проблемы можно найти и решить её без хирургического
          вмешательства.
        </p>

        {/* Цитата */}
        <div className="about-quote mt-5 rounded-[18px] bg-[#ece0cd] px-5 py-4 text-left text-[14px] italic leading-relaxed text-brown-soft">
          <b className="font-semibold text-brown">Я за баланс, а не за крайности.</b>{' '}
          Понять причину — и решить спокойно.
        </div>

        {/* Кнопки: Забрать курс + Перейти в блог */}
        <div className="about-actions mt-5 flex flex-col gap-3">
          <a
            href="#zapis"
            className="btn-magic flex items-center justify-center rounded-[18px] bg-[linear-gradient(122deg,#f34d05_7%,#ec734b_51%,#f34d05_100%)] px-6 py-4 text-[13px] font-bold uppercase tracking-wide text-white shadow-[inset_0_0_39.33px_rgba(255,255,255,0.6),0_0_50px_rgba(243,116,66,0.70)] transition active:scale-[0.99]"
          >
            Забрать курс
          </a>
          <a
            href="#blog"
            className="btn-magic flex items-center justify-between gap-3 rounded-[18px] border-2 border-accent px-6 py-3 text-[14px] font-semibold text-accent transition active:scale-[0.99]"
          >
            <span className="flex-1 text-center">Перейти в блог</span>
            <span className="flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full border-2 border-accent">
              <svg
                viewBox="0 0 20 20"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M4 10 H14" />
                <path d="M10 6 L14 10 L10 14" />
              </svg>
            </span>
          </a>
        </div>

        <a
          href="#diplomas"
          className="btn-magic mt-4 block w-full rounded-full border-2 border-accent py-4 text-center text-[13px] font-bold uppercase tracking-wide text-accent transition active:scale-[0.99]"
        >
          Дипломы и сертификаты доктора Маржанат
        </a>
      </div>
    </section>
  )
}
