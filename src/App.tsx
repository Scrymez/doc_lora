import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './Home'
import BlogList from './pages/BlogList'
import Article from './pages/Article'

// Прокрутка наверх при смене страницы
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<Article />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}
