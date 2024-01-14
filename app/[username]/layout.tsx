import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { serverClient } from "@/lib/serverClient";
import { Sidebar } from "@/components/Sidebar";

export default async function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const { supabase } = serverClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  return (
    <section className="drawer min-h-screen lg:drawer-open" >
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <Sidebar username={user.user_metadata.username} />
      <main className="drawer-content">
        {children}
      </main>
    </section>
  )
}
