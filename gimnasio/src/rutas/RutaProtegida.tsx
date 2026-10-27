import {
  Navigate,
  Outlet,
  useLocation
} from 'react-router-dom';

import { useSesion } from '../sesion/SesionContext';

export function RutaProtegida() {
  const { sesion } = useSesion();
  const location = useLocation();

  if (!sesion) {
    return (
      <Navigate
        to="/entrar"
        replace
        state={{ desde: location.pathname }}
      />
    );
  }

  return <Outlet />;
}