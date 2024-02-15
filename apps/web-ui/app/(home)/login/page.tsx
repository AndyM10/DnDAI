
import { serverClient } from "@/lib/serverClient";
import LoginForm from "./LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = cookies()
  const { supabase } = serverClient(cookieStore)
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect(`/${session.user.user_metadata.username}/generate`)
  }

  return (
    <div className="m-4 min-h-[50vh] w-full max-w-sm lg:max-w-4xl">
      <LoginForm />
    </div>
  )
}


