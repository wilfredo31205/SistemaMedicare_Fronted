import React, { useEffect, useReducer, useState } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

import {
  REGISTRO_EXITOSO,
  OCULTAR_ALERTA,
  REGISTRO_ERROR,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  USUARIO_AUTENTICADO,
  CERRAR_SESION,
} from "../../types";
import { useNavigate } from "react-router-dom";

// Acciones que disparan lo que tenemos en el reducer
const emptyObject = {};
const AuthState = ({ children }) => {
  const initialState = {
    token:
      typeof window !== "undefined" ? localStorage.getItem("Code_Secret") : "", //
    autenticado: null,
    usuario: null,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //console.log(Auth);

  const [cargando, setCargando] = useState(true);

  const [auth, setAuth] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Code_Secret");

    //console.log(token);<
  }, []);

  const RegistrarUsuario = async (datos) => {
    //
    try {
      const respuesta = await clienteAxios.post("/user", datos);

      console.log(respuesta);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data.msg,
      });
    } catch (error) {
      dispatch({
        type: REGISTRO_ERROR,
        payload: error.response.data.msg,
      });
    }

    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 2000);
  };

  const IniciarSesión = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("user/login", datos);

      //console.log(respuesta);

      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data.token,
      });
    } catch (error) {
      setAuth({});

      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg,
      });
    }

    setCargando(false);

    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 2000);
  };

  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("Code_Secret"); // Obteniendo el token

    if (token) {
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios.get("user/verificarToken");

      setAuth(respuesta.data.usuario);

      dispatch({
        type: USUARIO_AUTENTICADO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      setAuth({});

      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  const cerrarSesion = () => {
    console.log("Cerrando seccion wey");

    if (cerrarSesion) {
      navigate("/");
    }

    dispatch({
      type: CERRAR_SESION,
    });
  };

  return (
    <authContext.Provider // Provider  de donde salen los datos
      value={{
        mensaje: state.mensaje,
        autenticado: state.autenticado,
        token: state.token,
        usuario: state.usuario,

        cargando,
        auth,
        setAuth,
        IniciarSesión,
        RegistrarUsuario,
        usuarioAutenticado,

        cerrarSesion,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
