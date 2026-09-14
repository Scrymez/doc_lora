import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="blog-page">
      <header className="blog-header">
        <Link to="/" className="blog-logo">
          Жизнь без соплей
        </Link>
        <a href="/#zapis" className="blog-cta">
          Забрать курс
        </a>
      </header>
      <main className="blog-main">{children}</main>
      <footer className="blog-footer">
        <Link to="/">← На главную</Link>
        <span>© Доктор Маржанат · loromarova.ru</span>
      </footer>
    </div>
  )
}
