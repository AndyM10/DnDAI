import Image from "next/image";

export const Sidebar = () => {

  return (
    <aside className="drawer-side z-10 lg:stick">
      <label htmlFor="my-drawer" className="drawer-overlay lg:sticky"></label>
      <nav className="flex min-h-screen w-72 flex-col bg-base-100 gap-2 overflow-y-auto px-6 py-10">
        <ul className="menu">
          <li>
            <a href="generate">
              <Image src="https://unpkg.com/heroicons/20/solid/home.svg" className="h-5 w-5" width={5} height={5} alt=" GenerateIcon" />
              Generate!
            </a>
          </li>
          <li>
            <a href="history">
              <Image src="https://unpkg.com/heroicons/20/solid/user.svg" className="h-5 w-5" width={5} height={5} alt="StashIcon" />
              Stash
            </a>
          </li>
          <li>
            <details>
              <summary>
                <Image src="https://unpkg.com/heroicons/20/solid/adjustments-vertical.svg" className="h-5 w-5" width={5} height={5} alt="settingsIcon" />
                Settings
              </summary>
              <ul>
                <li><a>General</a></li>
                <li><a>Profile</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

