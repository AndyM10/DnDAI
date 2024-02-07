import { serverClient } from "@/lib/serverClient";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export const Sidebar = async () => {
  const cookieStore = cookies()
  const { supabase } = serverClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()
  const username = user?.user_metadata.username


  return (
    <aside className="drawer-side z-10 lg:stick">
      <label htmlFor="my-drawer" className="drawer-overlay lg:sticky"></label>
      <nav className="flex min-h-screen w-72 flex-col bg-base-100 gap-2 overflow-y-auto px-6 py-10">
        <ul className="menu">
          <li>
            <Link href={`/${username}/generate`}>
              <Image src="https://unpkg.com/heroicons/20/solid/home.svg" className="h-5 w-5" width={5} height={5} alt=" GenerateIcon" />
              Generate!
            </Link>
          </li>
          <li>
            <Link href={`/${username}/stash`}>
              <Image src="https://unpkg.com/heroicons/20/solid/user.svg" className="h-5 w-5" width={5} height={5} alt="StashIcon" />
              Stash
            </Link>
          </li>
          <li>
            <details>
              <summary>
                <Image src="https://unpkg.com/heroicons/20/solid/adjustments-vertical.svg" className="h-5 w-5" width={5} height={5} alt="settingsIcon" />
                Settings
              </summary>
              <ul>
                <li><a>General</a></li>
                <li><Link href={`/${username}/settings/profile`}>Profile</Link></li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    </aside >
  );
};

