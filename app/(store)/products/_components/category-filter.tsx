'use client'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Category } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type CategoryFilterProps = {
  categories: Category[]
}

const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  const searchParams = useSearchParams()

  const router = useRouter()
  const pathname = usePathname()
  const filteredCategories = searchParams.get('filter') || ''

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)

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
                ? createQueryString('filter', '')
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
