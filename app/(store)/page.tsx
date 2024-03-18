import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      Home
      <a href="/admin/dashboard">Admin</a>
    </main>
  )
}
