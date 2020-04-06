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
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
      <View style={styles.maincontainer}>
        <Header
          leftComponent={ <Icon name='bars' type='font-awesome' onPress={() => this.props.navigation.openDrawer()} color='white'/>}
          centerComponent={{ text: 'KLEIO', style: { color: 'white' } }}
          backgroundColor='darkorange'
          containerStyle={{shadowColor:'transparent', height: 50}}
          leftContainerStyle={{top:-15}}
          centerContainerStyle={{top:-15}}
          rightContainerStyle={{top:-15}}
        />
      
        <View style={styles.container}>
          <SearchBar
            placeholder="Explore"
            onChangeText={this.updateSearch}
            value={search}
            inputContainerStyle={{backgroundColor: 'white'}}
            containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5,}}
            leftIconContainerStyle={{backgroundColor:'white'}}
          />
          <Icon
            raised
            name='crosshairs'
            type='font-awesome'
            color='#f50'
            onPress={() => {
              this.props.navigation.navigate('MainPage');
            }}
            containerStyle={styles.iconcontainer}/>
        <SafeAreaView style={styles.SafeAreaView}>
          <ScrollView style={styles.ScrollView}>
            <View style={{padding:5}}>
            {
              list.map((l, i) => (
                <ListItem
                  key={i}
                  title={l.name}
                  bottomDivider
                />
              ))
            }
            </View>
          </ScrollView>
        </SafeAreaView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  maincontainer:{
    backgroundColor:'darkorange', 
    position:'absolute',
    top:0,
    height:height,
    width:width
  },
  iconcontainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkorange',
    paddingBottom:height*0.05,
    paddingTop:height*0.05
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'darkorange',
    padding: 0.1*width,
  },
  SafeAreaView: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: 'darkorange',
  },
  ScrollView: {
    borderRadius: 10,
    width:width*0.8,
    backgroundColor: 'white',
  },
});
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator initialRouteName='HomeScreen' headerMode='none'>
      <Stack.Screen name="Home" component={MyDrawer} />
      <Stack.Screen name="MainPage" component={MainPage} />
    </Stack.Navigator>
  );
}
const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator >
      <Drawer.Screen name="Home" component={SearchPage}/>
      <Drawer.Screen name="Setting" component={MenuPage} />
    </Drawer.Navigator>
  );
}
export default class Search extends React.Component {
  render() {
    return (
      <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
      )
  }
}