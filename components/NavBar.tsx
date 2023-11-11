import { serverClient } from "@/lib/serverClient"
import { cookies } from "next/headers"

const NavBar = async () => {
  const cookieStore = cookies()
  const { supabase } = serverClient(cookieStore)
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a href="/">Homepage</a></li>
              {session ?
                <>
                  <li><a href={`/${session.user.user_metadata.username}/generate`}>Generate</a></li>
                  <li><a>History</a></li>
                  <li><a>About</a></li>
                </>
                : null}
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">DnDAi</a>
        </div>
        <div className="navbar-end">
          {
            session ?
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src="/imgs/druid.jpeg" />
                  </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <a className="justify-between">
                      Profile
                    </a>
                  </li>
                  <li><a>Settings</a></li>
                  <li><a>Logout</a></li>
                </ul>
              </div> :
              <a className="btn btn-primary" href="/login">Sign Up</a>
          }
        </div>
      </div >
    </>
  )
}

export default NavBar
