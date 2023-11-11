'use client'
import { useRouter } from 'next/navigation'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import { browserClient } from '@/lib/browserClient'


export default function Page() {
  const router = useRouter()
  const { supabase } = browserClient()

  return (
    <>
      <div className="flex flex-col w-full lg:flex-row m-4">
        <div className="grid flex-grow rounded-box place-items-center">
          <SignUpForm router={router} supabase={supabase} />
        </div>
        <div className="divider lg:divider-horizontal before:bg-primary after:bg-primary">
          OR
        </div>
        <div className="grid flex-grow rounded-box place-items-center">
          <LoginForm router={router} supabase={supabase} />
        </div>
      </div>
    </>
  )
}

