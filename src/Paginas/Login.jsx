import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Imagen from "../assets/img/Img_Medicamentos4.avif";
import authContext from "../context/Autenticacion/authContext";
import Alerta from "../Components/Alerta";

const Login = () => {
  const AuthContext = useContext(authContext);
  const { mensaje, IniciarSesión, autenticado, cargando, token } = AuthContext;

  const navigate = useNavigate();

  useEffect(() => {
    if (autenticado) {
      navigate("/medicamentos");
    }
  }, [autenticado]);

  // Validacion de formik

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      // Objeto de validacion con YUP

      email: Yup.string()
        .email("El email no es válido")
        .required("El Email es Obligatorio"),
      password: Yup.string()
        .required("El password no puede ir vacio")
        .min(6, "El password debe contener al menos 6 caracteres"),
    }),

    onSubmit: (valores) => {
      IniciarSesión(valores);
    },
  });

  return (
    <div className="  md:container md:grid md:grid-cols-2 md: grid  md:gap-7 lg:gap-2  md:justify-around">
      {/* contenedor padre */}

      <div className=" hidden md:flex w-full lg:w-full">
        {" "}
        {/*Imagen de login */}
        <img
          className=" md:object-cover lg:object-cover md:h-screen md:w-11/12"
          src={Imagen}
        />
      </div>

      <div className=" mt-40 mx-auto md:mx-auto lg:mx-auto">
        <div className=" ">
          {" "}
          {/*Contenedor */}
          <h2 className=" text-sky-600 text-center font-black text-3xl md:text-4xl capitalize">
            Iniciar sesión
          </h2>
          {mensaje && <Alerta />}
          <form className=" mt-6" onSubmit={formik.handleSubmit}>
            <div className="campo">
              <label className=" font-medium text-sm" htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                className=" rounded-lg bg-gray-200 md:hover:bg-white  p-4 md:py-5 h-6  mt-1 w-full md:w-96 lg:w-96 block"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.email && formik.errors.email ? (
                <div className="  font-medium text-sm my-0 text-red-500  border-red-400 p-2">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.email} </p>
                </div>
              ) : null}
            </div>

            <div className="campo mt-3">
              <label className="font-medium text-sm" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className=" rounded-lg bg-gray-200 md:hover:bg-white  p-4 md:py-5 h-6  mt-1 w-full md:w-96 lg:w-96 block"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.password && formik.errors.password ? (
                <div className=" font-medium text-sm my-0 text-red-500  border-red-400 p-2">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.password} </p>
                </div>
              ) : null}
            </div>

            <input
              type="submit"
              value="Iniciar Sesión"
              className=" mt-6 bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />

            <Link
              className=" block text-center my-5 text-blue-700 hover:text-blue-900 uppercase text-sm"
              to="/crear-cuenta"
            >
              ¿No tienes una cuenta? Regístrate
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
