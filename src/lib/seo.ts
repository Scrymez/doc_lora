import { useEffect } from 'react'

type SeoData = {
  title: string
  description: string
  canonical: string
  image?: string
  type?: 'website' | 'article'
  jsonLd?: object
}

const DEFAULT_IMAGE = 'https://loromarova.ru/og-image.jpg'

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// Обновляет метатеги под текущую страницу (для Google, который рендерит JS).
export function useSeo(seo: SeoData) {
  useEffect(() => {
    const image = seo.image || DEFAULT_IMAGE
    const type = seo.type || 'website'

    document.title = seo.title
    upsertMeta('meta[name="description"]', 'name', 'description', seo.description)
    upsertLink('canonical', seo.canonical)

    upsertMeta('meta[property="og:title"]', 'property', 'og:title', seo.title)
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', seo.description)
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', seo.canonical)
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', image)
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', type)
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title)
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description)
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image)

    const prev = document.getElementById('route-jsonld')
    if (prev) prev.remove()
    if (seo.jsonLd) {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.id = 'route-jsonld'
      s.textContent = JSON.stringify(seo.jsonLd)
      document.head.appendChild(s)
    }
  }, [seo.title, seo.description, seo.canonical, seo.image, seo.type, seo.jsonLd])
}
