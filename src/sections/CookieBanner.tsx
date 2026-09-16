import { useEffect, useState } from 'react'
import LegalModal from './LegalModal'

const KEY = 'cookie-consent-v1'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [legalDoc, setLegalDoc] = useState<string | null>(null)

  useEffect(() => {
    let stored: string | null = null
    try {
      stored = localStorage.getItem(KEY)
    } catch {
      stored = null
    }
    if (!stored) setVisible(true)
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      // ignore
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="dialog" aria-label="Уведомление об использовании cookie">
      <p className="cookie-text">
        Мы используем cookie для работы сайта и аналитики. Продолжая пользоваться сайтом,
        вы соглашаетесь с{' '}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            setLegalDoc('privacy')
          }}
        >
          Политикой обработки персональных данных
        </a>
        .
      </p>
      <button type="button" className="cookie-btn btn-magic" onClick={accept}>
        Принять
      </button>
      <LegalModal docId={legalDoc} onClose={() => setLegalDoc(null)} />
    </div>
  )
}
