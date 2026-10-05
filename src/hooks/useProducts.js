import { useEffect, useState } from 'react'
import { fallbackProducts } from '../data/products'


export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    let active = true
    fetch('https://dummyjson.com/products?limit=24')
      .then(res => { if (!res.ok) throw new Error('Could not load products'); return res.json() })
      .then(data => { if (active) setProducts(data.products.map(p => ({ id: p.id, title: p.title, price: Math.round(p.price * 83), category: p.category, image: p.thumbnail, description: p.description, rating: { rate: p.rating, count: p.stock } }))) })
      .catch(() => { if (active) { setProducts(fallbackProducts); setError('Showing demo products because the product service is unavailable.') } })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])
  return { products, loading, error }
}