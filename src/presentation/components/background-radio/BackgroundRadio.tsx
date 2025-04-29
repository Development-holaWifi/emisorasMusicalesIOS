import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  ImageSourcePropType,
  useWindowDimensions,
} from 'react-native';
import Player from '../player/Player';

interface Props {
  stream?: string;
  name?: string;
  radioPortada?: ImageSourcePropType;
  back: ImageSourcePropType;
}

export const BackgroundRadio = ({stream, name, radioPortada, back}: Props) => {
  const {width, height} = useWindowDimensions();

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      height: '100%',
    },
    text: {
      color: 'white',
      fontSize: 24,
      marginBottom: 20,
    },
    songTitles: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '75%',
    },
    player: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: width * 0.7,
    },
    radioPortada: {
      width: 60,
      height: 60,
      marginTop: 100,
      resizeMode: 'contain',
      borderRadius: 10,
    },
    radioImg: {
      position: 'absolute',
      left: 50,
      width: 50,
      height: 50,
      resizeMode: 'contain',
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 25,
    },
  });

  return (
    <ImageBackground source={back} style={styles.background} resizeMode="cover">
      {stream && (
        <View style={styles.player}>
          <Image
            style={styles.radioImg}
            source={
              radioPortada
                ? radioPortada
                : require('../../../assets/em-poster.png')
            }
          />
          <Player url={stream} name={name} />
        </View>
      )}
    </ImageBackground>
  );
};
