import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { serverClient } from "@/lib/serverClient";
import '../../globals.css'
import { Sidebar } from "@/components/Sidebar";
import DashBoardNav from "@/components/DashboardNav";

export default async function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const { supabase } = serverClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/')
  }

  return (
    <html lang="en">
      <body className={`min-h-screen drawer lg:drawer-open bg-base-200`} >
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <Sidebar />
        <main className="drawer-content grid grid-cols-12 grid-rows-[min-content] gap-y-12 lg:gap-x-12 lg:p-10">
          <DashBoardNav title="Generate!" />
          {children}
        </main>
      </body>
    </html>
  )
}
