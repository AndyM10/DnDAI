import Sidebar from "@/components/dashboard/Sidebar"

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen" >
      <Sidebar />
      {children}
    </div >
  )
}

