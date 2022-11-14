import { useContext, useEffect } from "react";
import { FcNext } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

import authContext from "../context/Autenticacion/authContext";
import Sidebar from "./Sidebar";

const Header = () => {
  // Extraer el Usuario autenticado del Storage
  const AuthContext = useContext(authContext);
  const {
    autenticado,
    token,
    usuarioAutenticado,
    usuario,
    cerrarSesion,
    Auth,
  } = AuthContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  useEffect(() => {
    usuario;
  }, [usuario]);

  return (
    <header className="border-r-0 z-30 border-stone-600 w-full md:left-0 md:fixed bg-slate-700 px-4 py-3 border-b">
      <div className="md:flex md:justify-between  md:items-center lg:items-center">
        <h2 className="text-4xl text-white font-black text-center mb-5 md:mb-0">
          Medicare
        </h2>

        {usuario ? (
          <>
            <p className="text-center text-white font-bold">
              Hola {usuario.nombre}
            </p>

            <button
              style={{ padding: ".5rem" }}
              type="button"
              // className="bg-black rounded-lg text-white font-bold uppercase"

              className="bg-red w-full md:w-64 rounded-lg text-white font-bold uppercase"
              onClick={() => cerrarSesion()}
            >
              Cerrar Sesión
            </button>
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
