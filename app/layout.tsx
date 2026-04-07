import type { Metadata } from 'next'
import { Syne, Inter } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Best Practices Limited — Fleet Management Nigeria',
  description: "Nigeria's leading fleet management support services company. Vehicle tracking, speed limiters, driver training and fleet consulting since 2001.",
  keywords: 'fleet management Nigeria, vehicle tracking, GPS tracking Nigeria, speed limiter, driver training, Best Practices Limited, MiX Telematics Nigeria',
  openGraph: {
    title: 'Best Practices Limited',
    description: "Nigeria's Fleet Intelligence Leader since 2001",
    url: 'https://bestpracticesltd.ng',
    siteName: 'Best Practices Limited',
    locale: 'en_NG',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 pt-[68px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
