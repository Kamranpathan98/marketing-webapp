import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'MyERP — Invoice 2x Faster Than Tally',
  description:
    'Keyboard-first billing for electronics retailers. Create GST invoices in 9 seconds. Built for mobile and electronics shops switching from Tally.',
  keywords: ['ERP', 'billing software', 'GST invoice', 'electronics shop', 'Tally alternative'],
  openGraph: {
    title: 'MyERP — Invoice 2x Faster Than Tally',
    description:
      'Keyboard-first billing for electronics retailers. Create GST invoices in 9 seconds.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
