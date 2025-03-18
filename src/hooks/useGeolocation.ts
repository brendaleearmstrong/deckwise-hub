
import { useState, useEffect } from 'react';

interface Position {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  error: string | null;
  timestamp: number | null;
}

export function useGeolocation(options?: PositionOptions) {
  const [position, setPosition] = useState<Position>({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
    timestamp: null
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setPosition(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser'
      }));
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude, accuracy } = position.coords;
      setPosition({
        latitude,
        longitude,
        accuracy,
        error: null,
        timestamp: position.timestamp
      });
    };

    const handleError = (error: GeolocationPositionError) => {
      setPosition(prev => ({
        ...prev,
        error: error.message
      }));
    };

    const watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      options
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [options]);

  return position;
}
