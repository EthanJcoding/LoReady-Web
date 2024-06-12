import Link from 'next/link'
import AuthButton from './AuthButton'

export default function SignIn() {
  return (
    <div className='flex flex-col items-center gap-10 mb-20'>
      <div className='w-[25rem] flex flex-col justify-start gap-2 text-4xl font-semibold text-dark dark:text-light'>
        <div className='flex items-center gap-2 overflow-hidden'>
          <span className='text-primary-accent font-bold'>LoReady</span>
          <span>서비스는</span>
        </div>
        <div className='w-0 overflow-hidden border-r-4 border-primary-accent whitespace-nowrap animate-typed-out'>
          로그인 후 이용할 수 있어요.
        </div>
      </div>
      <div className='w-[25rem]'>
        <AuthButton />
      </div>
      <div className='flex justify-center text-sm text-primary-gray underline underline-offset-2'>
        <Link href='/'>홈으로 이동</Link>
      </div>
    </div>
  )
}
