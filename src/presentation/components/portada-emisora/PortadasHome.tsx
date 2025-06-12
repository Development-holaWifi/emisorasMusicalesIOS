import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Image, ImageSourcePropType, Pressable, View} from 'react-native';
import {RootStackParams} from '../../navigation/Navigation';

interface Props {
  id: number;
  image: ImageSourcePropType;
  width: number;
}

export const PortadasHome = ({id, image, width}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <Pressable
      onPress={() => navigation.navigate('Details', {id})}
      style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}>
      <View>
        <Image
          source={image}
          style={{
            width: width - 5,
            height: width - 5,
            borderRadius: 5,
            resizeMode: 'cover',
          }}
        />
      </View>
    </Pressable>
  );
};
