import Image from 'next/image'
import Sidebar from '@/Components/Sidebar'
import Middle from '@/Components/Middle'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Sidebar/>
        <Middle/>
    </main>
  )
}
