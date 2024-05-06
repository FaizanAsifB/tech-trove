type OrderInfoRowProps = {
  title: string
  data: string
}
export const OrderInfoRow = ({ title, data }: OrderInfoRowProps) => {
  return (
    <li className="flex gap-2 even:bg-secondary p-1">
      <p className=" w-36 ">{title}</p>
      <p>{data}</p>
    </li>
  )
}
