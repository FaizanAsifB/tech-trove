import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8 mt-24">
      <div className="flex justify-between container">
        <div>logo</div>
        <div>copyright</div>
        <div>
          <ul className="flex gap-4">
            <li>
              <Link href="#" target="_blank">
                f
              </Link>
            </li>
            <li>
              <Link href="#" target="_blank">
                i
              </Link>
            </li>
            <li>
              <Link href="#" target="_blank">
                x
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
export default Footer
