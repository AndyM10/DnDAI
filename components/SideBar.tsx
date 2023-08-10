import { Database } from '@/lib/database';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';



const SideBar = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies
  })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const routes = ['Generate', 'History', 'Settings']

  return (
    <div className="drawer-side rounded-box">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
        {routes.map((route, index) => {
          return (
            <li key={index}>
              <Link href={`${user.user_metadata.username}/${route.toLowerCase()}`} className='font-normal text-xl'>
                {route}
              </Link>
            </li>
          )
        })
        }
      </ul>
    </div>
  )
}

export default SideBar;
