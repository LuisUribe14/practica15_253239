import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Encabezado } from './Encabezado';
import { PiePagina } from './PiePagina';
import { Cargando } from './Cargando';
import { useEnLinea } from '../hooks/useEnLinea';

export function Layout() {
  const enLinea = useEnLinea();

  return (
    <div className="disposicion">
      <Encabezado />

      {!enLinea && (
        <div className="aviso-sin-conexion" role="status">
          Sin conexión a internet. Estás en modo offline.
        </div>
      )}

      <main className="disposicion__contenido">
        <Suspense fallback={<Cargando />}>
          <Outlet />
        </Suspense>
      </main>

      <PiePagina />
    </div>
  );
}