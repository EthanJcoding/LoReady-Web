'use client'
import { create } from 'zustand'
type Store = {
  party1: {
    name: string
  }[]
  party2: {
    name: string
  }[]
}

const useStore = create<Store>(() => ({
  party1: [
    { name: '파이어베이스장인' },
    { name: '쉽지않은파이어베이스' },
    { name: '할수있다파이어베이스' },
    { name: '킹갓준일님' }
  ],
  party2: [{ name: 'v최강준일v' }, { name: '달래비빔밥' }, { name: '어묵탕탕수육' }, { name: '로레디짱' }]
}))

export default function PartyList() {
  const { party1, party2 } = useStore()

  return (
    <div className='grid gap-4 grid-cols-2 pt-2 px-3 '>
      <div className='bg-lime-400 rounded-md font-bold text-white'>1번파티</div>
      <ul className='text-center gap-1'>
        {party1.map((party, index) => (
          <li className='bg-slate-300 mt-1 rounded-md' key={index}>
            {party.name}
          </li>
        ))}
      </ul>
      <div className='bg-violet-600 rounded-md font-bold text-white'>2번파티</div>
      <ul className='text-center'>
        {party2.map((party, index) => (
          <li className='bg-slate-300 mt-1 rounded-md' key={index}>
            {party.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
