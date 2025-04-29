import axios from 'axios';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RadioMetaData {
  station: {
    public_player_url: string;
    name: string;
  };
}

export const useRadioNowPlaying = (id: number) => {
  const [station, setStation] = useState<{
    public_player_url: string;
    name: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchRadioStation = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get<RadioMetaData>(
          `https://stream.emisorasmusicales.net/api/nowplaying/${id}`,
          {signal: controller.signal},
        );
        const currentStation = res.data.station;

        // Solo actualizar si la URL o nombre cambian
        if (
          station?.public_player_url !== currentStation.public_player_url ||
          station?.name !== currentStation.name
        ) {
          setStation(currentStation);
          await AsyncStorage.setItem(
            `station_${id}`,
            JSON.stringify(currentStation),
          );
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError('Error al obtener la señal de Radio');
          console.error(err);
          const storedStation = await AsyncStorage.getItem(`station_${id}`);
          if (storedStation) {
            setStation(JSON.parse(storedStation));
          }
        }
      } finally {
        setLoading(false);
      }
    };

    const loadStoredStation = async () => {
      const storedStation = await AsyncStorage.getItem(`station_${id}`);
      if (storedStation) {
        setStation(JSON.parse(storedStation));
        setLoading(false);
        fetchRadioStation(); // Actualizar en segundo plano
      } else {
        fetchRadioStation();
      }
    };

    loadStoredStation();

    return () => {
      controller.abort();
    };
  }, [id]);

  return {station, loading, error};
};
