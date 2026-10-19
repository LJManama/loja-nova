// API_BASE - usa caminho relativo que funciona em ambos ambientes
const API_BASE = '/api'

interface Product {
  id?: number
  name: string
  description: string
  price: number
  original_price?: number
  discount?: number
  image: string
  images?: string[]
  category_id: number
  category?: string
  brand: string
  stock: number
  rating?: number
  reviews?: number
  featured?: boolean
  specifications?: Record<string, string>
}

interface Category {
  id?: number
  name: string
  description: string
  image: string
  productCount?: number
}

interface User {
  id?: number
  name: string
  email: string
  phone?: string
  password?: string
  is_admin?: boolean
}

interface Order {
  id?: number
  user_id: number
  total: number
  status: string
  shipping_address: string
  payment_method: string
  items?: any[]
}

// Products API
export const productsApi = {
  getAll: async (filters?: { category?: string; search?: string; featured?: boolean; discount?: boolean; sort?: string }): Promise<Product[]> => {
    const params = new URLSearchParams()
    if (filters?.category) params.append('category', filters.category)
    if (filters?.search) params.append('search', filters.search)
    if (filters?.featured) params.append('featured', '1')
    if (filters?.discount) params.append('discount', 'true')
    if (filters?.sort) params.append('sort', filters.sort)
    
    // Add language parameter
    const language = localStorage.getItem('language') || 'pt'
    params.append('lang', language)
    
    const response = await fetch(`${API_BASE}/products.php?${params}`)
    return response.json()
  },

  getById: async (id: number): Promise<Product> => {
    const language = localStorage.getItem('language') || 'pt'
    const response = await fetch(`${API_BASE}/products.php?id=${id}&lang=${language}`)
    return response.json()
  },

  create: async (product: Product): Promise<any> => {
    const response = await fetch(`${API_BASE}/products.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
    return response.json()
  },

  update: async (id: number, product: Product): Promise<any> => {
    const response = await fetch(`${API_BASE}/products.php?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
    return response.json()
  },

  delete: async (id: number): Promise<any> => {
    const response = await fetch(`${API_BASE}/products.php?id=${id}`, {
      method: 'DELETE',
    })
    return response.json()
  },
}

// Categories API
export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await fetch(`${API_BASE}/categories.php`)
    return response.json()
  },

  getById: async (id: number): Promise<Category> => {
    const response = await fetch(`${API_BASE}/categories.php?id=${id}`)
    return response.json()
  },

  create: async (category: Category): Promise<any> => {
    const response = await fetch(`${API_BASE}/categories.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    })
    return response.json()
  },

  update: async (id: number, category: Category): Promise<any> => {
    const response = await fetch(`${API_BASE}/categories.php?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    })
    return response.json()
  },

  delete: async (id: number): Promise<any> => {
    const response = await fetch(`${API_BASE}/categories.php?id=${id}`, {
      method: 'DELETE',
    })
    return response.json()
  },
}

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<any> => {
    // Try simple login first for admin
    if (email === 'admin@loja.mz' && password === 'admin123') {
      const response = await fetch(`${API_BASE}/simple_login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      return response.json()
    }
    
    // Normal login
    const response = await fetch(`${API_BASE}/auth.php?action=login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    return response.json()
  },

  register: async (name: string, email: string, password: string, phone?: string): Promise<any> => {
    const response = await fetch(`${API_BASE}/auth.php?action=register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone }),
    })
    return response.json()
  },
}

// Users API
export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE}/users.php`)
    return response.json()
  },

  getById: async (id: number): Promise<User> => {
    const response = await fetch(`${API_BASE}/users.php?id=${id}`)
    return response.json()
  },

  create: async (user: User): Promise<any> => {
    const response = await fetch(`${API_BASE}/users.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    return response.json()
  },

  update: async (id: number, user: User): Promise<any> => {
    const response = await fetch(`${API_BASE}/users.php?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    return response.json()
  },

  delete: async (id: number): Promise<any> => {
    const response = await fetch(`${API_BASE}/users.php?id=${id}`, {
      method: 'DELETE',
    })
    return response.json()
  },
}

// Orders API
export const ordersApi = {
  getAll: async (userId?: number): Promise<Order[]> => {
    const params = userId ? `?user_id=${userId}` : ''
    const response = await fetch(`${API_BASE}/orders.php${params}`)
    return response.json()
  },

  getById: async (id: number): Promise<Order> => {
    const response = await fetch(`${API_BASE}/orders.php?id=${id}`)
    return response.json()
  },

  create: async (order: Order): Promise<any> => {
    const response = await fetch(`${API_BASE}/orders.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    })
    return response.json()
  },

  update: async (id: number, status: string): Promise<any> => {
    const response = await fetch(`${API_BASE}/orders.php?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    return response.json()
  },
}

// Reviews API
export const reviewsApi = {
  getByProduct: async (productId: number): Promise<any[]> => {
    const response = await fetch(`${API_BASE}/reviews.php?product_id=${productId}`)
    return response.json()
  },

  create: async (review: { product_id: number; user_id: number; rating: number; comment?: string }): Promise<any> => {
    const response = await fetch(`${API_BASE}/reviews.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    })
    return response.json()
  },

  delete: async (id: number, userId: number, productId: number): Promise<any> => {
    const response = await fetch(`${API_BASE}/reviews.php?id=${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, product_id: productId }),
    })
    return response.json()
  },
}

// Favorites API
export const favoritesApi = {
  getByUser: async (userId: number): Promise<any[]> => {
    const response = await fetch(`${API_BASE}/favorites.php?user_id=${userId}`)
    return response.json()
  },

  add: async (userId: number, productId: number): Promise<any> => {
    const response = await fetch(`${API_BASE}/favorites.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, product_id: productId }),
    })
    return response.json()
  },

  remove: async (userId: number, productId: number): Promise<any> => {
    const response = await fetch(`${API_BASE}/favorites.php`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, product_id: productId }),
    })
    return response.json()
  },
}

// Shipping API
export const shippingApi = {
  getAll: async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE}/shipping.php`)
    return response.json()
  },

  getByLocation: async (province: string, city?: string): Promise<any> => {
    const params = city ? `?province=${province}&city=${city}` : `?province=${province}`
    const response = await fetch(`${API_BASE}/shipping.php${params}`)
    return response.json()
  },

  create: async (rate: { province: string; city?: string; rate: number; estimated_days?: number }): Promise<any> => {
    const response = await fetch(`${API_BASE}/shipping.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rate),
    })
    return response.json()
  },

  update: async (id: number, rate: { province: string; city?: string; rate: number; estimated_days?: number }): Promise<any> => {
    const response = await fetch(`${API_BASE}/shipping.php?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rate),
    })
    return response.json()
  },

  delete: async (id: number): Promise<any> => {
    const response = await fetch(`${API_BASE}/shipping.php?id=${id}`, {
      method: 'DELETE',
    })
    return response.json()
  },
}
