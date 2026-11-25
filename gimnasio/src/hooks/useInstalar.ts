import { useEffect, useState } from 'react';

interface EventoInstalacion extends Event {
  prompt(): Promise<void>;

  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
}

export function useInstalar() {
  const [evento, setEvento] =
    useState<EventoInstalacion | null>(null);

  useEffect(() => {
    const manejarEvento = (e: Event) => {
      e.preventDefault();
      setEvento(e as EventoInstalacion);
    };

    const instalada = () => {
      setEvento(null);
    };

    window.addEventListener(
      'beforeinstallprompt',
      manejarEvento
    );

    window.addEventListener(
      'appinstalled',
      instalada
    );

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        manejarEvento
      );

      window.removeEventListener(
        'appinstalled',
        instalada
      );
    };
  }, []);

  async function instalar() {
    if (!evento) return;

    await evento.prompt();
    await evento.userChoice;

    setEvento(null);
  }

  return {
    puedeInstalar: evento !== null,
    instalar
  };
}