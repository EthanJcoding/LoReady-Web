export default function SideBar() {
  return (
    <aside className='min-w-72 flex flex-col border-r bg-white border-gray-200/70'>
      <header className='flex items-center p-7'>
        <div className='flex-1'>
          <a className='text-2xl text-blue-700' href='/'>
            LoReady
          </a>
        </div>
        <div>light</div>
      </header>
      <div className='flex-1 flex flex-col justify-center p-7'>참여중인 서버</div>
      <footer className='flex flex-col gap-5 px-7 py-5 border-t border-gray-200/70'>
        <ul className='flex gap-5 text-base text-gray-700'>
          <li>
            <a href='https://github.com/EthanJcoding/LoReady-Web' target='_blank'>
              GitHub
            </a>
          </li>
          <li>Contact us</li>
        </ul>
        <div className='text-xs text-gray-400'>&copy; 2024. LoReady. All rights reserved.</div>
      </footer>
    </aside>
  )
}
