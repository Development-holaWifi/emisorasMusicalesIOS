import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {RootStackParams} from '../../navigation/Navigation';

interface Props {
  id: number;
  image: ImageSourcePropType;
}

export const PortadaEmisora = ({id, image}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <Pressable
      onPress={() => navigation.navigate('Details', {id})}
      style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}>
      <View>
        <Image source={image} style={styles.img} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 110,
    height: 110,
    marginHorizontal: 4,
    borderRadius: 5,
  },
});
