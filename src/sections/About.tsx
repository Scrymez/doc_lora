import av1 from '../assets/Новая папка/БЛОК 6/Ellipse 2525.png'
import av2 from '../assets/Новая папка/БЛОК 6/Ellipse 2526.png'
import av3 from '../assets/Новая папка/БЛОК 6/Ellipse 2527.png'
import av4 from '../assets/Новая папка/БЛОК 6/Ellipse 2528.png'
import av5 from '../assets/Новая папка/БЛОК 6/Ellipse 2529.png'
import photo from '../assets/Новая папка 2/БЛОК 6/Маржана.svg'

const avatars = [av1, av2, av3, av4, av5]

export default function About() {
  return (
    <section className="about-section bg-[#fcf5e9] pb-10">
      {/* Фото на всю ширину + бейдж 8+, скругление низа 20 */}
      <div className="about-photo relative overflow-hidden rounded-b-[20px] bg-gradient-to-b from-[#fcf5e9] to-[#f6ddb8]">
        <img
          src={photo}
          alt="Омарова Маржана — врач"
          className="w-full select-none"
          draggable={false}
        />
        <div className="absolute bottom-[5px] left-[19.7%] rounded-[16px] bg-[#cdcdcd]/70 p-[6px]">
          <div className="relative h-[66px] w-[59px] overflow-hidden rounded-[15px] bg-[#a84322]">
            <p className="absolute left-[7px] top-[6px] font-['Manrope'] text-[8px] font-medium leading-[9px] text-white">
              опыт работы
              <br />
              больше 8 лет
            </p>
            <p className="absolute bottom-[-2px] left-[5px] bg-gradient-to-r from-[#ffefd4] to-[#ffc26f] bg-clip-text font-['Manrope'] font-extrabold leading-none tracking-[-0.11em] text-transparent">
              <span className="text-[54px]">8</span>
              <span className="text-[40px]">+</span>
            </p>
          </div>
        </div>
      </div>

      <div className="about-copy px-5 pt-5">
        <h3 className="h-display text-[22px] leading-[1.1] text-brown">
          Я больше <span className="text-accent">8 лет</span> помогаю детям{' '}
          <span className="text-accent">дышать свободно</span>
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
            <span className="bg-gradient-to-r from-[#ffefd4] to-[#ffc26f] bg-clip-text text-transparent">
              уже прошли этот курс
            </span>
          </span>
        </div>

        <p className="mt-5 text-center text-[15px] leading-relaxed text-brown-soft">
          <b className="text-brown">
            Я имею опыт и в хирургии, и в амбулаторной практике, поэтому хорошо
            понимаю,
          </b>{' '}
          когда операция действительно необходима, а когда причину проблемы можно
          найти и решить её без хирургического вмешательства.
        </p>

        <a
          href="#diplomas"
          className="mt-6 block w-full rounded-full border-2 border-accent py-4 text-center text-[13px] font-bold uppercase tracking-wide text-accent transition active:scale-[0.99]"
        >
          Дипломы и сертификаты доктора Маржанат
        </a>
      </div>
    </section>
  )
}
