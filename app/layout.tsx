import { Metadata } from 'next'
import Navbar from './components/Navbar'
import './globals.css'
import {ThemeProvider} from './components/ThemeProvider'

export const metadata: Metadata = {
  title: "Daggy's blog",
  description: 'Created by Douglas Kipyegon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='dark:bg-slate-800'>
      <ThemeProvider attribute="class">
        <Navbar />
        <main className='px-4 md:px-6 prose prose-xl prose-slate dark:prose-invert mx-auto'>
          {children}
        </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
