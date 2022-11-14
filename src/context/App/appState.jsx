import React, { useEffect, useReducer, useState } from "react";
import clienteAxios from "../../config/axios";
import appReducer from "./appReducer";
import {
  OBTENER_MEDICAMENTO,
  REGISTRO_EXITOSO,
  ELIMINAR_MEDICAMENTO,
  CREAR_MEDICAMENTO,
  ACTUALIZAR_MEDICAMENTO,
  SELECCIONAR_MEDICAMENTO,
  RESET_MEDICAMENTO,
} from "../../types";
import { useNavigate } from "react-router-dom";
import AppContext from "./appContext";
import axios from "axios";

const AppState = ({ children }) => {
  const navigate = useNavigate();

  const initialState = {
    //  Medicamento: [],
    resultadoMedicamento: [],
    seleccionado: null,
    Precio: 2,
    Cantidad: 0,
    Descuento: 0,
    Itbis: 0,
    mensaje: null,
    cargando: false,
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  const agregarMedicamento = async (medicaments) => {
    try {
      const agregarMedi = await clienteAxios.post("/Med", medicaments);
      console.log(agregarMedi.data.medicament);

      dispatch({
        type: CREAR_MEDICAMENTO,
        payload: agregarMedi.data.medicament,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerMedicamento = async () => {
    try {
      const resultado = await clienteAxios("/Med");
      dispatch({
        type: OBTENER_MEDICAMENTO,
        payload: resultado.data.medicaments,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarMedicamento = async (valores) => {
    try {
      const { id, ...body } = valores;

      const { data } = await clienteAxios.put(`Med/${id}`, body);
      console.log(data, "Editando productos");

      dispatch({
        type: ACTUALIZAR_MEDICAMENTO,
        payload: data.medicamentPut.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const seleccionarActualizar = (medicamento) => {
    navigate("/medicamentos/editar-medicamento");
    dispatch({
      type: SELECCIONAR_MEDICAMENTO,
      payload: medicamento,
    });
  };

  const MedDelete = async (id) => {
    await clienteAxios.delete(`Med/${id}`);

    console.log("Eliminando");

    dispatch({
      type: ELIMINAR_MEDICAMENTO,
      payload: id,
    });
  };

  // remueve producto seleccioando
  const resetear = () => {
    navigate("/medicamentos");
    dispatch({
      type: RESET_MEDICAMENTO,
    });
  };

  useEffect(() => {
    obtenerMedicamento();
  }, []);
  return (
    <AppContext.Provider
      value={{
        Medicamento: state.Medicamento,
        Precio: state.Precio,
        Cantidad: state.Cantidad,
        Descuento: state.Descuento,
        resultadoMedicamento: state.resultadoMedicamento,
        seleccionado: state.seleccionado,
        agregarMedicamento,
        obtenerMedicamento,
        actualizarMedicamento,
        MedDelete,
        seleccionarActualizar,
        resetear,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
