import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '../types'

interface CartStore {
  items: CartItem[]
  addedItemIds: number[]
  addItem: (product: Product) => { alreadyAdded: boolean }
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
  isItemAdded: (productId: number) => boolean
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addedItemIds: [],
      addItem: (product) => {
        const items = get().items
        const existingItem = items.find((item) => item.product.id === product.id)
        let addedItemIds = get().addedItemIds

        // Ensure addedItemIds is always an array
        if (!Array.isArray(addedItemIds)) {
          addedItemIds = []
        }

        if (existingItem) {
          return { alreadyAdded: true }
        } else {
          set({
            items: [...items, { product, quantity: 1 }],
            addedItemIds: [...addedItemIds, product.id]
          })
          return { alreadyAdded: false }
        }
      },
      removeItem: (productId) => {
        const addedItemIds = get().addedItemIds
        set({
          items: get().items.filter((item) => item.product.id !== productId),
          addedItemIds: addedItemIds.filter(id => id !== productId)
        })
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })
      },
      clearCart: () => set({ items: [], addedItemIds: [] }),
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
      isItemAdded: (productId) => {
        return get().addedItemIds.includes(productId)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)
