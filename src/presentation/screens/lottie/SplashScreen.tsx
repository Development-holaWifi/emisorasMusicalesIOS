import {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/Navigation';
import {StyleSheet, View} from 'react-native';

interface Props extends StackScreenProps<RootStackParams, 'Splash'> {}
export const SplashScreen: React.FC<Props> = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../../assets/splash.json')}
        autoPlay
        loop={false}
        resizeMode="cover"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: 99,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0066',
  },
});
