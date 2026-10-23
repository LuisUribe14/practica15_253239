import { Link } from 'react-router-dom';

import { Cargando } from '../componentes/Cargando';
import { MensajeError } from '../componentes/MensajeError';
import { useClases } from '../hooks/useClases';
import { URL_API } from '../servicios/api';

export function PaginaClases() {
  const {
    clases,
    cargando,
    error,
    reintentar
  } = useClases();

  if (cargando) {
    return <Cargando />;
  }

  if (error) {
    return (
      <MensajeError
        mensaje={error}
        onReintentar={reintentar}
      />
    );
  }

  return (
    <>
      <section className="pagina__encabezado">
        <h1>Clases</h1>
        <p className="pagina__bajada">
          Elige una clase para ver sus horarios e inscribirte.
        </p>
      </section>

      <div className="rejilla">
        {clases.map((c) => (
          <Link
            key={c.id}
            to={`/clases/${c.id}`}
            className="tarjeta-clase"
          >
            <img
              className="tarjeta-clase__imagen"
              src={`${URL_API}${c.imagen}`}
              alt={c.nombre}
            />

            <div className="tarjeta-clase__cuerpo">
              <span
                className={`etiqueta etiqueta--${c.categoria}`}
              >
                {c.categoria}
              </span>

              <span className="tarjeta-clase__titulo">
                {c.nombre}
              </span>

              <span className="tarjeta-clase__meta">
                {c.duracionMin} min
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}