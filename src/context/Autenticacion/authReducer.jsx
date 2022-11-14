// Funcionalidades que van a modificar el state

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OCULTAR_ALERTA,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  USUARIO_AUTENTICADO,
  CERRAR_SESION,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTRO_EXITOSO:
      return {
        ...state,
        mensaje: action.payload,
      };

    case REGISTRO_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };

    case LOGIN_EXITOSO:
      localStorage.setItem("Code_Secret", action.payload); //colocando el token en el localstorage
      return {
        ...state,
        token: action.payload,
        autenticado: true,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };

    case OCULTAR_ALERTA:
      return {
        ...state,
        mensaje: null,
      };

    case USUARIO_AUTENTICADO:
      return {
        ...state,
        usuario: action.payload,
        autenticado: true,
      };

    case CERRAR_SESION:
      localStorage.removeItem("Code_Secret");
      return {
        ...state,
        usuario: null,
        token: null,
        autenticado: null,
      };

    default:
      return state;
  }
};
