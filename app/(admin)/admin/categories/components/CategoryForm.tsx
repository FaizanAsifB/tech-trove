'use client'

import ImageUpload from '@/components/ui/ImageUpload'
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
import { createCategory, updateCategory } from '@/lib/actions'
import { CategoryFormSchema, CategoryFormValues } from '@/lib/definitions'
import { zodResolver } from '@hookform/resolvers/zod'
import { Category, Image } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

type CategoryFormProps = {
  initialData?: (Category & { images: Image[] }) | null
}

const CategoryForm = ({ initialData }: CategoryFormProps) => {
  const params = useParams()
  const router = useRouter()

  const title = initialData ? 'Edit category' : 'Create category'
  const description = initialData ? 'Edit a category.' : 'Add a new category'
  //  const toastMessage = initialData ? 'Category updated.' : 'Category created.'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: initialData || {
      title: '',
      images: [],
    },
  })

  async function handleSubmit(data: CategoryFormValues) {
    try {
      if (initialData) {
        await updateCategory(params.categoryId as string, data)
        // await axios.patch(`/api/categories/${params.categoryId}`, data)
      } else {
        await createCategory(data)
        // await axios.post('/api/categories', data)
      }

      // router.refresh()
      // router.push('/admin/categories')
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
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    disabled={form.formState.isSubmitting}
                    onChange={field.onChange}
                    onRemove={url =>
                      field.onChange([
                        ...field.value.filter(image => image.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
