'use client'
import { ThemeProvider as Provider } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeProvider({
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
    <Provider enableSystem={true} attribute='class'>
      {children}
    </Provider>
  )
}
