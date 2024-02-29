export default function Navigation() {
  console.log('test')
  return (
    <nav className='border-b border-gray-200/70'>
      <ul className='flex'>
        <li className='px-4 py-1 border-b-2 border-black font-bold'>대시보드</li>
        <li className='px-4 py-1'>레이드 일정</li>
      </ul>
    </nav>
  )
}
