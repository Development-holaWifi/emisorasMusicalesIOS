import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
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
import {emisorasData} from '../../../api/EmisorasData'; // Asegúrate de importar Emisora
import {PortadaEmisora} from '../../components/portada-emisora/PortadaEmisora';
import Icon from '@react-native-vector-icons/ionicons';
import {PortadaSearchItem} from '../../components/portada-search-item/PortadaSearchItem';

interface Emisora {
  id: number;
  image: ImageSourcePropType;
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
        <View style={styles.inputContainer}>
          <Icon name={'search-outline'} color="#ff0066" size={25} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre..."
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
    backgroundColor: '#ff97b8',
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
    backgroundColor: 'white',
    marginVertical: 30,
  },
  searchInput: {
    width: '80%',
    height: 50,
    marginLeft: 10,
    borderColor: 'gray',
    backgroundColor: 'white',
    color: 'black',
  },
  itemContainer: {
    alignItems: 'center', // Centra la portada y el texto
  },
  itemTitle: {
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
  },
});
