import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Image,
  ImageBackground,
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
  banner?: ImageSourcePropType;
}

export const PortadaSearchItem = ({id, image, name, banner}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <ImageBackground
      source={banner}
      imageStyle={styles.imgContainer}
      style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate('Details', {id})}
        style={({pressed}) => [{opacity: pressed ? 0.5 : 1}, styles.btn]}>
        <Image source={image} style={styles.img} />
        <Text style={styles.text}>{name}</Text>
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '90%',
    height: 100,
    marginBottom: 5,
    borderRadius: 10,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 30,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    marginLeft: 20,
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  imgContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});
