'use client'

import { browserClient } from "@/lib/browserClient"
import { useRouter } from "next/navigation"

export function SignOut() {
  const { supabase } = browserClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <a onClick={async () => await handleSignOut()}>Logout</a>
  )
}
