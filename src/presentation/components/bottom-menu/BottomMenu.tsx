import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/Navigation';
import {useDetailsStore} from '../../../store/useDetailsStore';

interface Props {
  navigation: NavigationProp<RootStackParams>;
  route?: any;
}

export const BottomMenu = ({navigation, route}: Props) => {
  const lastId = useDetailsStore(state => state.lastId);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate('Home')}>
        <Icon
          name={route.name === 'Home' ? 'home-sharp' : 'home-outline'}
          size={25}
          color="white"
        />
      </Pressable>
      {/* {lastId !== null && (
        <Pressable
          style={styles.pressable}
          onPress={() => navigation.navigate('Details', {id: lastId})}>
          <Icon
            name={route.name === 'Details' ? 'radio-sharp' : 'radio-outline'}
            size={25}
            color="white"></Icon>
        </Pressable>
      )} */}
      <Pressable
        style={styles.pressable}
        onPress={() => {
          if (lastId !== null) {
            navigation.navigate('Details', {id: lastId});
          }
        }}
        disabled={lastId === null}>
        <Text style={{color: 'white', fontSize: 10}}>Directo</Text>
        <Icon
          name={route.name === 'Details' ? 'radio-sharp' : 'radio-outline'}
          size={25}
          color={lastId === null ? 'gray' : 'white'}
        />
      </Pressable>
      <Pressable
        style={styles.pressable}
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
    alignItems: 'center',
    width: '100%',
    height: height * 0.06,
    backgroundColor: '#FF0066',
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: '100%',
    marginBottom: 10,
  },
});


