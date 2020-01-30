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
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import {ButtonGroup,Header,Button, Icon} from 'react-native-elements';
import {createAppContainer } from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'
import MenuPage from './Menu';

const image = require('./image/menu.png');
var {height, width} = Dimensions.get('window'); 


class MainPage extends Component {
    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        header: null,
    };
    constructor(props) {
      super(props);
      this.state = { selection: 'welcome, please make selection' };
    }
    render() {
        return (
          <MenuProvider>
          <View style={styles.container}>
            <Header
              leftComponent={ <Icon name='bars' type='font-awesome' onPress={() => this.props.navigation.openDrawer()} color='white'/>}
              centerComponent={{ text: 'KLEIO', style: { color: 'white' } }}
              rightComponent={
              <Menu>
              <MenuTrigger><Icon name='ellipsis-v' type='font-awesome' color='white'/></MenuTrigger>
                <MenuOptions>
                  <MenuOption onSelect={() => this.setState({selection:'OverView'})} text='OverView' />
                  <MenuOption onSelect={() => this.setState({selection:'Map'})} text='Map'/>
                  <MenuOption onSelect={() => this.setState({selection:'Sites'})} text='Sites' />
                </MenuOptions>
              </Menu>
              }
              rightContainerStyle={{padding:10}}
              backgroundColor='darkorange'
            />
            <View style={styles.container}>
            <Text style={{color:'white', fontSize: 20}}>{this.state.selection}</Text>
            </View>
            
          </View>
          </MenuProvider>
          
        )};
}
const styles = StyleSheet.create({
    button: {
      position: 'absolute',
      top: 20,
      padding: 10,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'darkorange',
    },
    main: {
      flex: 9,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'darkorange',
    },
    buttongroup:{
      position: 'absolute',
      height: 50,
      width: width,
      bottom: -5,
    },

  });

  const AppNavigator = createDrawerNavigator({
    Home: {
      screen: MainPage,
    },
    Settings: {
      screen: MenuPage,
    },

  });
  
  export default createAppContainer(AppNavigator);