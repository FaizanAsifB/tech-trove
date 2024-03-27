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
import { createCategory, toggleIsDefault, updateCategory } from '@/lib/actions'
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
        const newImages = data.images.filter(
          newImage =>
            !initialData.images
              .map(img => img.public_id)
              .includes(newImage.public_id)
        )
        const updatedData = {
          title: data.title,
          images: newImages,
        }
        await updateCategory(params.categoryId as string, updatedData)
        const newDefault = data.images.filter(img => img.isDefault)[0]
        console.log(newImages)
        if (
          newDefault.public_id !==
          initialData.images.filter(img => img.isDefault)[0].public_id
        ) {
          await toggleIsDefault(newDefault.public_id, initialData.id)
        }
      } else {
        await createCategory(data)
      }
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
          <Separator />
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
          <Button type="submit">{action}</Button>
        </form>
      </Form>
    </>
  )
}
export default CategoryForm
