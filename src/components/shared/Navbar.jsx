import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="sticky bg-slate-100">
      <nav className="w-full py-2 shadow-lg text-gray-600">
        <ul className="max-w-2xl mx-auto flex flex-col-reverse md:flex-row flex-wrap flex-1 justify-around items-center">
          <li className="hover:bg-slate-500 hover:text-white p-2 rounded-sm">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isActive ? "font-bold" : isPending ? "font-lg" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li className="hover:bg-slate-500 hover:text-white p-2 rounded-sm">
            <NavLink
              to="/register"
              className={({ isActive, isPending }) =>
                isActive ? "font-bold" : isPending ? "font-lg" : ""
              }
            >
              Registration
            </NavLink>
          </li>
          <li className="hover:bg-slate-500 hover:text-white p-2 rounded-sm">
            <NavLink
              to="/login"
              className={({ isActive, isPending }) =>
                isActive ? "font-bold" : isPending ? "font-lg" : ""
              }
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
