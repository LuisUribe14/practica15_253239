import {
  createContext,
  useContext,
  useState,
  type ReactNode
} from 'react';

import type { Sesion } from '../tipos';
import {
  entrar as entrarApi,
  registrar as registrarApi
} from '../servicios/sesion';

interface SesionContexto {
  sesion: Sesion | null;
  entrar: (
    correo: string,
    password: string
  ) => Promise<void>;
  registrar: (
    nombre: string,
    correo: string,
    password: string
  ) => Promise<void>;
  salir: () => void;
}

const SesionContext =
  createContext<SesionContexto | null>(null);

const CLAVE_SESION = 'gimnasio_sesion';

export function SesionProvider({
  children
}: {
  children: ReactNode;
}) {
  const [sesion, setSesion] = useState<Sesion | null>(() => {
    const guardada = localStorage.getItem(CLAVE_SESION);

    if (!guardada) {
      return null;
    }

    try {
      return JSON.parse(guardada) as Sesion;
    } catch {
      return null;
    }
  });

  async function entrar(
    correo: string,
    password: string
  ) {
    const nuevaSesion =
      await entrarApi(correo, password);

    setSesion(nuevaSesion);

    localStorage.setItem(
      CLAVE_SESION,
      JSON.stringify(nuevaSesion)
    );
  }

  async function registrar(
    nombre: string,
    correo: string,
    password: string
  ) {
    const nuevaSesion =
      await registrarApi(
        nombre,
        correo,
        password
      );

    setSesion(nuevaSesion);

    localStorage.setItem(
      CLAVE_SESION,
      JSON.stringify(nuevaSesion)
    );
  }

  function salir() {
    setSesion(null);
    localStorage.removeItem(CLAVE_SESION);
  }

  return (
    <SesionContext.Provider
      value={{
        sesion,
        entrar,
        registrar,
        salir
      }}
    >
      {children}
    </SesionContext.Provider>
  );
}

export function useSesion() {
  const contexto = useContext(SesionContext);

  if (!contexto) {
    throw new Error(
      'useSesion debe usarse dentro de SesionProvider'
    );
  }

  return contexto;
}