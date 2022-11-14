import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
// import "primereact/resources/primereact.min.css"; //core css
// import "primeicons/primeicons.css";
import AuthLayout from "./layout/AuthLayout";
import Login from "./Paginas/Login";
import CrearCuenta from "./Paginas/CrearCuenta";

import RutaProtegida from "./layout/RutaProtegida";
import ListadoMedicamentos from "./Paginas/ListadoMedicamentos";
import CrearMedicamento from "./Paginas/CrearMedicamento";
import AuthState from "./context/Autenticacion/authState";
import AppState from "./context/App/appState";
import EditarMedicamento from "./Paginas/EditarMedicamento";

function App() {
  return (
    <BrowserRouter>
      <AuthState>
        <AppState>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="crear-cuenta" element={<CrearCuenta />} />
            </Route>

            <Route path="/medicamentos" element={<RutaProtegida />}>
              <Route index element={<ListadoMedicamentos />} />
              <Route path="crear-medicamento" element={<CrearMedicamento />} />
              <Route
                path="editar-medicamento"
                element={<EditarMedicamento />}
              />
            </Route>
          </Routes>
        </AppState>
      </AuthState>
    </BrowserRouter>
  );
}

export default App;
