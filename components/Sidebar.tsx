import Image from "next/image";

interface SidebarProps {
  username: string
}
export const Sidebar = ({ username }: SidebarProps) => {

  return (
    <aside className="drawer-side z-10 lg:sticky">
      <label htmlFor="my-drawer" className="drawer-overlay lg:sticky"></label>
      <nav className="flex min-h-screen w-72 flex-col gap-2 overflow-y-auto bg-base-100 px-6 py-10">
        <ul className="menu">
          <li>
            <a className="active" href={`/generate`}>
              <Image src="https://unpkg.com/heroicons/20/solid/home.svg" className="h-5 w-5 white" width={5} height={5} alt=" GenerateIcon" />
              Generate!
            </a>
          </li>
          <li>
            <a>
              <svg data-src="https://unpkg.com/heroicons/20/solid/user.svg" className="h-5 w-5"></svg>
              Users
            </a>
          </li>
          <li>
            <details>
              <summary>
                <svg data-src="https://unpkg.com/heroicons/20/solid/squares-2x2.svg" className="h-5 w-5"></svg>
                Products
              </summary>
              <ul>
                <li><a>All Products</a></li>
                <li><a>Add New</a></li>
                <li><a>Categories</a></li>
                <li><a>Tags</a></li>
                <li><a>Reports</a></li>
                <li><a>Archive</a></li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>
                <svg data-src="https://unpkg.com/heroicons/20/solid/credit-card.svg" className="h-5 w-5"></svg>
                Transactions
              </summary>
              <ul>
                <li><a>All Transactions</a></li>
                <li><a>Failed Transactions</a></li>
                <li><a>Successful Transactions</a></li>
              </ul>
            </details>
          </li>
          <li>
            <a>
              <svg data-src="https://unpkg.com/heroicons/20/solid/chart-pie.svg" className="h-5 w-5"></svg>
              Stats
            </a>
          </li>
          <li>
            <a>
              <svg data-src="https://unpkg.com/heroicons/20/solid/document-text.svg" className="h-5 w-5"></svg>
              Logs
            </a>
          </li>
          <li>
            <a>
              <svg data-src="https://unpkg.com/heroicons/20/solid/inbox.svg" className="h-5 w-5"></svg>
              Messages
              <span className="badge badge-info badge-sm">12</span>
            </a>
          </li>
          <li>
            <details>
              <summary>
                <svg data-src="https://unpkg.com/heroicons/20/solid/adjustments-vertical.svg" className="h-5 w-5"></svg>
                Settings
              </summary>
              <ul>
                <li><a>General</a></li>
                <li><a>Themes</a></li>
                <li><a>Routes</a></li>
                <li><a>Comments</a></li>
                <li><a>Media</a></li>
                <li><a>Roles</a></li>
                <li><a>Merchants</a></li>
                <li>
                  <a>Tools</a>
                  <ul>
                    <li><a>Files</a></li>
                    <li><a>Scripts</a></li>
                    <li><a>Suggestions</a></li>
                  </ul>
                </li>
                <li><a>Databases</a></li>
                <li><a>Gateways</a></li>
                <li><a>Plugins</a></li>
                <li><a>API</a></li>
                <li><a>Support</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

