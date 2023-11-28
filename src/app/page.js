import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="h-[95vh] absolute w-[25vw] opacity-50 left-3 top-5 z-100 bg-[#0E172B] outline rounded-md">
      </div>
        <div className="h-[95vh] w-[25vw] absolute left-3 top-5 z-1000 bg-none rounded-md flex place-items-center justify-center">
            <h1 className='text-4xl font-mono'>PodCraft</h1>

        </div>
    </main>
  )
}
