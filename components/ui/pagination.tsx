import PaginationButtons from '@/components/ui/pagination-buttons'

type PaginationProps = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  title: string
  queryParamKey: string
  children: React.ReactNode
}

const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  title,
  queryParamKey,
  children,
}: PaginationProps) => {
  const maxItemsOnPage = currentPage * itemsPerPage
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  let showingStart = (currentPage - 1) * itemsPerPage + 1
  let showingEnd = showingStart + itemsPerPage - 1
  if (showingEnd > totalItems) {
    showingEnd = totalItems
  }

  const isPlural = totalItems > 1
  return (
    <>
      <p className="font-semibold">
        Showing {showingStart} - {showingEnd} of {totalItems}{' '}
        {isPlural ? title + 's' : title}
      </p>
      {children}
      <PaginationButtons
        totalPages={totalPages}
        queryParamKey={queryParamKey}
      />
    </>
  )
}
export default Pagination
