import { useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';

import { Cargando } from '../componentes/Cargando';
import { MensajeError } from '../componentes/MensajeError';
import { useClase } from '../hooks/useClase';
import { URL_API, mensajeDeError } from '../servicios/api';
import { inscribirse } from '../servicios/gimnasio';
import { useSesion } from '../sesion/SesionContext';

export function PaginaClase() {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const { sesion } = useSesion();

  const [aviso, setAviso] = useState('');
  const [errorInscripcion, setErrorInscripcion] = useState('');
  const [enviando, setEnviando] = useState<number | null>(null);

  const claseId = Number(id);

  const {
    clase,
    cargando,
    error,
    reintentar
  } = useClase(claseId);

  async function manejarInscripcion(horarioId: number) {
    setAviso('');
    setErrorInscripcion('');

    // Si no hay sesión, mandamos al login.
    if (!sesion) {
      navigate('/entrar', {
        state: {
          desde: location.pathname
        }
      });

      return;
    }

    try {
      setEnviando(horarioId);

      await inscribirse(horarioId);

      setAviso('Inscripción realizada correctamente.');

      // Volvemos a pedir la clase para actualizar los lugares.
      reintentar();
    } catch (e) {
      setErrorInscripcion(
        mensajeDeError(
          e,
          'No se pudo realizar la inscripción.'
        )
      );
    } finally {
      setEnviando(null);
    }
  }

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

          {aviso && (
            <p className="aviso aviso--exito">
              {aviso}
            </p>
          )}

          {errorInscripcion && (
            <p className="aviso aviso--error">
              {errorInscripcion}
            </p>
          )}

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
                    disabled={enviando === h.id}
                    onClick={() =>
                      manejarInscripcion(h.id)
                    }
                  >
                    {enviando === h.id
                      ? 'Inscribiendo...'
                      : 'Inscribirme'}
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