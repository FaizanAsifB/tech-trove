import { formattedProduct } from '@/lib/definitions'
import { Product } from '@prisma/client'
import { create } from 'zustand'

type CartState = {
  items: formattedProduct[]
  addItem: (item: formattedProduct) => void
  deleteItem: (id: string) => void
}

const useCart = create<CartState>()(set => ({
  items: [],
  addItem: item => set(state => ({ items: [...state.items, item] })),
  deleteItem: id =>
    set(state => ({ items: state.items.filter(item => item.id !== id) })),
  removeAll: () => set({ items: [] }),
}))

export default useCart
