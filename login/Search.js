import React, { Component,PureComponent } from 'react';
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
import MenuPage from './Menu';
import {Icon, SearchBar, ListItem, Header} from 'react-native-elements';
import { createAppContainer,createSwitchNavigator} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
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

class SearchPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search:'',
    };
  }
  
  updateSearch = search =>{
    this.setState({search: search});
  }

  render() {
    const { search } = this.state;

    return (
      <View style={{flex: 1, backgroundColor:'darkorange'}}>
        <Header
          leftComponent={ <Icon name='bars' type='font-awesome' onPress={() => this.props.navigation.openDrawer()} color='white'/>}
          centerComponent={{ text: 'KLEIO', style: { color: 'white' } }}
          backgroundColor='darkorange'
          containerStyle={{shadowColor:'transparent', height: 50}}
          leftContainerStyle={{top:-15}}
          centerContainerStyle={{top:-15}}
          rightContainerStyle={{top:-15}}
        />
      
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
      </View>
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

const AppNavigator = createDrawerNavigator({
  Home: {
    screen: RootStack,
  },
  Settings: {
    screen: MenuPage,
  },

});
const AppContainer= createAppContainer(AppNavigator);


export default class Search extends React.Component {
  render() {
    return (
        <AppContainer/>);
  }
}