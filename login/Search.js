import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import {Icon, SearchBar, ListItem} from 'react-native-elements';
import { createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import MainPage from './MainPage';

const image = require('./image/menu.png');
var {height, width} = Dimensions.get('window'); 

const list = [
  {
    name: 'UNIVERSITY OF FLORIDA',
  },
  {
    name: 'STANFORD',
  },
  {
    name: 'HARVARD'
  },
  {
    name: 'HARVARD'
  },
  {
    name: 'HARVARD'
  },
  {
    name: 'HARVARD'
  },
  {
    name: 'HARVARD'
  },
  {
    name: 'HARVARD'
  },
]

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
      search:'',
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  
  updateSearch = search =>{
    this.setState({search: search});
  }

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    const { search } = this.state;

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <View style={styles.container}/>
        <View style={styles.searchbar}>
          <SearchBar
            placeholder="Explore"
            onChangeText={this.updateSearch}
            value={search}
            inputContainerStyle={{backgroundColor: 'white'}}
            containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
            leftIconContainerStyle={{backgroundColor:'white'}}
          />
        </View>
        <View style={styles.container}>
          <Icon
            raised
            name='crosshairs'
            type='font-awesome'
            color='#f50'
            onPress={() => {
              this.props.navigation.navigate('MainPage');
            }}/>
        </View>
        <SafeAreaView style={styles.SafeAreaView}>
          <ScrollView style={styles.ScrollView}>
            {
              list.map((l, i) => (
                <ListItem
                  key={i}
                  title={l.name}
                  bottomDivider
                  containerStyle={styles.ScrollView}
                />
              ))
            }

          </ScrollView>
        </SafeAreaView>
        
          
        <TouchableOpacity
          onPress={this.toggle}
          style={styles.button}
        >
          <Image
            source={image}
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkorange',
  },
  searchbar: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'darkorange',
    padding: 0.1*width,
  },
  SafeAreaView: {
    flex: 6,
    justifyContent: 'center',
    backgroundColor: 'darkorange',
    padding: 0.1*width,
  },
  ScrollView: {
    borderRadius: 10,
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const RootStack = createStackNavigator(
  {
    Search: SearchPage,
    MainPage: MainPage,
  },
  {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
      header: null
    },
  }
);
const AppContainer = createAppContainer(RootStack);



export default class Search extends React.Component {
  render() {
    return <AppContainer />;
  }
}