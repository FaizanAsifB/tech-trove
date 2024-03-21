'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { CategoryFormValues, CategorySchema } from './definitions'
import prismaDb from './prisma'
import cloudinary from 'cloudinary'

export async function createCategory(formData: CategoryFormValues) {
  // Validate form using Zod
  const validatedFields = CategorySchema.safeParse(formData)

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Category.',
    }
  }

  // Insert data into the database
  try {
    await prismaDb.category.create({
      data: validatedFields.data,
    })
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Category.',
    }
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}

export async function updateCategory(id: string, formData: CategoryFormValues) {
  const validatedFields = CategorySchema.parse(formData)

  try {
    await prismaDb.category.update({
      where: {
        id,
      },
      data: validatedFields,
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
