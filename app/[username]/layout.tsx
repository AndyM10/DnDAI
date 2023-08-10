import SideBar from "@/components/SideBar";

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <main className="flex-1 overflow-y-auto pt-8 px-6 ">
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
          {children}
        </main>
      </div>
      <SideBar />
    </div>
  )
}
