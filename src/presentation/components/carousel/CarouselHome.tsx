import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import {emisorasData} from '../../../api/EmisorasData';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/Navigation';
import {PortadasHome} from '../portada-emisora/PortadasHome';
import Icon from '@react-native-vector-icons/ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const CarouselHome = () => {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const NUM_COLUMS = 3;
  const CARD_MARGIN = 10;
  const cardWidth = (width - CARD_MARGIN * 2 * NUM_COLUMS) / NUM_COLUMS;

  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      width: '100%',
      paddingBottom: insets.bottom + height * 0.06,
    },
    text: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
    },
    row: {
      justifyContent: 'center',
    },
    card: {
      backgroundColor: 'black',
      padding: 7,
    },
    searchContainer: {
      alignItems: 'center',
      width: '100%',
      marginTop: 40,
    },
    pressable: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      padding: 3,
      marginVertical: 15,
      borderWidth: 1,
      borderColor: '#ff0066',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.text}>¿QUE EMISORA TE APETECE ESCUCHAR?</Text>
        <Pressable
          style={styles.pressable}
          onPress={() => navigation.navigate('Search')}>
          <Icon name="search-outline" size={25} color="#ff0055" />
          <Text style={{color: 'white', marginLeft: 8}}>
            Buscar por nombre...
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={emisorasData}
        keyExtractor={item => item.id.toString()}
        numColumns={NUM_COLUMS}
        columnWrapperStyle={styles.row}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              if (item.id === 1) {
                navigation.navigate('Home');
              } else {
                navigation.navigate('Details', {id: item.id});
              }
            }}
            style={styles.card}>
            <PortadasHome image={item.image} id={item.id} width={cardWidth} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
