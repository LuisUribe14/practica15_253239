import {
  Link,
  useNavigate,
  useParams
} from 'react-router-dom';

import { Cargando } from '../componentes/Cargando';
import { MensajeError } from '../componentes/MensajeError';
import { useClase } from '../hooks/useClase';
import { URL_API } from '../servicios/api';

export function PaginaClase() {
  const { id } = useParams();
  const navigate = useNavigate();

  const claseId = Number(id);

  const {
    clase,
    cargando,
    error,
    reintentar
  } = useClase(claseId);

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

  if (!clase) {
    return null;
  }

  return (
    <>
      <Link
        to="/clases"
        className="detalle__volver"
      >
        ← Todas las clases
      </Link>

      <article className="detalle">
        <img
          className="detalle__imagen"
          src={`${URL_API}${clase.imagen}`}
          alt={clase.nombre}
        />

        <div className="detalle__datos">
          <span
            className={`etiqueta etiqueta--${clase.categoria}`}
          >
            {clase.categoria}
          </span>

          <h1>{clase.nombre}</h1>

          <p className="pagina__bajada">
            {clase.descripcion} · {clase.duracionMin} min
          </p>

          <h2>Horarios</h2>

          <ul className="horarios">
            {clase.horarios.map((h) => (
              <li
                className="horario"
                key={h.id}
              >
                <div>
                  <div className="horario__dia">
                    {h.dia} · {h.horaInicio}
                  </div>

                  <div className="horario__meta">
                    {h.entrenador} · {h.disponibles} de{' '}
                    {h.cupoMaximo} lugares
                  </div>
                </div>

                {h.disponibles === 0 ? (
                  <span className="horario__lleno">
                    Lleno
                  </span>
                ) : (
                  <button
                    className="boton boton--chico"
                    onClick={() => navigate('/entrar')}
                  >
                    Inscribirme
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </>
  );
}