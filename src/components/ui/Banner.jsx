import { NavLink } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className={`h-96 text-white text-center grid bg-cover`}
      style={{
        backgroundImage: "url('/banner.jpg')",
      }}
    >
      <div className="col-start-1 row-start-1 bg-gray-800 bg-opacity-70 w-full h-full"></div>
      <div className="col-start-1 row-start-1 mx-auto my-auto">
        <h1 className="font-bold text-2xl ">Manage Your Daily Task Easily</h1>
        <p className="mb-5">Priority based task management system</p>
        <NavLink to="/login">
          <button className="inline-flex items-center justify-center h-10 gap-2 px-2 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-sky-500 hover:bg-sky-600 focus:bg-sky-700 disabled:cursor-not-allowed disabled:border-sky-300 disabled:bg-sky-300 disabled:shadow-none">
            <span>Let&apos;s Explore</span>
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Banner;
