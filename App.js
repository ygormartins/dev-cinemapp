import React, { useEffect, useState } from 'react';
import { SearchBar, Icon} from 'react-native-elements';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SyncStorage from 'sync-storage';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle={'light-content'}/>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const SearchScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [favoritesH, setFavorites] = useState(SyncStorage.get('@Favorites'));
  var favorites = favoritesH;
  const searchFilterFunction = (text) => {
    setLoading(true);
    setData([]);
    setSearch(text);
  };

  useEffect(() => {
    if (search) {
      fetch('http://www.omdbapi.com/?apikey=925eba28&s=' + search.trim())
        .then((response) => response.json())
        .then((json) => setData(json.Search))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      }
      else {
        setLoading(false);
        setData([]);
      }
  }, [search], [favorites]);

  const ToggleFavorites = (imdbIDm, titlem, yearm, typem) =>{
    var found = false;
    if (SyncStorage.get('@Favorites') === undefined || SyncStorage.get('@Favorites') === null ){
      SyncStorage.set('@Favorites', JSON.stringify([]));
    }
    try {
      favorites = JSON.parse(SyncStorage.get('@Favorites'));
      if (favorites !== null || favorites !== undefined) {
        for (var i = 0; i < favorites.length; i++) {
          if (favorites[i].imdbID === imdbIDm) {
            found = true;
            break;
          }
        }
        if (!found){
          var newFavorite = {imdbID : imdbIDm, Title : titlem, Year : yearm, Type : typem};
          favorites = [...favorites, newFavorite];
          try {
            SyncStorage.set('@Favorites', JSON.stringify(favorites));
          } catch (error) {}
        }
        else {
          favorites = (favorites.filter(e => e.imdbID !== imdbIDm));
          try {
            SyncStorage.set('@Favorites', JSON.stringify(favorites));
          } catch (error) {}
        }
      }
      else {
        var newFavorite = {imdbID : imdbIDm, Title : titlem, Year : yearm, Type : typem};
          favorites = [...favorites, newFavorite];
          try {
            SyncStorage.set('@Favorites', JSON.stringify(favorites));
          } catch (error) {}
      }
      setFavorites(SyncStorage.get('@Favorites'));
    } catch (error) {}
  };

  const isFavorite = (imdbIDm) =>{
    var found = false;
    if (SyncStorage.get('@Favorites') === undefined || SyncStorage.get('@Favorites') === null ){
      SyncStorage.set('@Favorites', JSON.stringify([]));
    }
    try {
      favorites = JSON.parse(SyncStorage.get('@Favorites'));
      if (favorites !== null || favorites !== undefined){
        for (var i = 0; i < favorites.length; i++) {
          if (favorites[i].imdbID === imdbIDm) {
            found = true;
            break;
          }
        }
        return found;
      }
      else {
        try {
          SyncStorage.set('@Favorites', JSON.stringify([]));
        } catch (error) {}
      }
    } catch {}
  };

  return (
    <>
      <SearchBar
        round
        placeholderTextColor={colors.textSubtitle}
        searchIcon={{size: 24, color: colors.textTitle}}
        clearIcon={{size: 18, color: colors.textTitle}}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={(text) => searchFilterFunction('')}
        placeholder="Search for movies & series"
        value={search}
      />
      <View style={styles.background}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
          contentContainerStyle={styles.list}
          data={data}
          keyExtractor={({ imdbID }, index) => imdbID}
          renderItem={ ({ item }) => (
            <View style={styles.listItem}>
              {item.Type === 'series' ?
              (<Icon size={32} color={colors.textTitle} name={'video-library'} style={styles.listItemIcon} />) :
              item.Type === 'episode' ?
              (<Icon size={32} color={colors.textTitle} name={'video-label'} style={styles.listItemIcon} />) :
              (<Icon size={32} color={colors.textTitle} name={'theaters'} style={styles.listItemIcon} />)}
              <View style={styles.listItemTextContainer}>
                <Text numberOfLines={1} style={styles.listItemTitle}>
                  {item.Title}
                </Text>
                <Text numberOfLines={1} style={styles.listItemSubtitle}>
                  {item.Year}
                </Text>
              </View>
              <TouchableOpacity style={styles.listItemFavButtonContainer} onPress={ () => ToggleFavorites(item.imdbID, item.Title, item.Year, item.Type)}>
                {isFavorite(item.imdbID) ? (<Icon size={28} color={colors.primary} style={styles.listItemFavButton} name="favorite"/>) :
                (<Icon size={28} color={colors.divider} style={styles.listItemFavButton} name="favorite-border"/>)}
              </TouchableOpacity>
            </View>
          )}
          ItemSeparatorComponent={listItemSeparator} />
            )}
      </View>
    </>
  );
};

