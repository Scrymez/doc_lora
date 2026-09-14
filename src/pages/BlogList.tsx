import { Link } from 'react-router-dom'
import BlogLayout from './BlogLayout'
import { posts } from '../blog/posts'
import { useSeo } from '../lib/seo'

export default function BlogList() {
  useSeo({
    title: 'Блог о детском ЛОР-здоровье — Жизнь без соплей',
    description:
      'Статьи практикующего детского ЛОРа для родителей: аденоиды, частые ОРВИ, отиты, храп и дыхание ртом. Понятные разборы и алгоритмы.',
    canonical: 'https://loromarova.ru/blog',
    type: 'website',
  })

  return (
    <BlogLayout>
      <div className="blog-intro">
        <h1>Блог о здоровье ребёнка</h1>
        <p>
          Разбираем частые ЛОР-проблемы у детей простым языком: что происходит,
          что делать дома и когда пора к врачу.
        </p>
      </div>

      <div className="blog-grid">
        {posts.map((p) => (
          <Link key={p.slug} to={`/blog/${p.slug}`} className="blog-card">
            <span className="blog-card-date">
              {p.dateHuman} · {p.readMin} мин
            </span>
            <h2>{p.h1}</h2>
            <p>{p.description}</p>
            <span className="blog-card-more">Читать →</span>
          </Link>
        ))}
      </div>
    </BlogLayout>
  )
}
