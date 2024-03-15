'use client'

import {
  ArchiveBoxIcon,
  ArrowLeftEndOnRectangleIcon,
  Cog6ToothIcon,
  HomeIcon,
  ListBulletIcon,
  QueueListIcon,
} from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { title: 'Dashboard', href: '/admin', icon: <HomeIcon /> },
  { title: 'Products', href: '/admin/products', icon: <ArchiveBoxIcon /> },
  { title: 'Categories', href: '/admin/categories', icon: <ListBulletIcon /> },
  { title: 'Orders', href: '/admin/orders', icon: <QueueListIcon /> },
  { title: 'Settings', href: '/admin/settings', icon: <Cog6ToothIcon /> },
  {
    title: 'Logout',
    href: '/admin/logout',
    icon: <ArrowLeftEndOnRectangleIcon />,
  },
]

const Nav = () => {
  const pathname = usePathname()

  return (
    <aside className="h-full text-xl my-4 ml-4 text-slate-600">
      <div className="flex gap-1 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
          />
        </svg>
        <span>MyE-commerce Admin</span>
      </div>

      <ul className="space-y-4 ">
        {navLinks.map(link => (
          <li key={link.title} className="group ">
            <Link
              href={link.href}
              className={`flex items-center gap-1 p-1 rounded-sm group-hover:bg-blue-100 ${
                pathname === link.href
                  ? 'bg-blue-300 group-hover:bg-blue-300'
                  : ''
              }`}
            >
              <div
                className={`h-6 w-6 group-hover:text-blue-400 ${
                  pathname === link.href
                    ? 'text-blue-500 group-hover:text-blue-500'
                    : ''
                }`}
              >
                {link.icon}
              </div>
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
export default Nav
