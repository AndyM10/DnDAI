'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'


import type { Database } from '@/lib/database'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'


export default function Page() {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

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

