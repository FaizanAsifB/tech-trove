'use client'

import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function DeleteButton({ categoryId }: { categoryId: string }) {
  const router = useRouter()

  async function handleDelete() {
    await axios.delete(`/api/categories/${categoryId}`)
    router.refresh()
    // router.push('/admin/categories')
  }
  return <Button onClick={handleDelete}>Delete</Button>
}

export default DeleteButton
