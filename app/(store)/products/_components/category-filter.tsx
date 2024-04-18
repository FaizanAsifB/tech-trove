'use client'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Category } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type CategoryFilterProps = {
  categories: Pick<Category, 'id' | 'title'>[]
}

const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const filteredCategories = searchParams.getAll('filter') || ''

  const createQueryString = (
    name: string,
    value: string,
    isExisting = false
  ) => {
    const params = new URLSearchParams(searchParams.toString())
    console.log({ params })
    if (isExisting) {
      params.delete(name, value)
    }
    if (!isExisting) params.append(name, value)

    return params.toString()
  }
  console.log(filteredCategories)
  return (
    <ul className="space-y-3 text-sm">
      {categories.map(category => (
        <li key={category.id} className="flex gap-2 items-center">
          <Checkbox
            aria-label={category.title}
            id={category.title}
            checked={filteredCategories?.includes(category.title)}
            onCheckedChange={() =>
              filteredCategories?.includes(category.title)
                ? router.push(
                    `${pathname}?${createQueryString(
                      'filter',
                      category.title,
                      true
                    )}`
                  )
                : router.push(
                    `${pathname}?${createQueryString('filter', category.title)}`
                  )
            }
          />
          <Label htmlFor={category.title}>{category.title}</Label>
        </li>
      ))}
    </ul>
  )
}

export default CategoryFilter
