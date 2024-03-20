'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Category } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const categorySchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(50),
})

type CategoryFormValues = z.infer<typeof categorySchema>

type CategoryFormProps = {
  initialData: Category | null
}

const CategoryForm = ({ initialData }: CategoryFormProps) => {
  const router = useRouter()

  const title = initialData ? 'Edit category' : 'Create category'
  const description = initialData ? 'Edit a category.' : 'Add a new category'
  //  const toastMessage = initialData ? 'Category updated.' : 'Category created.'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      title: '',
    },
  })

  async function handleSubmit(data: CategoryFormValues) {
    try {
      await axios.post('http://localhost:3000/api/category', data)

      router.refresh()
      router.push('/admin/categories')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Heading title={title} description={description} />
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Category title" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{action}</Button>
        </form>
      </Form>
    </>
  )
}
export default CategoryForm
