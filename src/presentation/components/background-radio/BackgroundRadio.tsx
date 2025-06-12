import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  ImageSourcePropType,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import Player from '../player/Player';
import {useFavoritesStore} from '../../../store/useFavoriteStore';
import Icon from '@react-native-vector-icons/ionicons';

interface Props {
  stream?: string;
  name?: string;
  radioPortada?: ImageSourcePropType;
  back: ImageSourcePropType;
  id: number;
}

export const BackgroundRadio = ({
  stream,
  name,
  radioPortada,
  id,
  back,
}: Props) => {
  const {width} = useWindowDimensions();

  const favorites = useFavoritesStore(state => state.favorites);
  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);
  const isFavorite = favorites.includes(id);

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    playerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '75%',
      marginTop: width * 0.7,
    },
    sideItem: {
      width: 50,
      alignItems: 'center',
    },
    radioImg: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
      borderRadius: 25,
    },
    playerWrapper: {
      flex: 0.5,
      alignItems: 'center',
    },
  });

  return (
    <ImageBackground source={back} style={styles.background} resizeMode="cover">
      {stream && (
        <View style={styles.playerContainer}>
          {/* Imagen a la izquierda */}
          <View style={styles.sideItem}>
            <Image
              style={styles.radioImg}
              source={
                radioPortada
                  ? radioPortada
                  : require('../../../assets/em-poster.png')
              }
            />
          </View>

          {/* Player centrado */}
          <View style={styles.playerWrapper}>
            <Player url={stream} name={name} />
          </View>

          {/* Corazón a la derecha */}
          <View style={styles.sideItem}>
            <TouchableOpacity onPress={() => toggleFavorite(id)}>
              <Icon
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};
