import { CartItem, ProductWithImages } from '@/lib/definitions'
import { toast } from 'sonner'
import { create } from 'zustand'

type CartState = {
  items: CartItem[]
  addItem: (data: ProductWithImages) => void
  deleteItem: (id: string) => void
}

const useCart = create<CartState>()((set, get) => ({
  items: [],
  addItem: data => {
    const currentItems = get().items
    const existingItem = currentItems.find(item => item.id === data.id)

    if (existingItem) {
      set({
        items: [{ ...existingItem, quantity: existingItem.quantity + 1 }],
      })
    }

    if (!existingItem) {
      set({ items: [{ ...data, quantity: 1 }] })
    }
    return toast.success(`${data.title} added to cart`)
  },
  deleteItem: id =>
    set(state => ({ items: state.items.filter(item => item.id !== id) })),
  removeAll: () => set({ items: [] }),
}))

export default useCart
