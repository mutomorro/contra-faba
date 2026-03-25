import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Contra Faba - Cost Consultants for the Construction Industry',
    template: '%s | Contra Faba',
  },
  description:
    'Cost consultants for the construction industry. Working across London, the South East and Scotland for architects, contractors and homeowners.',
  keywords: [
    'cost consultants',
    'quantity surveying',
    'construction',
    'feasibility estimates',
    'contract administration',
    'London',
    'Glasgow',
    'Scotland',
  ],
  authors: [{ name: 'Contra Faba Ltd' }],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://contrafaba.com',
    siteName: 'Contra Faba',
    title: 'Contra Faba - Cost Consultants for the Construction Industry',
    description:
      'Cost consultants for the construction industry. Working across London, the South East and Scotland for architects, contractors and homeowners.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
