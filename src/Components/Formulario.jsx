import React, { useContext, useEffect } from "react";

import { Formik } from "formik";
import { useFormik } from "formik";
import appContext from "../context/App/appContext";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Formulario = () => {
  const AppContext = useContext(appContext);

  const { agregarMedicamento, actualizarMedicamento, seleccionado, resetear } =
    AppContext;

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Nombre: seleccionado?.Nombre || "",
      Precio: seleccionado?.Precio || "",
      Cantidad: seleccionado?.Cantidad || "",
      Descuento: seleccionado?.Descuento || "",
      Itbis: seleccionado?.Itbis || "",
    },

    validationSchema: Yup.object({
      // Objeto de validacion con YUP

      Nombre: Yup.string().required("Medicamento obligatorio"),
      Precio: Yup.number()
        .positive("Valores negativos no aceptados")
        .required("Precio no puede estar vacio"),

      Cantidad: Yup.number()
        .integer()
        .positive("Valores negativos no aceptados")
        .required("El producto no puede estar sin cantidad"),

      Descuento: Yup.number().required("Descuento obligatorio"),
      Itbis: Yup.number().required("Itbis obligatorio"),
    }),

    onSubmit: (values) => {
      if (seleccionado) {
        values.id = seleccionado.id;
        actualizarMedicamento(values);
      } else {
        agregarMedicamento(values);
      }

      navigate("/medicamentos");

      Swal.fire(
        seleccionado
          ? "Medicamento Actualizado Correctamente"
          : "Medicamento Agregado Correctamente",
        "Exito",
        "success"
      );
    },
  });

  return (
    <div className=" md:container mx-auto ">
      <form
        className=" md:grid md:grid-cols-2 gap-3 md:gap-9 lg:gap-1 bg-blue-300 p-14 rounded-3xl "
        onSubmit={formik.handleSubmit}
      >
        <div className="mx-auto">
          <label htmlFor="" className=" text-gray-600">
            Nombre
          </label>

          <input
            type="text"
            className="lg:w-64 md:w-33 container block py-2 px-3 mt-2 rounded-md outline-none"
            name="Nombre"
            placeholder="Ej: vitamina c"
            value={formik.values.Nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.Nombre && formik.errors.Nombre ? (
            <div className="  font-medium text-sm my-0 text-red-500  border-red-400 p-2">
              <p className="font-bold">.</p>
              <p>{formik.errors.Nombre} </p>
            </div>
          ) : null}
        </div>
        {/*Finaliza input*/}

        <div className=" mx-auto">
          <label htmlFor="" className=" text-gray-600">
            Precio
          </label>

          <input
            type="number"
            className="lg:w-64 md:w-33 container block py-2 px-3 mt-2 rounded-md outline-none"
            name="Precio"
            value={Number(formik.values.Precio)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.Precio && formik.errors.Precio ? (
            <div className="  font-medium text-sm my-0 text-red-500  border-red-400 p-2">
              <p className="font-bold">.</p>
              <p>{formik.errors.Precio} </p>
            </div>
          ) : null}
        </div>
        {/*Finaliza input*/}

        <div className=" mx-auto">
          <label htmlFor="" className=" text-gray-600">
            Cantidad
          </label>

          <input
            type="number"
            className="lg:w-64 md:w-33 container block py-2 px-3 mt-2 rounded-md outline-none"
            name="Cantidad"
            value={Number(formik.values.Cantidad)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.Cantidad && formik.errors.Cantidad ? (
            <div className="  font-medium text-sm my-0 text-red-500  border-red-400 p-2">
              <p className="font-bold">.</p>
              <p>{formik.errors.Cantidad} </p>
            </div>
          ) : null}
        </div>
        {/*Finaliza input*/}

        <div className=" mx-auto">
          <label htmlFor="" className=" text-gray-600">
            Descuento
          </label>

          <input
            type="number"
            className="lg:w-64 md:w-33 container block py-2 px-3 mt-2 rounded-md outline-none"
            name="Descuento"
            value={Number(formik.values.Descuento)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.Descuento && formik.errors.Descuento ? (
            <div className="  font-medium text-sm my-0 text-red-500  border-red-400 p-2">
              <p className="font-bold">.</p>
              <p>{formik.errors.Descuento} </p>
            </div>
          ) : null}
        </div>
        {/*Finaliza input*/}

        <div className=" mx-auto">
          <label htmlFor="" className=" text-gray-600">
            Itbis
          </label>

          <input
            type="number"
            className="lg:w-64 md:w-33 container block py-2 px-3 mt-2 rounded-md outline-none"
            name="Itbis"
            value={Number(formik.values.Itbis)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.Itbis && formik.errors.Itbis ? (
            <div className="font-medium text-sm my-0 text-red-500  border-red-400 p-2">
              <p className="font-bold">.</p>
              <p>{formik.errors.Itbis} </p>
            </div>
          ) : null}
        </div>

        <input
          type="submit"
          value={seleccionado ? "Actualizar" : "Agregar"}
          className="mt-5 w-full lg:w-1/2 lg:ml-32 p-3 bg-gradient-to-br from-slate-900 to- bg-neutral-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-slate-200 dark:focus:ring-green-800  text-white uppercase font-bold text-lg
             md:relative bottom-9 lg:top-[-4px] rounded-[20px] hover:bg-cyan-800 cursor-pointer
          
          "
        />

        {seleccionado && (
          <button
            type="button"
            className="mt-5 w-full lg:w-1/2 lg:ml-32 p-3 bg-gradient-to-br from-red-900 to- bg-red-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-slate-200 dark:focus:ring-green-800  text-white uppercase font-bold text-lg
             md:relative bottom-9 lg:top-[-4px] rounded-[20px] hover:bg-red-800 cursor-pointer"
            onClick={() => resetear()}
          >
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
};

export default Formulario;
