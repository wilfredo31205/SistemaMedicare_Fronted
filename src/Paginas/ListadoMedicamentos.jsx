import React, { useContext, useEffect, useState, useRef } from "react";
import appContext from "../context/App/appContext";
import { calculoPorcierto } from "../helper/CalculoPorcierto";
import { Button } from "primereact/button";
import { validateYupSchema } from "formik";
import Swal from "sweetalert2";

const Proyectos = () => {
  const AppContext = useContext(appContext);
  const {
    obtenerMedicamento,
    Medicamento,
    resultadoMedicamento,
    actualizarMedicamento,
    MedDelete,
    seleccionarActualizar,
  } = AppContext;

  const [Busqueda, setBusqueda] = useState("");

  const medicamentosFiltrados = Busqueda
    ? resultadoMedicamento.filter((medi) =>
        medi.Nombre.toLowerCase().includes(Busqueda.toLocaleLowerCase())
      )
    : resultadoMedicamento;

  const handleRef = (event) => {
    setBusqueda(event.target.value);
  };
  /// FUNCION QUE ELIMINA PRODUCTOS

  const ProductosDelete = async (_id) => {
    Swal.fire({
      title: "Estas seguro de eliminar este producto?",
      text: "Un producto eliminado no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, quiero eliminar este producto",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "Tu producto ha sido eliminado.", "success");
        MedDelete(_id);
      }
    });
  };

  useEffect(() => {
    obtenerMedicamento();
  }, []);

  useEffect(() => {
    if (resultadoMedicamento.length > 0) {
    }
  }, [resultadoMedicamento]);

  const [subTotales, setSubTotales] = useState([]);
  const [resumenPedido, setResumenPedido] = useState({
    descuento: 0,
    precioFinal: 0,
  });

  const fnResultado = (ev, _nombre, _precio, _cantidad, _descuento) => {
    let oPushData = [...subTotales];
    if (ev.target.checked === true) {
      // creamos un objeto para agregar los valores en un array
      let oData = {
        nombre: _nombre,

        precio: _precio,
        cantidad: _cantidad,
        descuento: _descuento,
      };
      oPushData.push(oData);
      setSubTotales(oPushData);
      let sumaDescuento = 0;
      let sumaTotal = 0;

      oPushData.forEach((item) => {
        // Calculo descuento por producto
        let descuento = item.precio * (item.descuento / 100);
        let totalDescuento = descuento * item.cantidad;
        sumaDescuento = sumaDescuento + totalDescuento;

        sumaTotal = sumaTotal + item.precio * item.cantidad;
        //Reza´CF
      });
      let oDataResumenPedido = {
        ...resumenPedido,
        descuento: sumaDescuento,
        precioFinal: sumaTotal - sumaDescuento,
      };

      setResumenPedido(oDataResumenPedido);
    } else {
      let descuento = _precio * _cantidad * (_descuento / 100);
      let restaDescuento = resumenPedido.descuento - descuento;
      let restaPrecio =
        resumenPedido.precioFinal - (_precio * _cantidad - descuento);

      let oData = {
        ...resumenPedido,
        descuento: restaDescuento,
        precioFinal: restaPrecio,
      };

      setResumenPedido(oData);

      let pos = subTotales.findIndex((filter) => filter.nombre === _nombre);

      oPushData.splice(pos, 1);
      setSubTotales(oPushData);
    }
  };

  return (
    <>
      <p className=" text-red-400 mt-6">Click en el check para calcular</p>
      <div className=" overflow-scroll md:overflow-hidden relative shadow-md sm:rounded-lg">
        <div className="pb-4 bg-white dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">
            Buscar
          </label>

          <div className="relative mt-1">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              name="Busqueda"
              className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
              value={Busqueda}
              onChange={handleRef}
            />
          </div>
        </div>

        <table className="w-full mt-4 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    name="check"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="py-3 px-6 w-1/4 ">
                Codigo
              </th>
              <th scope="col" className="py-3 px-6">
                Nombre_Medicamento
              </th>
              <th scope="col" className="py-3 px-6">
                Cantidad
              </th>
              <th scope="col" className="py-3 px-6">
                Precio
              </th>
              <th scope="col" className="py-3 px-6">
                Descuento
              </th>

              <th scope="col" className="py-3 px-6">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="">
            {medicamentosFiltrados.map((medicamento) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={medicamento.codigo}
                >
                  <td className="p-4 w-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(ev) =>
                          fnResultado(
                            ev,
                            medicamento.Nombre,
                            // medicamento.id,
                            medicamento.Precio,
                            medicamento.Cantidad,
                            medicamento.Descuento
                          )
                        }
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {medicamento.id}
                  </td>

                  <td className="py-4 px-6">{medicamento.Nombre}</td>
                  <td className="py-4 px-6">{medicamento.Cantidad}</td>
                  <td className="py-4 px-6">{medicamento.Precio}</td>

                  <td className="py-4 px-6">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {medicamento.Descuento}
                    </a>
                  </td>

                  <td className="py-4 px-6">
                    {" "}
                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      //  onClick={() => actualizarMedicamento(medicamento.id)}
                      onClick={() => seleccionarActualizar(medicamento)}
                    >
                      Editar
                    </button>
                  </td>

                  <td className="py-4 px-6">
                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      onClick={() => ProductosDelete(medicamento.id)}

                      //onClick={() => MedDelete}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-5">
        <div className="p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Resumen de Venta
            </h5>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {subTotales.map((item) => (
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-md font-medium text-gray-900 truncate dark:text-white">
                        {item.nombre}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400"></p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {item.precio * item.cantidad}
                    </div>
                  </div>
                </li>
              ))}

              <div className=" flex justify-between mt-2">
                <p className=" font-semibold bg-green-400">Descuento</p>

                <li>{resumenPedido.descuento}</li>
              </div>

              <div className=" flex justify-between mt-4">
                <p className=" font-semibold bg-green-400">Total</p>

                <li>{resumenPedido.precioFinal}</li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Proyectos;
