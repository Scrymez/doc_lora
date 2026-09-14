import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { legalById } from './legal'

type Props = { docId: string | null; onClose: () => void }

export default function LegalModal({ docId, onClose }: Props) {
  useEffect(() => {
    if (!docId) return
    document.documentElement.classList.add('modal-open')
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.classList.remove('modal-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [docId, onClose])

  if (!docId) return null
  const doc = legalById[docId]
  if (!doc) return null

  return createPortal(
    <div
      className="legal-overlay"
      data-lenis-prevent
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="legal-card">
        <div className="legal-head">
          <h2>{doc.title}</h2>
          <button className="legal-close" aria-label="Закрыть" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="legal-body">
          {doc.blocks.map((b, i) => {
            if (b.h) return <h3 key={i}>{b.h}</h3>
            if (b.list)
              return (
                <ul key={i}>
                  {b.list.map((li, j) => (
                    <li key={j}>{li}</li>
                  ))}
                </ul>
              )
            return <p key={i}>{b.p}</p>
          })}
          <p className="legal-updated">Редакция {doc.updated} г.</p>
        </div>
      </div>
    </div>,
    document.body,
  )
}
