import NavBar from '@/components/NavBar'
import '../globals.css'
import { Toaster } from 'react-hot-toast'


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
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className={`min-h-screen items-center justify-center bg-base-200`} >
        <NavBar />
        <Toaster />
        {children}
      </body>
    </html>
  )
}
