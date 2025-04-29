import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/Navigation';

interface Props {
  navigation: NavigationProp<RootStackParams>;
  route?: any;
}

export const BottomMenu = ({navigation, route}: Props) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Icon
          name={route.name === 'Home' ? 'home-sharp' : 'home-outline'}
          size={25}
          color="white"
        />
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Search')}>
        <Icon
          name={route.name === 'Search' ? 'search-sharp' : 'search-outline'}
          size={25}
          color="white"
        />
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Favorites')}>
        <Icon
          name={route.name === 'Favorites' ? 'heart-sharp' : 'heart-outline'}
          size={25}
          color="white"
        />
      </Pressable>
    </View>
  );
};

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '100%',
    height: height * 0.06,
    backgroundColor: '#FF0066',
  },
  button: {
    marginTop: 10,
  },
});
