// Funcionalidades que van a modificar el state

import {
  CREAR_MEDICAMENTO,
  OBTENER_MEDICAMENTO,
  ELIMINAR_MEDICAMENTO,
  ACTUALIZAR_MEDICAMENTO,
  SELECCIONAR_MEDICAMENTO,
  RESET_MEDICAMENTO,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    //   // case REGISTRO_EXITOSO:
    case CREAR_MEDICAMENTO:
      return {
        ...state,
        resultadoMedicamento: [...state.resultadoMedicamento, action.payload],
      };

    case OBTENER_MEDICAMENTO:
      return {
        ...state,
        resultadoMedicamento: action.payload,
      };

    case ACTUALIZAR_MEDICAMENTO:
      return {
        ...state,
        // resultadoMedicamento: action.payload.map((med) =>
        //   med.id === action.payload.id ? action.payload : med
        //  ),
      };
    case SELECCIONAR_MEDICAMENTO:
      return {
        ...state,
        seleccionado: action.payload,
      };
    case RESET_MEDICAMENTO:
      return {
        ...state,
        seleccionado: null,
      };

    case ELIMINAR_MEDICAMENTO:
      return {
        ...state,
        resultadoMedicamento: state.resultadoMedicamento.filter(
          (med) => med.id !== action.payload
        ),
      };

    default:
      return state;
  }
};
