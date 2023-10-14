'use server'
import SideBar from "@/components/SideBar";
import { Bars3Icon } from "@heroicons/react/20/solid"
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { Database } from "@/lib/database";

export default async function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore
  })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <main className="flex-1 overflow-y-auto px-6 ">
          <label htmlFor="my-drawer-2" className="btn my-2 lg:hidden">
            <Bars3Icon className="w-5 h-5" />
          </label>
          {children}
        </main>
      </div>
      <SideBar />
    </div>
  )
}
