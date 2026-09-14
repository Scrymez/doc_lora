import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import LegalModal from './LegalModal'
import { COURSE, isValidEmail, startCheckout } from '../lib/checkout'

type Props = { open: boolean; onClose: () => void }

const OLD_PRICE = 15000

export default function CheckoutModal({ open, onClose }: Props) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [hint, setHint] = useState('')
  const [paid, setPaid] = useState(false)
  const [legalDoc, setLegalDoc] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    document.documentElement.classList.add('modal-open')
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.classList.remove('modal-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const openDoc = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setLegalDoc(id)
  }

  const pay = () => {
    if (!isValidEmail(email)) {
      setHint('Укажите корректный e-mail — на него придёт ссылка на курс.')
      return
    }
    if (!consent) {
      setHint('Подтвердите согласие с условиями, чтобы продолжить.')
      return
    }
    setHint('')
    startCheckout(email, { onSuccess: () => setPaid(true) })
  }

  useEffect(() => {
    if (!open) {
      // сброс при закрытии
      setPaid(false)
      setHint('')
    }
  }, [open])

  if (!open) return null

  const ruble = (n: number) => n.toLocaleString('ru-RU') + ' ₽'

  return createPortal(
    <div
      className="checkout-overlay"
      data-lenis-prevent
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="checkout-card">
        <button className="legal-close checkout-close" aria-label="Закрыть" onClick={onClose}>
          ×
        </button>

        {paid ? (
          <div className="checkout-success">
            <div className="checkout-success-icon">✓</div>
            <h2 className="checkout-title">Оплата прошла!</h2>
            <p>
              Ссылка на курс отправлена на <b>{email}</b>.
            </p>
            <p className="checkout-success-note">
              Проверьте почту (в том числе папку «Спам»). Если письма нет в течение
              нескольких минут — напишите нам.
            </p>
            <button type="button" className="checkout-pay btn-magic" onClick={onClose}>
              Готово
            </button>
          </div>
        ) : (
          <>
            <h2 className="checkout-title">Оформление курса</h2>

            <div className="checkout-product">
          <div className="checkout-product-info">
            <span className="checkout-badge">Онлайн-курс</span>
            <p className="checkout-name">«Жизнь без соплей»</p>
            <p className="checkout-sub">Доступ ко всем урокам и гайдам · 6 месяцев</p>
          </div>
        </div>

        <div className="checkout-sum">
          <span>К оплате</span>
          <span className="checkout-sum-values">
            <s>{ruble(OLD_PRICE)}</s>
            <b>{ruble(COURSE.amount)}</b>
          </span>
        </div>

        <label className="checkout-field">
          <span className="checkout-label">Ваш e-mail</span>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="example@mail.ru"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (hint) setHint('')
            }}
          />
          <span className="checkout-note">
            ⚠️ Внимательно проверьте адрес — на эту почту придёт ссылка на курс.
          </span>
        </label>

        <div className="consent checkout-consent">
          <div className="consent-row">
            <input
              id="checkout-consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked)
                if (e.target.checked && hint) setHint('')
              }}
            />
            <label htmlFor="checkout-consent">
              Я принимаю условия{' '}
              <a href="#" onClick={openDoc('oferta')}>
                Публичной оферты
              </a>
              , соглашаюсь с{' '}
              <a href="#" onClick={openDoc('privacy')}>
                Политикой обработки ПД
              </a>{' '}
              и даю{' '}
              <a href="#" onClick={openDoc('personal-data')}>
                Согласие на обработку ПД
              </a>
              .
            </label>
          </div>
        </div>

        {hint && <p className="consent-hint checkout-hint">{hint}</p>}

        <button type="button" className="checkout-pay btn-magic" onClick={pay}>
          Оплатить {ruble(COURSE.amount)}
        </button>

            <p className="checkout-secure">🔒 Оплата картой через защищённое соединение</p>
          </>
        )}
      </div>

      <LegalModal docId={legalDoc} onClose={() => setLegalDoc(null)} />
    </div>,
    document.body,
  )
}
