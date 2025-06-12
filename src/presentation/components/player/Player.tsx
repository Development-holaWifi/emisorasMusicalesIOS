import React, {useEffect, useState} from 'react';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import TrackPlayer, {
  usePlaybackState,
  State,
  useIsPlaying,
} from 'react-native-track-player';

import Icon from '@react-native-vector-icons/ionicons';
import {usePlayerStore} from '../../../store/usePlayerStore';

interface PruebaPlayerProps {
  url: string;

  name?: string;
}

export const Player: React.FC<PruebaPlayerProps> = ({url, name}) => {
  const playbackState = usePlaybackState();

  const [initialized, setInitialized] = useState(false);

  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  const setIsPlaying = usePlayerStore(state => state.setIsPlaying);

  useEffect(() => {
    const checkPlayer = async () => {
      const state = await TrackPlayer.getPlaybackState();

      if (state.state) {
        setInitialized(true);

        const activeTrack = await TrackPlayer.getActiveTrack();

        if (activeTrack) setCurrentUrl(activeTrack.url);
      }
    };

    checkPlayer();
  }, []);

  useEffect(() => {
    console.log(url);

    const handleURLChange = async () => {
      if (!initialized || !url || url === currentUrl) return;

      const activeTrack = await TrackPlayer.getActiveTrack();

      const state = await TrackPlayer.getPlaybackState();

      if (!activeTrack || activeTrack.url !== url) {
        console.log('Cambio de URL necesario');

        await TrackPlayer.reset();

        await TrackPlayer.add({
          id: 'radio-stream',

          url:
            url ||
            'https://stream.emisorasmusicales.net/listen/activa_fm/activafm.mp3',

          title: name,

          artist: 'Emisoras Musicales',
        });

        await TrackPlayer.play();

        setCurrentUrl(url);
      } else if (state.state !== State.Playing) {
        console.log('Reanudando reproducción existente');

        await TrackPlayer.play();
      }
    };

    handleURLChange();
  }, [url, initialized]);

  const playPauseRadio = async () => {
    if (!initialized || playbackState.state === State.None) return; // Asegúrate de que el reproductor está listo

    const currentState = playbackState.state;

    console.log('Acción manual, estado:', currentState);

    if (currentState === State.Playing) {
      await TrackPlayer.pause();

      console.log('Pausa manual');
    } else {
      await TrackPlayer.play();

      console.log('Reproducción manual iniciada');
    }
  };

  const {playing, bufferingDuringPlay} = useIsPlaying();

  const renderButton = () => {
    if (bufferingDuringPlay === true) {
      return <ActivityIndicator size="large" color="#fff" />;
    }

    if (playing === true) {
      return <Icon name="pause-outline" size={80} color="white" />;
    }

    return <Icon name="play-outline" size={80} color="white" />;
  };

  useEffect(() => {
    const playerIsPlaying = playbackState.state === State.Playing;
    setIsPlaying(playerIsPlaying);
  }, [playbackState]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={playPauseRadio} disabled={bufferingDuringPlay}>
        {renderButton()}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default Player;
