import { Link, useParams } from 'react-router-dom'
import BlogLayout from './BlogLayout'
import { postBySlug, posts } from '../blog/posts'
import { useSeo } from '../lib/seo'

export default function Article() {
  const { slug } = useParams()
  const post = slug ? postBySlug[slug] : undefined

  useSeo({
    title: post ? post.title : 'Статья не найдена — Жизнь без соплей',
    description: post ? post.description : 'Материал не найден.',
    canonical: `https://loromarova.ru/blog/${slug ?? ''}`,
    type: 'article',
    jsonLd: post
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.h1,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: 'ru',
          author: { '@type': 'Person', name: 'Маржанат Омарова' },
          publisher: { '@type': 'Organization', name: 'Жизнь без соплей' },
          image: 'https://loromarova.ru/og-image.jpg',
          mainEntityOfPage: `https://loromarova.ru/blog/${post.slug}`,
        }
      : undefined,
  })

  if (!post) {
    return (
      <BlogLayout>
        <div className="blog-intro">
          <h1>Статья не найдена</h1>
          <p>
            Возможно, ссылка устарела. <Link to="/blog">Все статьи блога →</Link>
          </p>
        </div>
      </BlogLayout>
    )
  }

  const other = posts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <BlogLayout>
      <article className="article">
        <Link to="/blog" className="article-back">
          ← Все статьи
        </Link>
        <span className="article-date">
          {post.dateHuman} · {post.readMin} мин чтения
        </span>
        <h1>{post.h1}</h1>

        {post.blocks.map((b, i) => {
          if (b.type === 'h2') return <h2 key={i}>{b.text}</h2>
          if (b.type === 'ul')
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            )
          if (b.type === 'note') return <p key={i} className="article-note">{b.text}</p>
          return <p key={i}>{b.text}</p>
        })}

        <div className="article-cta">
          <p>
            Хотите понимать, что происходит с ребёнком, и действовать спокойно, а
            не из страха?
          </p>
          <a href="/#zapis" className="article-cta-btn">
            Забрать курс «Жизнь без соплей»
          </a>
        </div>
      </article>

      {other.length > 0 && (
        <div className="article-more">
          <h3>Ещё по теме</h3>
          <div className="blog-grid">
            {other.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="blog-card">
                <span className="blog-card-date">{p.readMin} мин</span>
                <h2>{p.h1}</h2>
                <span className="blog-card-more">Читать →</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </BlogLayout>
  )
}
