import { create } from 'zustand';

import type { Inscripcion } from '../tipos';
import { traerMisInscripciones } from '../servicios/gimnasio';

interface EstadoInscripciones {
  inscripciones: Inscripcion[];
  cargando: boolean;
  error: string | null;

  cargar: () => Promise<void>;
  vaciar: () => void;
}

export const useInscripcionesStore =
  create<EstadoInscripciones>((set) => ({
    inscripciones: [],
    cargando: false,
    error: null,

    async cargar() {
      try {
        set({
          cargando: true,
          error: null
        });

        const datos =
          await traerMisInscripciones();

        set({
          inscripciones: datos
        });
      } catch {
        set({
          error: 'No se pudieron cargar las inscripciones.'
        });
      } finally {
        set({
          cargando: false
        });
      }
    },

    vaciar() {
      set({
        inscripciones: [],
        cargando: false,
        error: null
      });
    }
  }));