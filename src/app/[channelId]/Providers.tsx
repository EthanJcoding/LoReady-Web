'use client'
import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Providers({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isMount, setMount] = useState(false)

  useEffect(() => {
    setMount(true)
  }, [])

  if (!isMount) return null

  return (
    <ThemeProvider enableSystem={true} attribute='class'>
      {children}
    </ThemeProvider>
  )
}
