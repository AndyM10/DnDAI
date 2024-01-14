import { serverClient } from "@/lib/serverClient"
import { cookies } from "next/headers"
import Link from "next/link"
import { SignOut } from "./SignOut"

const NavBar = async () => {
  const cookieStore = cookies()
  const { supabase } = serverClient(cookieStore)
  const { data: { session } } = await supabase.auth.getSession()
  const username = session?.user.user_metadata.username

  return (
    <>
      <div className="navbar bg-base-100 border border-black">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl">DnDAi</a>
        </div>
        <div className="navbar-end">
          {
            session ?
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src="/imgs/classes/druid.jpeg" />
                  </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <a className="justify-between">
                      Profile
                    </a>
                  </li>
                  <li><SignOut /></li>
                </ul>
              </div> :
              <a className="btn btn-primary" href="/login">Login</a>
          }
        </div>
      </div >
    </>
  )
}

export default NavBar
