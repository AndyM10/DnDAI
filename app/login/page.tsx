'use client'
import { useRouter } from 'next/navigation'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'

export default function Page() {
  const router = useRouter()

  return (
    <>
      <div className="flex flex-col w-full lg:flex-row m-4">
        <div className="grid flex-grow rounded-box place-items-center">
          <SignUpForm />
        </div>
        <div className="divider lg:divider-horizontal before:bg-primary after:bg-primary">
          OR
        </div>
        <div className="grid flex-grow rounded-box place-items-center">
          <LoginForm router={router} />
        </div>
      </div>
    </>
  )
}

