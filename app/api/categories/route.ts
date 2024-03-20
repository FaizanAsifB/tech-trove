import prismaDb from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json()
    const newCategory = await prismaDb.category.create({
      data,
    })
    revalidatePath('admin/categories')
    return Response.json(newCategory)
  } catch (error) {
    console.log(error)
  }
}
