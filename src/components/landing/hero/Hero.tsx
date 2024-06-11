import Animation from '../animation/animation'

export default function Hero() {
  return (
    <main className='w-full h-full flex flex-col sm:p-32 p-8'>
      <section className='flex flex-col sm:flex-row w-full h-full gap-10'>
        <div className='flex flex-col items-left justify-center h-full w-full'>
          <h1 className='sm:text-4xl font-bold mb-4 sm:w-max w-full text-xl'>
            친구들, 길드원들과 <div className='mb-2' /> 레이드 스케줄을 편하게 관리하세요
          </h1>
          <p className='sm:text-xl mb-8'>디스코드에서 레이드 스케줄을 만들고 공유하세요 !</p>
          <div className='flex gap-4 mb-8'>
            <button className='text-light bg-primary-accent hover:bg-primary-accent/70 font-medium py-2 px-4 rounded transition'>
              사용법
            </button>
            <button className='text-light bg-primary-accent hover:bg-primary-accent/70 font-medium py-2 px-4 rounded transition'>
              봇 추가하기
            </button>
          </div>
        </div>
        <Animation />
      </section>
    </main>
  )
}
