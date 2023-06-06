'use client'
import { Database } from "@/lib/database"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

const SignOutButton = () => {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  const clickHandler = async () => {
    await supabase.auth.signOut()
    console.log('user logged out!')
    router.refresh()
    router.push('/')
  }

  return (
    <button role="button" className="btn btn-primary" onClick={() => clickHandler()}>Sign Out</button>
  )
}

export default SignOutButton
