import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/Navigation';
import {TopMenu} from '../../components/top-menu/TopMenu';
import {BottomMenu} from '../../components/bottom-menu/BottomMenu';
import {useFavoritesStore} from '../../../store/useFavoriteStore';
import {emisorasData} from '../../../api/EmisorasData';
import Icon from '@react-native-vector-icons/ionicons';

interface Props extends StackScreenProps<RootStackParams, 'Favorites'> {}

export const FavoritesScreen = ({navigation, route}: Props) => {
  const {width} = useWindowDimensions();
  const favoriteIds = useFavoritesStore(state => state.favorites);
  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);
  const favorites = emisorasData.filter(e => favoriteIds.includes(e.id));
  return (
    <>
      <TopMenu />
      {/* <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: width,
          backgroundColor: 'white',
        }}>
        <Image
          source={require('../../../assets/underconstruction.png')}
          style={{
            width: width * 0.9,
            height: width * 0.7,
            resizeMode: 'center',
            alignSelf: 'center',
          }}
        />
        <Text style={{color: '#ff0066'}}>🔧¡Oops!</Text>
        <Text style={{color: '#ff0066'}}>¡Pronto estará lista!</Text>
      </View> */}
      <View
        style={{
          flex: 1,
          paddingTop: 60,
          backgroundColor: 'black',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            textAlign: 'center',
            marginBottom: 20,
          }}>
          Tus Emisoras Favoritas
        </Text>

        {favorites.length === 0 ? (
          <Text style={{color: 'gray', textAlign: 'center'}}>
            No tienes emisoras favoritas aún.
          </Text>
        ) : (
          favorites.map(emisora => (
            <TouchableOpacity
              key={emisora.id}
              onPress={() => navigation.navigate('Details', {id: emisora.id})}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 20,
                borderBottomColor: 'white',
                borderBottomWidth: 1,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={emisora.image}
                  style={{
                    width: 50,
                    height: 50,
                    marginRight: 10,
                    borderRadius: 8,
                  }}
                />
                <Text style={{color: 'white', fontSize: 15}}>
                  {emisora.title}
                </Text>
              </View>

              <TouchableOpacity onPress={() => toggleFavorite(emisora.id)}>
                <Icon name="heart" size={24} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
      </View>
      <BottomMenu navigation={navigation} route={route} />
    </>
  );
};
