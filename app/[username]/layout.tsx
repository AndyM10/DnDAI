import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { serverClient } from "@/lib/serverClient";

export default async function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const { supabase } = serverClient(cookieStore)

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  return (
    <section>
      {children}
    </section>
  )
}
