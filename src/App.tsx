import React, {useEffect, useRef} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import TrackPlayer, {Capability} from 'react-native-track-player';
import {NavigationContainer, CommonActions} from '@react-navigation/native';
import {Navigation} from './presentation/navigation/Navigation';
import {useDetailsStore} from './store/useDetailsStore';
import {usePlayerStore} from './store/usePlayerStore';

const INACTIVITY_LIMIT = 5 * 60 * 1000;
let backgroundTimestamp: number | null = null;

export const App = () => {
  const navigationRef = useRef(null);
  const setLastId = useDetailsStore(state => state.setLastId);
  const isPlaying = usePlayerStore(state => state.isPlaying);

  const destroyPlayerAndGoHome = async (
    navigationRef: any,
    setLastId: (id: number | null) => void,
  ) => {
    try {
      console.log('🧨 Destruyendo TrackPlayer y redirigiendo a Splash...');
      await TrackPlayer.stop();

      navigationRef.current?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Splash'}],
        }),
      );
      setLastId(null);
      console.log('✅ Reproductor destruido y redirigido a Splash');
    } catch (error) {
      console.error('❌ Error destruyendo reproductor:', error);
    }
  };

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

    // const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    //   if (nextAppState === 'inactive') {
    //     backgroundTimestamp = Date.now();
    //     console.log('📴 App inactiva:', backgroundTimestamp);
    //   }

    //   if (nextAppState === 'active') {
    //     if (backgroundTimestamp) {
    //       const now = Date.now();
    //       const inactiveTime = now - backgroundTimestamp;

    //       if (inactiveTime > INACTIVITY_LIMIT) {
    //         await destroyPlayerAndGoHome(navigationRef, setLastId);
    //       } else {
    //         console.log('🔄 Reactivado en menos de 1 min. Continuando...');
    //       }

    //       backgroundTimestamp = null;
    //     }
    //   }
    // };

    // const subscription = AppState.addEventListener(
    //   'change',
    //   handleAppStateChange,
    // );

    // return () => subscription.remove();
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    if (!isPlaying) {
      console.log(
        '⏸ Reproductor pausado. Temporizador de 1 minuto iniciado...',
      );
      timeout = setTimeout(() => {
        destroyPlayerAndGoHome(navigationRef, setLastId);
      }, INACTIVITY_LIMIT);
    } else {
      console.log('▶️ Reproductor activo. Cancelando temporizador de pausa...');
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [isPlaying]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;
