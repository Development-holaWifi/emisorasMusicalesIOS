import {Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

export const TopMenu = () => {
  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../../../assets/em-poster.png')}
        style={styles.imageStyle}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 60,
    backgroundColor: '#FF0066',
  },
  imageStyle: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
  },
});
