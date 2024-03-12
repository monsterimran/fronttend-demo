import useAxios from "../../hooks/useAxios";
import { useState, useEffect } from "react";

const Trusted = () => {
  const axios = useAxios();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("/users").then((res) => {
      setData(res?.data);
    });
  }, [axios]);

  // console.log(data);
  const roles = new Set(data?.roles);
  const profs = [...roles];
  // console.log(profs);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3">
      <h1 className="text-lg lg:text-3xl font-semibold text-center">
        Trusted by {data?.count}+ users worldwide.
      </h1>
      <h2 className="font-light text-sm text-center lg:text-lg">
        Found Useful by{" "}
        {profs?.map((prof, inx) => (
          <span key={inx} className="font-medium">
            {prof},{" "}
          </span>
        ))}
        <span className="font-medium">student{" "}</span>
        etc to organize their life and keep their sanity.
      </h2>
      <img src="/people.jpg" alt="people" className="max-w-3xl h-full w-full md:h-96"/>
    </div>
  );
};

export default Trusted;
