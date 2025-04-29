import TrackPlayer, {
  Event,
  State as TrackPlayerState,
} from 'react-native-track-player';
import {getPlaybackState} from 'react-native-track-player/lib/src/trackPlayer';

let retryCount = 0;
const MAX_RETRIES = 5;

module.exports = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    console.log('RemotePlay disparado');
    await TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemotePause, async () => {
    console.log('RemotePause disparado');
    await TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemoteStop, async () => {
    console.log('RemoteStop disparado');
    await TrackPlayer.stop();
    // await TrackPlayer.destroy();
  });

  TrackPlayer.addEventListener(Event.PlaybackError, async error => {
    console.error('Error de reproducción en servicio:', error);
    if (retryCount < MAX_RETRIES) {
      retryCount++;
      console.log(
        `Intento de reanudación (${retryCount}/${MAX_RETRIES}) en 2 segundos...`,
      );
      setTimeout(async () => {
        const state = await getPlaybackState();
        if (state !== TrackPlayerState.Playing) {
          await TrackPlayer.play();
        }
      }, 2000);
    } else {
      console.log('Máximo de reintentos alcanzado. Pausando.');
      await TrackPlayer.pause();
    }
  });

  TrackPlayer.addEventListener(Event.PlaybackState, async state => {
    console.log('Estado de reproducción:', state);

    if (state === TrackPlayerState.Buffering) {
      console.log('📡 Conexión inestable, esperando...');
      setTimeout(async () => {
        const currentState = await getPlaybackState();
        if (currentState === TrackPlayerState.Buffering) {
          console.log('⚠️ Buffering prolongado, pausando.');
          await TrackPlayer.pause();
        }
      }, 3000);
    } else if (state === TrackPlayerState.Playing) {
      console.log('🔄 Reanudando reproducción después de buffering');
      retryCount = 0;
    }
  });

  let wasPlayingBeforeDuck = false;

  TrackPlayer.addEventListener(Event.RemoteDuck, async data => {
    console.log('RemoteDuck:', data);

    if (data.paused) {
      const currentState = await getPlaybackState();
      wasPlayingBeforeDuck = currentState === TrackPlayerState.Playing;
      await TrackPlayer.pause();
      console.log('📞 Pausado por llamada');
    } else {
      if (wasPlayingBeforeDuck) {
        await TrackPlayer.play();
        console.log('▶️ Reanudando tras la llamada');
      } else {
        console.log(
          '⏸️ No se reanuda porque estaba pausado antes de la llamada',
        );
      }
    }
  });
};
