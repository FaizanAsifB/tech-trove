import { CartItem, ProductWithImages } from '@/lib/definitions'
import { toast } from 'sonner'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type CartState = {
  items: CartItem[]
  addItem: (id: string) => void
  deleteItem: (id: string) => void
  incrementItem: (id: string) => void
  setQuantity: (id: string, quantity: number) => void
  decrementItem: (id: string) => void
}

const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: id => {
        const currentItems = get().items
        const existingItem = currentItems.find(item => item.id === id)

        if (existingItem) {
          set({
            items: [
              ...currentItems.filter(item => item.id !== id),
              { ...existingItem, quantity: existingItem.quantity + 1 },
            ],
          })
        }

        if (!existingItem) {
          set({ items: [...currentItems, { id, quantity: 1 }] })
        }
        return toast.success('Item added to cart')
      },
      deleteItem: id => {
        set(state => ({ items: state.items.filter(item => item.id !== id) }))

        return toast.success('Item deleted from cart')
      },
      setQuantity: (id, quantity) => {
        set(state => ({
          items: state.items.map(item =>
            item.id === id ? { id, quantity } : item
          ),
        }))
      },
      incrementItem: id => {
        const currentItems = get().items
        const existingItem = currentItems.find(item => item.id === id)
        if (existingItem) {
          set({
            items: [
              ...currentItems.filter(item => item.id !== id),
              { id, quantity: existingItem.quantity + 1 },
            ],
          })
        }
      },
      decrementItem: id => {
        const currentItems = get().items
        const existingItem = currentItems.find(item => item.id === id)
        if (existingItem && existingItem.quantity > 1) {
          set({
            items: [
              ...currentItems.filter(item => item.id !== id),
              { id, quantity: existingItem.quantity - 1 },
            ],
          })
        }
        if (existingItem && existingItem.quantity === 1) {
          get().deleteItem(id)
        }
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useCart
