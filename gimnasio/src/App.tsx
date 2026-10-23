import {
  Navigate,
  Route,
  Routes
} from 'react-router-dom';

import { Layout } from './componentes/Layout';
import { NoEncontrado } from './componentes/NoEncontrado';
import { PaginaClases } from './paginas/PaginaClases';
import { PaginaClase } from './paginas/PaginaClase';

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
          path="*"
          element={<NoEncontrado />}
        />
      </Route>
    </Routes>
  );
}

export default App;