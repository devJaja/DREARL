import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Layout from './components/Layout'

const inter = Inter({ subsets: ['latin'] })

import { headers } from 'next/headers' // added
import ContextProvider from './context'

export const metadata: Metadata = {
  title: 'DREARL',
  description: 'Powered by Reown'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

  const cookies = headers().get('cookie')

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ContextProvider cookies={cookies}>
          <Layout>{children}</Layout>
        </ContextProvider>
      </body>
    </html>
  )
}