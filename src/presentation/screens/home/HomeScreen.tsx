import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import {useRadioNowPlaying} from '../../hooks/useRadioNowPlaying';
import {useEffect, useState} from 'react';
import {TopMenu} from '../../components/top-menu/TopMenu';
// import {BottomMenu} from '../../components/bottom-menu/BottomMenu';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/Navigation';
import {BackgroundRadio} from '../../components/background-radio/BackgroundRadio';
import {Carousel} from '../../components/carousel/Carousel';
import {BottomMenu} from '../../components/bottom-menu/BottomMenu';
import {CarouselHome} from '../../components/carousel/CarouselHome';

interface Props extends StackScreenProps<RootStackParams, 'Home'> {}

export const HomeScreen = ({navigation, route}: Props) => {
  const {station, loading} = useRadioNowPlaying(1);
  const [stream, setStream] = useState<string>('');

  useEffect(() => {
    if (station && station.public_player_url !== stream) {
      setStream(station.public_player_url);
    }
  }, [station?.public_player_url]);

  const {height: screenHeight} = useWindowDimensions();
  const backgroundImage = require('../../../assets/backgrounds/activa-back.jpg');

  return (
    <>
      <TopMenu />
      {/* <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{height: screenHeight * 0.68}}>
          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#ff0066" />
            </View>
          ) : (
            <BackgroundRadio
              stream={'https://stream.emisorasmusicales.net/public/activa_fm'}
              back={backgroundImage}
            />
          )}
        </View>
        <Carousel />
      </ScrollView> */}
      <CarouselHome />
      <BottomMenu navigation={navigation} route={route} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  loaderText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
});
