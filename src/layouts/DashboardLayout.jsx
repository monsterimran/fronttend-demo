import { useState, useContext, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AuthContext } from "../authentications/providers/AuthProvider";

const DashboardLayout = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    document.title = 'Dashboard';
  }, [])

  const handleLogOut = () => {
    logOut();
  }

  return (
    <div className="flex">

      <div className="w-1/4">
        <button
          title="Side navigation"
          type="button"
          className={`visible fixed left-6 top-6 z-40 order-10 block h-10 w-10 self-center rounded bg-white opacity-100 lg:hidden ${
            isSideNavOpen
              ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
              : ""
          }`}
          aria-haspopup="menu"
          aria-label="Side navigation"
          aria-expanded={isSideNavOpen ? " true" : "false"}
          aria-controls="nav-menu-4"
          onClick={() => setIsSideNavOpen(!isSideNavOpen)}
        >
          <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
            <span
              aria-hidden="true"
              className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"
            ></span>
            <span
              aria-hidden="true"
              className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
            ></span>
            <span
              aria-hidden="true"
              className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
            ></span>
          </div>
        </button>

        {/*  <!-- Side Navigation --> */}
        <aside
          id="nav-menu-4"
          aria-label="Side navigation"
          className={`fixed top-0 bottom-0 left-0 z-40 flex md:w-28 lg:w-36 xl:w-72 flex-col border-r border-r-slate-200 bg-white transition-transform lg:translate-x-0 ${
            isSideNavOpen ? "translate-x-0" : " -translate-x-full"
          }`}
        >
          <div className="flex flex-col items-center gap-4 border-b border-slate-200 py-6">
            <div className="shrink-0">
              <img
                src={user?.photoURL}
                alt="user image"
                title="user user-image"
                className="rounded-full w-12 h-12"
              />
            </div>
            <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0 text-center">
              <h4 className="w-full truncate text-base text-slate-700">
                {user?.displayName}
              </h4>
            </div>
          </div>
          <nav
            aria-label="side navigation"
            className="flex-1 divide-y divide-slate-100 overflow-auto"
          >
            <div>
              <ul className="flex flex-1 flex-col gap-1 py-3">
                <li className="flex items-center gap-3 mx-auto rounded p-3 text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-500 focus:bg-sky-50 aria-[current=page]:bg-sky-50 aria-[current=page]:text-sky-500">
                  <NavLink
                    to="/dashboard"
                    className={({ isActive, isPending }) =>
                      isActive ? "font-bold text-sky-500" : isPending ? "font-lg" : ""
                    }
                  >
                    <div className="flex w-full flex-1 flex-col items-center justify-center gap-0 overflow-hidden truncate ">
                      Dashboard
                    </div>
                  </NavLink>
                </li>
                <li className="flex items-center gap-3 mx-auto rounded p-3 text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-500 focus:bg-sky-50 aria-[current=page]:bg-sky-50 aria-[current=page]:text-sky-500">
                  <NavLink
                    to="/dashboard/addTask"
                    className={({ isActive, isPending }) =>
                      isActive ? "font-bold text-sky-500" : isPending ? "font-lg" : ""
                    }
                  >
                    <div className="flex w-full flex-1 flex-col items-center justify-center gap-0 overflow-hidden truncate ">
                      Add Task
                    </div>
                  </NavLink>
                </li>
                <li className="flex items-center gap-3 mx-auto rounded p-3 text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-500 focus:bg-sky-50 aria-[current=page]:bg-sky-50 aria-[current=page]:text-sky-500">
                  <NavLink
                    to="/dashboard/editTask"
                    className={({ isActive, isPending }) =>
                      isActive ? "font-bold text-sky-500" : isPending ? "font-lg" : ""
                    }
                  >
                    <div className="flex w-full flex-1 flex-col items-center justify-center gap-0 overflow-hidden truncate ">
                      Edit Tasks
                    </div>
                  </NavLink>
                </li>
                <li className="flex items-center gap-3 mx-auto rounded p-3 text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-500 focus:bg-sky-50 aria-[current=page]:bg-sky-50 aria-[current=page]:text-sky-500">
                  <NavLink
                    to="/dashboard/deleteTask"
                    className={({ isActive, isPending }) =>
                      isActive ? "font-bold text-sky-500" : isPending ? "font-lg" : ""
                    }
                  >
                    {/* <div className="flex w-full flex-1 flex-col items-center justify-center gap-0 overflow-hidden truncate ">
                      Delete Task
                    </div> */}
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>

          <footer className="border-t border-slate-200 p-3">
            <button
              className="flex items-center justify-center gap-3 rounded p-3 text-slate-900 transition-colors hover:text-sky-500 mx-auto"
              onClick={handleLogOut}
            >
              <div className="flex items-center self-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                  aria-label="Dashboard icon"
                  role="graphics-symbol"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex w-full flex-1 flex-col items-center justify-center gap-0 overflow-hidden truncate text-sm font-medium">
                Logout
              </div>
            </button>
          </footer>
        </aside>

        {/*  <!-- Backdrop --> */}
        <div
          className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${
            isSideNavOpen ? "block" : "hidden"
          }`}
          onClick={() => setIsSideNavOpen(false)}
        ></div>
      </div>
      <div className="md:ml-24 mr-5 mt-5 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
