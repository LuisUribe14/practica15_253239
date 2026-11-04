import { Link } from 'react-router-dom';

import { Cargando } from '../componentes/Cargando';
import { MensajeError } from '../componentes/MensajeError';
import { urlImagen } from '../servicios/api';
import { useInscripcionesStore } from '../store/inscripciones';

export function PaginaMisInscripciones() {
  const inscripciones =
    useInscripcionesStore(
      (estado) => estado.inscripciones
    );

  const cargando =
    useInscripcionesStore(
      (estado) => estado.cargando
    );

  const error =
    useInscripcionesStore(
      (estado) => estado.error
    );

  const cargar =
    useInscripcionesStore(
      (estado) => estado.cargar
    );

  if (cargando) {
    return <Cargando />;
  }

  if (error) {
    return (
      <MensajeError
        mensaje={error}
        onReintentar={cargar}
      />
    );
  }

  return (
    <>
      <section className="pagina__encabezado">
        <h1>Mis inscripciones</h1>

        <p className="pagina__bajada">
          {inscripciones.length === 0
            ? 'Todavía no tienes clases inscritas.'
            : `${inscripciones.length} clase(s) esta semana.`}
        </p>
      </section>

      <ul className="inscripciones">
        {inscripciones.map((i) => (
          <li
            className="inscripcion"
            key={i.id}
          >
            <img
              className="inscripcion__imagen"
              src={urlImagen(i.clase.imagen)}
              alt={i.clase.nombre}
              loading="lazy"
            />

            <div>
              <Link
                to={`/clases/${i.clase.id}`}
                className="inscripcion__clase"
              >
                {i.clase.nombre}
              </Link>

              <div className="inscripcion__meta">
                {i.horario.dia} ·{' '}
                {i.horario.horaInicio} ·{' '}
                {i.horario.entrenador}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}