import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  brand: string
}

interface FavoritesState {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  isFavorite: (productId: number) => boolean
  clearFavorites: () => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const { items, isFavorite } = get()
        if (!isFavorite(product.id)) {
          set({ items: [...items, product] })
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) })
      },
      isFavorite: (productId) => {
        return get().items.some((item) => item.id === productId)
      },
      clearFavorites: () => {
        set({ items: [] })
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
)
