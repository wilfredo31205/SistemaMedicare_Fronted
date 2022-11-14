import React from "react";
import Formulario from "../Components/Formulario";

const CrearMedicamento = () => {
  return (
    <div>
      <h1 className=" text-left text-lg text-slate-600 font-medium">
        Entrada medicamentos{" "}
      </h1>

      <div className=" mt-9">
        <Formulario />
      </div>
    </div>
  );
};

export default CrearMedicamento;
