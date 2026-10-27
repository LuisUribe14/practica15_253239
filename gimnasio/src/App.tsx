import {
  Navigate,
  Route,
  Routes
} from 'react-router-dom';

import { Layout } from './componentes/Layout';
import { NoEncontrado } from './componentes/NoEncontrado';
import { PaginaClases } from './paginas/PaginaClases';
import { PaginaClase } from './paginas/PaginaClase';
import { PaginaEntrar } from './paginas/PaginaEntrar';
import PaginaRegistro from './paginas/PaginaRegistro';
import { PaginaMisInscripciones } from './paginas/PaginaMisInscripciones';
import { RutaProtegida } from './rutas/RutaProtegida';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <Navigate
              to="/clases"
              replace
            />
          }
        />

        <Route
          path="/clases"
          element={<PaginaClases />}
        />

        <Route
          path="/clases/:id"
          element={<PaginaClase />}
        />

        <Route
          path="/entrar"
          element={<PaginaEntrar />}
        />

        <Route
          path="/registro"
          element={<PaginaRegistro />}
        />

        <Route
          path="*"
          element={<NoEncontrado />}
        />

        <Route element={<RutaProtegida />}>
          <Route
            path="/mis-inscripciones"
            element={<PaginaMisInscripciones />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;