const FavoritesScreen = () => {
  const [favoritesH, setFavorites] = useState(JSON.stringify([]));
  if (SyncStorage.get('@Favorites') === undefined || SyncStorage.get('@Favorites') === null ){
     SyncStorage.set('@Favorites', JSON.stringify([]));
  }
  var favorites = [];
  const ToggleFavorites = (imdbIDm, titlem, yearm, typem) =>{
    var found = false;
    if (SyncStorage.get('@Favorites') === undefined || SyncStorage.get('@Favorites') === null ){
      SyncStorage.set('@Favorites', JSON.stringify([]));
    }
    try {
      favorites = JSON.parse(SyncStorage.get('@Favorites'));
      if (favorites !== null || favorites !== undefined) {
        for (var i = 0; i < favorites.length; i++) {
          if (favorites[i].imdbID === imdbIDm) {
            found = true;
            break;
          }
        }
        if (!found){
          var newFavorite = {imdbID : imdbIDm, Title : titlem, Year : yearm, Type : typem};
          favorites = [...favorites, newFavorite];
          try {
            SyncStorage.set('@Favorites', JSON.stringify(favorites));
          } catch (error) {}
        }
        else {
          favorites = (favorites.filter(e => e.imdbID !== imdbIDm));
          try {
            SyncStorage.set('@Favorites', JSON.stringify(favorites));
          } catch (error) {}
        }
      }
      else {
        var newFavorite = {imdbID : imdbIDm, Title : titlem, Year : yearm, Type : typem};
          favorites = [...favorites, newFavorite];
          try {
            SyncStorage.set('@Favorites', JSON.stringify(favorites));
          } catch (error) {}
      }
      setFavorites(SyncStorage.get('@Favorites'));
    } catch (error) {}
  };

  const isFavorite = (imdbIDm) =>{
    var found = false;
    if (SyncStorage.get('@Favorites') === undefined || SyncStorage.get('@Favorites') === null ){
      SyncStorage.set('@Favorites', JSON.stringify([]));
    }
    try {
      favorites = JSON.parse(SyncStorage.get('@Favorites'));
      if (favorites !== null || favorites !== undefined){
        for (var i = 0; i < favorites.length; i++) {
          if (favorites[i].imdbID === imdbIDm) {
            found = true;
            break;
          }
        }
        return found;
      }
      else {
        try {
          SyncStorage.set('@Favorites', JSON.stringify([]));
        } catch (error) {}
      }
    } catch {}
  };

  useEffect(() => {
    setFavorites(SyncStorage.get('@Favorites'));
  }, [favoritesH]);

  return (
    <View style={styles.background}>
      <View style={styles.toolbar}>
        <Text style={styles.toolbarTitle}>My Favorites</Text>
      </View>
      <FlatList
          contentContainerStyle={styles.list}
          data={JSON.parse(favoritesH)}
          keyExtractor={({ imdbID }, index) => imdbID}
          renderItem={ ({ item }) => (
            <View style={styles.listItem}>
              {item.Type === 'series' ?
              (<Icon size={32} color={colors.textTitle} name={'video-library'} style={styles.listItemIcon} />) :
              item.Type === 'episode' ?
              (<Icon size={32} color={colors.textTitle} name={'video-label'} style={styles.listItemIcon} />) :
              (<Icon size={32} color={colors.textTitle} name={'theaters'} style={styles.listItemIcon} />)}
              <View style={styles.listItemTextContainer}>
                <Text numberOfLines={1} style={styles.listItemTitle}>
                  {item.Title}
                </Text>
                <Text numberOfLines={1} style={styles.listItemSubtitle}>
                  {item.Year}
                </Text>
              </View>
              <TouchableOpacity style={styles.listItemFavButtonContainer} onPress={ () => ToggleFavorites(item.imdbID, item.Title, item.Year, item.Type)}>
                {isFavorite(item.imdbID) ? (<Icon size={28} color={colors.primary} style={styles.listItemFavButton} name="favorite"/>) :
                (<Icon size={28} color={colors.divider} style={styles.listItemFavButton} name="favorite-border"/>)}
              </TouchableOpacity>
            </View>
          )}
          ItemSeparatorComponent={listItemSeparator} />
    </View>
  );
};

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      tabBarOptions={{
        activeTintColor: colors.textTitle,
        inactiveTintColor: colors.textSubtitle,
        style: styles.tabNavigator,
      }}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Home',
          keyboardHidesTabBar: true,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Icon name="favorite" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const listItemSeparator = () => {
  return (
    <View style={styles.listItemSeparator}/>
  );
};

const colors = {
  primary: '#600',
  background: '#000',
  inputField: '#00000020',
  textTitle: '#fff',
  textSubtitle: '#aaa',
  divider: '#444',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.primary,
  },
  toolbar: {
    height: 66,
    backgroundColor: colors.primary,
    padding: 16,
    justifyContent:'center',
  },
  toolbarTitle: {
    fontSize: 18,
    color: colors.textTitle,
  },
  searchBarContainer: {
    height: 66,
    backgroundColor: colors.primary,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchBarInputContainer: {
    backgroundColor: colors.inputField,
  },
  searchBarInput: {
    fontSize: 18,
    color: colors.textTitle,
  },
  background: {
    backgroundColor: colors.background,
    flex: 1,
  },
  list: {
    padding: 8,
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  listItemSeparator: {
    height:  StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: colors.divider,
  },
  listItemTextContainer: {
    flexGrow: 1,
    flex: 1,
    justifyContent: 'center',
  },
  listItemTitle: {
    textAlign: 'left',
    color: colors.textTitle,
    fontSize: 18,
    fontWeight: '700',
  },
  listItemSubtitle: {
    textAlign: 'left',
    color: colors.textSubtitle,
    fontSize: 16,
  },
  listItemIcon: {
    alignSelf: 'baseline',
    padding: 12,
    backgroundColor: colors.primary,
    marginRight: 12,
    aspectRatio: 1,
    borderRadius: 1000,
    /*I know this probably isn't the best way to create a circle, since it's not exactly what one would call 'responsive'.
    But the chances of this view becoming larger than 2000 are virtually 0 so...*/
  },
  listItemFavButtonContainer: {
    aspectRatio: 1,
    alignItems:'center',
    justifyContent:'center',
  },
  listItemFavButton: {
    alignSelf: 'baseline',
  },
  tabNavigator: {
    backgroundColor: colors.primary,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
});

export default App;
