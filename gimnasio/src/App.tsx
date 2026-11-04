import {
  Navigate,
  Route,
  Routes
} from 'react-router-dom';
import { lazy } from 'react';

import { Layout } from './componentes/Layout';
import { NoEncontrado } from './componentes/NoEncontrado';
import { RutaProtegida } from './rutas/RutaProtegida';

const PaginaClases = lazy(() =>
  import('./paginas/PaginaClases').then((m) => ({
    default: m.PaginaClases
  }))
);

const PaginaClase = lazy(() =>
  import('./paginas/PaginaClase').then((m) => ({
    default: m.PaginaClase
  }))
);

const PaginaEntrar = lazy(() =>
  import('./paginas/PaginaEntrar').then((m) => ({
    default: m.PaginaEntrar
  }))
);

const PaginaRegistro = lazy(() =>
  import('./paginas/PaginaRegistro')
);

const PaginaMisInscripciones = lazy(() =>
  import('./paginas/PaginaMisInscripciones').then((m) => ({
    default: m.PaginaMisInscripciones
  }))
);

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