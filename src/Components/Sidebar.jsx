import { Link, useLocation } from "react-router-dom";

import { FcBiomass, FcPlus } from "react-icons/fc";
import { useEffect } from "react";

const Sidebar = () => {
  const location = useLocation();

  const urlActual = location.pathname;

  return (
    <aside className=" min-h-full  bg-slate-600 md:w-56 lg:w-1/5 xl:w-1/6 px-3 py-0">
      <nav className=" mt-[0px] md:mt-28 text-center">
        <Link
          to="crear-medicamento"
          className=" ease-in duration-300 text-white text-2xl mt-0 hover:text-blue-300"
        >
          Agregar Medicamento
        </Link>

        <FcPlus
          size="1.8rem"
          className=" relative bottom-7 left-5 md:bottom-14 md:left-3"
        />

        <Link
          to="/"
          className="ease-in duration-300 text-white text-center mt-0 text-2xl ml-7 hover:text-blue-300"
        >
          Medicamentos
        </Link>

        <FcBiomass
          size="1.8rem"
          className="relative bottom-7 left-6 md:left-0 md:right-1 md:bottom-8"
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
