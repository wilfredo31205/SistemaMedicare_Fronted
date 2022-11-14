import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import authContext from "../context/Autenticacion/authContext";

const RutaProtegida = () => {
  const AuthContext = useContext(authContext);
  const { usuarioAutenticado, auth, setAuth, cargando, usuario, token } =
    AuthContext;

  useEffect(() => {}, [token]);

  console.log(token);

  return (
    <>
      {token ? (
        <div className="bg-black-100">
          <Header />

          <div className="md:flex md:min-h-screen ">
            <Sidebar />

            <main className="p-10 px-10  flex-1 mt-24 ">
              {/*Si el usuario esta autenticado le mostramos las paginas que estan registrigidas con el outle */}

              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RutaProtegida;
