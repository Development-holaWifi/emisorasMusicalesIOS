import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './presentation/navigation/Navigation';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player';

export const App = () => {
  useEffect(() => {
    const setupPlayer = async () => {
      try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
          capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
          compactCapabilities: [Capability.Play, Capability.Pause],
          notificationCapabilities: [Capability.Play, Capability.Pause],
        });
      } catch (error) {
        console.error('Error al inicializar TrackPlayer:', error);
      }
    };
    setupPlayer();
  }, []);

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};
