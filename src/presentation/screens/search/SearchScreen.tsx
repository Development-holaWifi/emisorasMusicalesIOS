import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  useWindowDimensions,
  ImageSourcePropType,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/Navigation';
import {TopMenu} from '../../components/top-menu/TopMenu';
import {BottomMenu} from '../../components/bottom-menu/BottomMenu';
import {emisorasData} from '../../../api/EmisorasData';
import Icon from '@react-native-vector-icons/ionicons';
import {PortadaSearchItem} from '../../components/portada-search-item/PortadaSearchItem';

interface Emisora {
  id: number;
  image: ImageSourcePropType;
  banner?: ImageSourcePropType;
  background?: ImageSourcePropType;
  title: string;
  description: string;
  color: string;
}

interface Props extends StackScreenProps<RootStackParams, 'Search'> {}

export const SearchScreen = ({navigation, route}: Props) => {
  const {width} = useWindowDimensions();
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<Emisora[]>(emisorasData);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const newData = emisorasData.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(newData);
  };

  return (
    <>
      <TopMenu />

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={30} color="#ff0066" />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Icon name={'search-outline'} color="#ff0066" size={25} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre..."
            placeholderTextColor="white"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
        <FlatList
          style={{marginBottom: 50}}
          data={filteredData}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', {id: item.id})}
              style={styles.itemContainer}>
              <PortadaSearchItem
                id={item.id}
                name={item.title}
                image={item.image}
                banner={item.banner}
              />
            </TouchableOpacity>
          )}
        />
      </View>
      <BottomMenu navigation={navigation} route={route} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'black',
    marginBottom: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: '#ff0066',
  },
  searchInput: {
    width: '80%',
    height: 50,
    marginLeft: 10,
    backgroundColor: 'black',
    color: 'white',
  },
  itemContainer: {
    alignItems: 'center', 
  },
  itemTitle: {
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
  },
  backButton: {
    color: '#ff0066',
    paddingVertical: 10,
    paddingLeft: 10,
    backgroundColor: 'black',
  },
});
