import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home/HomeScreen';
import React from 'react';
import {DetailsScreen} from '../screens/details/DetailsScreen';
import {FavoritesScreen} from '../screens/favorites/FavoritesScreen';
import {SearchScreen} from '../screens/search/SearchScreen';
import {SplashScreen} from '../screens/lottie/SplashScreen';

export type RootStackParams = {
  Splash: undefined;
  Home: undefined;
  Details: {id: number};
  Favorites: undefined;
  Search: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Details"
        children={({route, navigation}) => (
          <DetailsScreen
            key={route.params.id}
            route={route}
            navigation={navigation}
          />
        )}
      />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};
