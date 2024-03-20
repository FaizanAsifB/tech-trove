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
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const categorySchema = z.object({
  title: z.string().min(1, 'Title is required').max(50),
})

type Category = z.infer<typeof categorySchema>

type CategoryFormProps = {
  onSubmit: (data: Category) => Promise<void>
}

const CategoryForm = () => {
  const form = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: '',
    },
  })

  function handleSubmit(data: Category) {
    //add axios post request
    axios.post('http://localhost:3000/api/category', data)
  }

  return (
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
export default CategoryForm
