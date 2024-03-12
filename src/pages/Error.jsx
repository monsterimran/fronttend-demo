import { NavLink } from 'react-router-dom'

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <h2 className="text-4xl font-bold">This page does not exits</h2>
      <h3 className="text-lg font-light text-gray-400">
        The page your looking for could not be found
      </h3>
      <NavLink to="/">
      <button className="inline-flex items-center justify-center h-12 gap-2 px-6 text-lg font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-sky-500 hover:bg-sky-600 focus:bg-sky-700 disabled:cursor-not-allowed disabled:border-sky-300 disabled:bg-sky-300 disabled:shadow-none">
        <span>Go Back</span>
      </button>
      </NavLink>
    </div>
  );
};

export default Error;
