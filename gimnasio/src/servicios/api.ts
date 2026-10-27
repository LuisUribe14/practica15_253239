// servicios/api.ts — RECURSO: se copia del código base (es el de la Práctica 14).
// UNA instancia de Axios para toda la app. Nadie más importa axios.
import axios from 'axios';

// Donde corre gimnasio-backend. VITE_API_URL sólo se usa al desplegar.
export const URL_API =
  import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const api = axios.create({
  baseURL: URL_API,
  timeout: 5000,
});

// Interceptor de petición: manda el token si hay sesión.
api.interceptors.request.use((config) => {
  const guardada =
    localStorage.getItem('gimnasio_sesion');

  if (guardada) {
    try {
      const sesion = JSON.parse(guardada);

      config.headers.Authorization =
        `Bearer ${sesion.token}`;
    } catch {
      // Si la sesión guardada está dañada,
      // se manda la petición sin token.
    }
  }

  return config;
});

// Interceptor de respuesta:
// si la API responde 401, elimina la sesión.
api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    if (
      error.response?.status === 401 &&
      error.config?.url !== '/auth/login'
    ) {
      localStorage.removeItem('gimnasio_sesion');

      window.dispatchEvent(
        new Event('sesion-expirada')
      );
    }

    return Promise.reject(error);
  }
);

// El sobre de la API: toda respuesta exitosa llega como { data, meta }.
export interface Sobre<T> {
  data: T;
}

// Las imágenes las sirve la API.
export function urlImagen(ruta: string): string {
  return `${URL_API}${ruta}`;
}

// Mensaje que se muestra cuando algo falla.
export function mensajeDeError(
  e: unknown,
  generico: string
): string {
  if (axios.isAxiosError(e)) {
    if (
      e.response?.status === 401 &&
      e.config?.url !== '/auth/login'
    ) {
      return 'Tu sesión terminó. Vuelve a entrar.';
    }

    const mensaje = e.response?.data?.message;

    if (Array.isArray(mensaje)) {
      return mensaje.join('. ');
    }

    if (typeof mensaje === 'string') {
      return mensaje;
    }
  }

  return generico;
}