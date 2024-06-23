'use client'

import Lottie from 'react-lottie-player'
import lottieJson from '../../../../public/images/hero1.json'

export default function Animation() {
  return (
    <Lottie loop animationData={lottieJson} play className='flex-1 min-w-[640px] max-xl:min-w-[520px] max-lg:hidden' />
  )
}
