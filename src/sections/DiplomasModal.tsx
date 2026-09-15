import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import cert1 from '../assets/certificates/cert-1.jpg'
import cert2 from '../assets/certificates/cert-2.jpg'
import cert3 from '../assets/certificates/cert-3.jpg'
import cert4 from '../assets/certificates/cert-4.jpg'
import cert5 from '../assets/certificates/cert-5.jpg'

const slides = [
  { src: cert1, alt: 'Удостоверение о повышении квалификации — Оториноларингология' },
  { src: cert2, alt: 'Сертификат специалиста — Оториноларингология' },
  { src: cert3, alt: 'Сертификат специалиста — Оториноларингология' },
  { src: cert4, alt: 'Удостоверение о повышении квалификации — Оториноларингология' },
  { src: cert5, alt: 'Свидетельство об аккредитации специалиста' },
]

const MAX_SCALE = 5
const MIN_SCALE = 1

type Props = { open: boolean; onClose: () => void; startIndex?: number }

export default function DiplomasModal({ open, onClose, startIndex = 0 }: Props) {
  const [index, setIndex] = useState(startIndex)
  const [zoomed, setZoomed] = useState(false)

  const imgRef = useRef<HTMLImageElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  // Состояние жеста держим в ref, чтобы не ререндерить на каждом кадре
  const t = useRef({ scale: 1, x: 0, y: 0 })
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map())
  const pinch = useRef<{ dist: number; cx: number; cy: number } | null>(null)
  const pan = useRef<{ x: number; y: number } | null>(null)
  const swipe = useRef<{ x: number; y: number; moved: boolean } | null>(null)

  const applyTransform = useCallback(() => {
    const el = imgRef.current
    if (!el) return
    const { scale, x, y } = t.current
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    el.style.cursor = scale > 1 ? 'grab' : 'zoom-in'
  }, [])

  const resetTransform = useCallback(() => {
    t.current = { scale: 1, x: 0, y: 0 }
    applyTransform()
    setZoomed(false)
  }, [applyTransform])

  const clampPan = useCallback(() => {
    const vp = viewportRef.current
    if (!vp) return
    const { scale } = t.current
    const w = vp.clientWidth
    const h = vp.clientHeight
    // допускаем сдвиг только в пределах увеличенной картинки
    const maxX = ((scale - 1) * w) / 2
    const maxY = ((scale - 1) * h) / 2
    t.current.x = Math.max(-maxX, Math.min(maxX, t.current.x))
    t.current.y = Math.max(-maxY, Math.min(maxY, t.current.y))
  }, [])

  const zoomAt = useCallback(
    (clientX: number, clientY: number, factor: number) => {
      const vp = viewportRef.current
      if (!vp) return
      const rect = vp.getBoundingClientRect()
      const px = clientX - rect.left - rect.width / 2
      const py = clientY - rect.top - rect.height / 2
      const prev = t.current.scale
      const next = Math.max(MIN_SCALE, Math.min(MAX_SCALE, prev * factor))
      const ratio = next / prev
      // держим точку под курсором на месте (origin — центр вьюпорта)
      t.current.x = px - ratio * (px - t.current.x)
      t.current.y = py - ratio * (py - t.current.y)
      t.current.scale = next
      if (next === 1) {
        t.current.x = 0
        t.current.y = 0
      }
      clampPan()
      applyTransform()
      setZoomed(next > 1)
    },
    [applyTransform, clampPan],
  )

  const go = useCallback(
    (dir: number) => {
      setIndex((i) => (i + dir + slides.length) % slides.length)
      resetTransform()
    },
    [resetTransform],
  )

  // Сброс при открытии/смене
  useEffect(() => {
    if (open) {
      setIndex(startIndex)
      t.current = { scale: 1, x: 0, y: 0 }
      setZoomed(false)
      requestAnimationFrame(applyTransform)
    }
  }, [open, startIndex, applyTransform])

  // Блокировка скролла страницы + клавиатура
  useEffect(() => {
    if (!open) return
    document.documentElement.classList.add('modal-open')
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.classList.remove('modal-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, go])

  const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    Math.hypot(a.x - b.x, a.y - b.y)

  const onPointerDown = (e: React.PointerEvent) => {
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const pts = [...pointers.current.values()]
    if (pts.length === 2) {
      pinch.current = {
        dist: dist(pts[0], pts[1]),
        cx: (pts[0].x + pts[1].x) / 2,
        cy: (pts[0].y + pts[1].y) / 2,
      }
      pan.current = null
      swipe.current = null
    } else if (pts.length === 1) {
      if (t.current.scale > 1) {
        pan.current = { x: e.clientX, y: e.clientY }
      } else {
        swipe.current = { x: e.clientX, y: e.clientY, moved: false }
      }
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const pts = [...pointers.current.values()]

    if (pts.length === 2 && pinch.current) {
      const d = dist(pts[0], pts[1])
      const cx = (pts[0].x + pts[1].x) / 2
      const cy = (pts[0].y + pts[1].y) / 2
      const factor = d / pinch.current.dist
      zoomAt(cx, cy, factor)
      // панорама пальцами
      t.current.x += cx - pinch.current.cx
      t.current.y += cy - pinch.current.cy
      clampPan()
      applyTransform()
      pinch.current = { dist: d, cx, cy }
      return
    }

    if (pan.current && t.current.scale > 1) {
      t.current.x += e.clientX - pan.current.x
      t.current.y += e.clientY - pan.current.y
      pan.current = { x: e.clientX, y: e.clientY }
      clampPan()
      applyTransform()
      return
    }

    if (swipe.current) {
      if (Math.abs(e.clientX - swipe.current.x) > 8) swipe.current.moved = true
    }
  }

  const onPointerUp = (e: React.PointerEvent) => {
    const sw = swipe.current
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) pinch.current = null
    if (pointers.current.size === 0) {
      pan.current = null
      // свайп для смены слайда (когда не увеличено)
      if (sw && t.current.scale === 1) {
        const dx = e.clientX - sw.x
        if (Math.abs(dx) > 60) {
          go(dx < 0 ? 1 : -1)
          swipe.current = null
          return
        }
      }
      swipe.current = null
    }
  }

  // Клик по картинке на десктопе — зум в точку / сброс
  const onImageClick = (e: React.MouseEvent) => {
    if (swipe.current?.moved) return
    if (t.current.scale > 1) resetTransform()
    else zoomAt(e.clientX, e.clientY, 2.4)
  }

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1.18 : 1 / 1.18)
  }

  if (!open) return null

  return createPortal(
    <div
      className="diploma-overlay"
      data-lenis-prevent
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button className="diploma-close" aria-label="Закрыть" onClick={onClose}>
        ×
      </button>

      <button
        className="diploma-nav diploma-prev"
        aria-label="Предыдущий"
        onClick={(e) => {
          e.stopPropagation()
          go(-1)
        }}
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      <div
        className="diploma-stage"
        onPointerDown={(e) => {
          // клик по тёмному полю сцены (не по картинке) — закрыть
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <div
          ref={viewportRef}
          className={`diploma-viewport ${zoomed ? 'is-zoomed' : ''}`}
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <img
            ref={imgRef}
            src={slides[index].src}
            alt={slides[index].alt}
            className="diploma-img"
            draggable={false}
            onClick={onImageClick}
          />
        </div>
      </div>

      <button
        className="diploma-nav diploma-next"
        aria-label="Следующий"
        onClick={(e) => {
          e.stopPropagation()
          go(1)
        }}
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      <div className="diploma-bottom" onPointerDown={(e) => e.stopPropagation()}>
        <div className="diploma-counter">
          {index + 1} / {slides.length}
        </div>
        <div className="diploma-thumbs">
          {slides.map((s, i) => (
            <button
              key={i}
              className={`diploma-thumb ${i === index ? 'is-active' : ''}`}
              onClick={() => {
                setIndex(i)
                resetTransform()
              }}
              aria-label={`Документ ${i + 1}`}
            >
              <img src={s.src} alt="" draggable={false} />
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}
