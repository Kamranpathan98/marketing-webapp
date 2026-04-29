import type { Product } from '@/types/invoice'

export const DEMO_PRODUCTS: Product[] = [
  { id: 1,  name: 'Samsung Galaxy A55 5G',       model: 'SM-A556B',    category: 'Smartphone',  price: 24999,  gst: 18, stock: 12 },
  { id: 2,  name: 'Samsung Galaxy S24',           model: 'SM-S921B',    category: 'Smartphone',  price: 64999,  gst: 18, stock: 5  },
  { id: 3,  name: 'Samsung 65" Crystal 4K TV',    model: 'UA65AUE65',   category: 'TV',          price: 54999,  gst: 28, stock: 3  },
  { id: 4,  name: 'iPhone 15 128GB',              model: 'MLXP3HN/A',   category: 'Smartphone',  price: 79999,  gst: 18, stock: 8  },
  { id: 5,  name: 'iPhone 15 Pro 256GB',          model: 'MTQ73HN/A',   category: 'Smartphone',  price: 134999, gst: 18, stock: 4  },
  { id: 6,  name: 'Realme 12 Pro+ 5G',            model: 'RMX3840',     category: 'Smartphone',  price: 26999,  gst: 18, stock: 15 },
  { id: 7,  name: 'boAt Rockerz 550 BT',          model: 'BT-550',      category: 'Accessories', price: 1799,   gst: 18, stock: 30 },
  { id: 8,  name: 'Anker 67W GaN Charger',        model: 'A2667',       category: 'Accessories', price: 2499,   gst: 18, stock: 20 },
  { id: 9,  name: 'JBL Flip 6 Speaker',           model: 'JBLFLIP6BLK', category: 'Audio',       price: 11999,  gst: 18, stock: 7  },
  { id: 10, name: 'OnePlus Buds Pro 2',           model: 'E509A',       category: 'Audio',       price: 9999,   gst: 18, stock: 10 },
]

export function searchProducts(query: string): Product[] {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  return DEMO_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.model.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  ).slice(0, 6)
}
