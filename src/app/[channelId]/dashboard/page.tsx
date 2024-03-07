export default function Dashboard() {
  return (
    <div className='flex-1 flex gap-5'>
      <div className='basis-1/3 p-5 rounded-lg bg-[#ffd2d6]/50 shadow-lg shadow-gray-200/50'>다가오는 레이드</div>
      <div className='flex-1 grid grid-cols-2 gap-5'>
        <div className='p-5 rounded-lg bg-white/50 shadow-lg shadow-gray-200/50'>1</div>
        <div className='p-5 rounded-lg bg-white/50 shadow-lg shadow-gray-200/50'>2</div>
        <div className='p-5 rounded-lg bg-white/50 shadow-lg shadow-gray-200/50'>3</div>
        <div className='p-5 rounded-lg bg-white/50 shadow-lg shadow-gray-200/50'>4</div>
      </div>
    </div>
  )
}
