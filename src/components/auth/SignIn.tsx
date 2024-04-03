import Link from 'next/link'
import AuthButton from './AuthButton'
import { PiLockKeyThin } from 'react-icons/pi'

export default function SignIn() {
  return (
    <div className='h-dvh flex justify-center bg-light'>
      <div className='flex flex-col gap-24 px-32 bg-white/80 border-x border-secondary-gray/50'>
        <div className='basis-1/3 flex flex-col justify-end items-center gap-4 text-primary-gray'>
          <div className='p-4 bg-light border border-primary-gray rounded-full text-6xl'>
            <PiLockKeyThin />
          </div>
          <p className='text-5xl font-thin'>Login</p>
        </div>
        <div className='flex-1 flex flex-col items-center gap-5 text-base'>
          <p className='text-dark text-base underline underline-offset-1 decoration-secondary-accent decoration-4'>
            로그인 후 이용해주세요.
          </p>
          <AuthButton />
        </div>
        <div className='flex justify-center mb-10 text-sm text-primary-gray underline underline-offset-2'>
          <Link href='/'>홈으로 이동</Link>
        </div>
      </div>
    </div>
  )
}
