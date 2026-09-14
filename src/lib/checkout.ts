// Оплата курса через виджет CloudPayments.
// publicId — публичный идентификатор (безопасен на клиенте).
// Секретный ключ (API password) НИКОГДА не должен попадать во фронтенд —
// он используется только на сервере для приёма вебхуков/чеков.
const PUBLIC_ID = 'pk_3b683ce33f972ef1c23b5c8699c78'

export const COURSE = {
  title: 'Онлайн-курс «Жизнь без соплей»',
  amount: 9990,
  currency: 'RUB',
}

type CpWidget = {
  pay: (
    type: 'charge' | 'auth',
    receipt: Record<string, unknown>,
    callbacks?: Record<string, unknown>,
  ) => void
}
type CpNamespace = { CloudPayments: new () => CpWidget }

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

type CheckoutCallbacks = { onSuccess?: () => void; onFail?: (reason?: string) => void }

export function startCheckout(email: string, cb: CheckoutCallbacks = {}) {
  const cp = (window as unknown as { cp?: CpNamespace }).cp
  if (!cp) {
    console.warn('CloudPayments widget не загружен')
    cb.onFail?.('widget')
    return
  }
  const widget = new cp.CloudPayments()
  widget.pay(
    'charge',
    {
      publicId: PUBLIC_ID,
      description: COURSE.title,
      amount: COURSE.amount,
      currency: COURSE.currency,
      accountId: email.trim(),
      email: email.trim(),
      skin: 'mini',
      data: { email: email.trim() },
    },
    {
      onSuccess() {
        // Оплата прошла. Ссылка на курс уходит на почту на стороне сервера
        // (вебхук CloudPayments → server/pay-callback.php).
        cb.onSuccess?.()
      },
      onFail(reason?: string) {
        cb.onFail?.(reason)
      },
    },
  )
}
