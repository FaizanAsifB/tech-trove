'use server'

import { Image } from '@prisma/client'
import cloudinary from 'cloudinary'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { CategoryFormSchema, CategoryFormValues } from './definitions'
import prismaDb from './prisma'

export async function createCategory(formData: CategoryFormValues) {
  const validatedFields = CategoryFormSchema.safeParse(formData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Category.',
    }
  }

  const { title, images } = validatedFields.data

  try {
    await prismaDb.category.create({
      data: {
        title,
        images: {
          createMany: {
            data: images.map(image => ({ ...image, productId: null })),
          },
        },
      },
      include: {
        images: true,
      },
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Category.',
    }
  }

  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}

export async function updateCategory(id: string, formData: CategoryFormValues) {
  const validatedFields = CategoryFormSchema.safeParse(formData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Category.',
    }
  }

  const { title, images } = validatedFields.data

  try {
    await prismaDb.category.update({
      where: {
        id,
      },
      data: {
        title,
        images: {
          createMany: {
            data: images.map(image => ({ ...image, productId: null })),
          },
        },
      },
      include: {
        images: true,
      },
    })
  } catch (error) {
    return { message: 'Database Error: Failed to Update Category.' }
  }

  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}

export async function deleteCategory(id: string) {
  try {
    await prismaDb.category.delete({
      where: {
        id,
      },
    })
    revalidatePath('/admin/categories')
    return { message: 'Deleted Category.' }
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Category.' }
  }
}

export async function toggleIsDefault(public_id: string) {
  try {
    await prismaDb.image.update({
      where: {
        public_id,
      },
      data: {
        isDefault: true,
      },
    })
    await prismaDb.image.updateMany({
      where: { public_id: { not: public_id } },
      data: { isDefault: false },
    })

    revalidatePath('/admin/products')
    return { message: 'Default image updated.' }
  } catch (error) {
    return { message: 'Database Error: Failed to update default image.' }
  }
}

// Import the Cloudinary module

// Configure Cloudinary with your account credentials
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
})

export default async function deleteCloudImage(public_id: string) {
  try {
    await cloudinary.v2.uploader.destroy(public_id)
  } catch (error) {
    return { message: 'Internal server error' }
  }
}
