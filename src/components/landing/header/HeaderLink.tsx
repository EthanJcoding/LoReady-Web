import Link from 'next/link'

interface Ownprops {
  href: string
  children: React.ReactNode
  isDisabled?: boolean
  target?: '_blank' | '_self'
}

export default function HeaderLink({ href, children, isDisabled = false, target = '_self' }: Ownprops) {
  return (
    <Link
      className={`transition hover:bg-secondary-gray/50 rounded px-2 ${
        isDisabled ? 'pointer-events-none opacity-50' : ''
      }`}
      href={href}
      target={target}
    >
      {children}
    </Link>
  )
}
