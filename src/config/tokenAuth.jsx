import clienteAxios from "../config/axios";
const tokenAuth = (token) => {
  if (token) {
    // si hay un token , si se le está pasando un token en esta funcion

    clienteAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete clienteAxios.defaults.headers.common["Authorization"];
  }
};

export default tokenAuth;
