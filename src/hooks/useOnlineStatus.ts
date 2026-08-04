import { useEffect, useState } from 'react';
import { track } from '@/services/analytics';

/** Monitora conectividade. O totem continua funcional offline. */
export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState(() =>
    typeof navigator === 'undefined' ? true : navigator.onLine,
  );

  useEffect(() => {
    const update = (value: boolean) => {
      setOnline(value);
      track({ name: 'connectivity_change', online: value });
    };
    const handleOnline = () => update(true);
    const handleOffline = () => update(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return online;
}
