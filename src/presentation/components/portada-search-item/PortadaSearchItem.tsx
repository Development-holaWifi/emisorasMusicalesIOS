import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RootStackParams} from '../../navigation/Navigation';

interface Props {
  id: number;
  image: ImageSourcePropType;
  name: string;
}

export const PortadaSearchItem = ({id, image, name}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate('Details', {id})}
        style={({pressed}) => [{opacity: pressed ? 0.5 : 1}, styles.btn]}>
        <Image source={image} style={styles.img} />
        <View style={styles.textName}>
          <Text style={{color: '#ff0066'}}>{name}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '90%',
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  btn: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
  },
  textName: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
  },

  img: {
    width: 50,
    height: 50,
    marginLeft: 40,
    borderRadius: 5,
  },
});
