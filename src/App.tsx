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

  // Плавный (инерционный) скролл через Lenis + плавные переходы по якорям + parallax.
  // Уважаем prefers-reduced-motion — там оставляем нативный скролл и статичный parallax.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Parallax: помеченные элементы смещаются относительно центра вьюпорта.
    const parallaxEls = [
      ...document.querySelectorAll<HTMLElement>('[data-parallax]'),
    ]
    const updateParallax = () => {
      const vh = window.innerHeight
      for (const el of parallaxEls) {
        const speed = parseFloat(el.dataset.parallax || '0')
        const r = el.getBoundingClientRect()
        const offset = (r.top + r.height / 2 - vh / 2) * speed
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
      }
    }
    lenis.on('scroll', updateParallax)
    updateParallax()

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

  // Клик по «магической» кнопке рассыпает медицинские крестики-искры.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest('.btn-magic')
      if (!btn) return
      const N = 10
      for (let i = 0; i < N; i++) {
        const s = document.createElement('span')
        s.className = 'magic-spark'
        s.textContent = i % 2 ? '+' : '✚'
        s.style.fontSize = `${10 + Math.random() * 10}px`
        s.style.left = `${e.clientX}px`
        s.style.top = `${e.clientY}px`
        document.body.appendChild(s)
        const ang = (Math.PI * 2 * i) / N + Math.random() * 0.6
        const dist = 30 + Math.random() * 42
        s.animate(
          [
            { transform: 'translate(-50%, -50%) scale(0.3) rotate(0deg)', opacity: 1 },
            {
              transform: `translate(calc(-50% + ${(Math.cos(ang) * dist).toFixed(1)}px), calc(-50% + ${(Math.sin(ang) * dist).toFixed(1)}px)) scale(1.15) rotate(${((Math.random() * 120 - 60) | 0)}deg)`,
              opacity: 0,
            },
          ],
          { duration: 900 + Math.random() * 250, easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)' },
        ).onfinish = () => s.remove()
        // Фолбэк на случай, если анимация не завершится (вкладка скрыта и т.п.)
        setTimeout(() => s.remove(), 1400)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // Reveal секций при входе во вьюпорт.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const targets = [
      ...document.querySelectorAll<HTMLElement>(
        '.middle-shell > section, .site-shell > section:not(.hero-section), .site-shell > footer, .site-shell > .disclaimer-section',
      ),
    ]
    targets.forEach((t) => t.classList.add('reveal'))
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
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
