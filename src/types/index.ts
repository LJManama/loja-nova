export interface Product {
  id: number
  name: string
  description: string
  price: number
  original_price?: number
  discount?: number
  image: string
  images?: string[]
  category: string
  brand: string
  stock: number
  rating: number
  reviews: number
  featured?: boolean
  specifications?: Record<string, string>
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface User {
  id: number
  name: string
  email: string
  phone?: string
  address?: string
  isAdmin: boolean
  createdAt: string
}

export interface Order {
  id: number
  userId: number
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: string
  paymentMethod: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: number
  name: string
  description: string
  image: string
  productCount: number
}

export interface Review {
  id: number
  productId: number
  userId: number
  userName: string
  rating: number
  comment: string
  createdAt: string
}
