import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div className="flex items-center justify-center h-screen flex-col">
        <h1 className="font-poiret text-5xl m-14">CALDEIRÃO AWARDS</h1>
        <Link className="flex justify-center items-center font-poiret text-lg gap-2 w-40 h-12 cursor-pointer rounded-md shadow-2xl text-black font-bold bg-gradient-to-r from-[#fbd671] via-[#e1ad1d] to-[#be7912] hover:shadow-md hover:shadow-yellow-600 hover:scale-105 duration-300 hover:from-[#be8812] hover:to-[#fbcf71]"
        href="/login">
          VOTE AGORA
        </Link>
      </div>
    </main>
  )
}
