import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import About from './sections/About'
import Benefits from './sections/Benefits'
import CourseValue from './sections/CourseValue'
import Hero from './sections/Hero'
import Mission from './sections/Mission'
import NoSymptoms from './sections/NoSymptoms'
import Reviews from './sections/Reviews'
import Symptoms from './sections/Symptoms'
import Waiting from './sections/Waiting'
import WorryTabs from './sections/WorryTabs'
import Enrollment from './sections/Enrollment'

// Планшеты и промежуточные ширины (768–1439): десктоп-макет верстался под 1440px,
// поэтому рендерим его в этой «дизайн-ширине» и плавно ужимаем через zoom под вьюпорт —
// получается пиксель-в-пиксель тот же десктоп, только пропорционально меньше.
// Мобилка (<768) и полноценный десктоп (>=1440) не трогаются.
const DESIGN_WIDTH = 1440

function App() {
  useEffect(() => {
    const shell = document.querySelector<HTMLElement>('.site-shell')
    if (!shell) return
    const apply = () => {
      const w = window.innerWidth
      if (w >= 768 && w < DESIGN_WIDTH) {
        shell.style.width = `${DESIGN_WIDTH}px`
        shell.style.maxWidth = 'none'
        shell.style.zoom = String(w / DESIGN_WIDTH)
      } else {
        shell.style.width = ''
        shell.style.maxWidth = ''
        shell.style.zoom = ''
      }
    }
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])

  // Плавный (инерционный) скролл через Lenis + плавные переходы по якорям.
  // Уважаем prefers-reduced-motion — там оставляем нативный скролл.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href^="#"]')
      if (!link) return
      const href = link.getAttribute('href') || ''
      if (href.length < 2) return
      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        lenis.scrollTo(target as HTMLElement)
      }
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <main className="site-shell mx-auto min-h-screen w-full max-w-[375px] overflow-hidden bg-[#fcf5e9]">
      <Hero />
      {/* Средний блок — единый градиент FCF5E9 → F5DBB6 → FCF5E9 */}
      <div className="middle-shell relative z-30 -mt-8 overflow-hidden rounded-t-[24px] bg-[linear-gradient(180deg,#fcf5e9_0%,#f5dbb6_50%,#fcf5e9_100%)]">
        <Waiting />
        <Symptoms />
        <NoSymptoms />
        <CourseValue />
        <Benefits />
      </div>
      <About />
      <WorryTabs />
      <Mission />
      <Reviews />
      <Enrollment />
    </main>
  )
}

export default App
