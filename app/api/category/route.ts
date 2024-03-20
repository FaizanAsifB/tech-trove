import prismaDb from '@/lib/prisma'

export async function POST(req: Request, res: Response) {
  const data = await req.json()
  const newCategory = await prismaDb.category.create({
    data,
  })
  return Response.json(newCategory)
}
