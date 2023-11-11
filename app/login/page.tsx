'use client'
import { useRouter } from 'next/navigation'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/database'


export default function Page() {
  const router = useRouter()
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

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

