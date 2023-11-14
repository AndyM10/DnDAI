import NavBar from '@/components/NavBar'
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/lib/authContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DnD AI - Lets Generate!',
  description: 'DnD character art generator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <AuthProvider>
          <main className="min-h-screen bg-base-200">
            <NavBar />
            <Toaster />
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
