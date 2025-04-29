import React from 'react';
import {Image, Text, useWindowDimensions, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/Navigation';
import {TopMenu} from '../../components/top-menu/TopMenu';
import {BottomMenu} from '../../components/bottom-menu/BottomMenu';

interface Props extends StackScreenProps<RootStackParams, 'Favorites'> {}

export const FavoritesScreen = ({navigation, route}: Props) => {
  const {width} = useWindowDimensions();
  return (
    <>
      <TopMenu />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: width,
          backgroundColor: 'white',
        }}>
        {/* <Image
          source={require('../../../assets/underconstruction.png')}
          style={{
            width: width * 0.9,
            height: width * 0.7,
            resizeMode: 'center',
            alignSelf: 'center',
          }}
        /> */}
        <Text style={{color: '#ff0066'}}>🔧¡Oops!</Text>
        <Text style={{color: '#ff0066'}}>¡Pronto estará lista!</Text>
      </View>

      <BottomMenu navigation={navigation} route={route} />
    </>
  );
};
