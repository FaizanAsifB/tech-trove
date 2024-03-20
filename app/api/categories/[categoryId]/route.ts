import prismaDb from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = auth()
    const { title } = await req.json()
    console.log({ userId, title })

    if (!userId) {
      return new Response('Unauthenticated', { status: 403 })
    }

    if (!title) {
      return new Response('Name is required', { status: 400 })
    }

    if (!params.categoryId) {
      return new Response('Category id is required', { status: 400 })
    }

    const category = await prismaDb.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        title,
      },
    })
    revalidatePath('admin/categories', 'page')

    return Response.json(category)
  } catch (error) {
    console.log('[CATEGORY_PATCH]', error)
    return new Response('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new Response('Unauthenticated', { status: 403 })
    }

    if (!params.categoryId) {
      return new Response('Category id is required', { status: 400 })
    }

    const category = await prismaDb.category.delete({
      where: {
        id: params.categoryId,
      },
    })
    return Response.json(category)
  } catch (error) {
    console.log('[CATEGORY_DELETE]', error)
    return new Response('Internal error', { status: 500 })
  }
}
