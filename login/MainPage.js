import React, { Component,PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import PopoverTooltip from 'react-native-popover-tooltip';

import {Header, Icon} from 'react-native-elements';
import {createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer'
import MenuPage from './Menu';
import MapView, {Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import Boundary, {Events} from 'react-native-boundary';
import {
  PanGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';
import { Popupmenu } from './popup-menu';
import Sound from 'react-native-sound';
import MapPage from './MapPage';

var {height, width} = Dimensions.get('window'); 
let demoAudio = require('./sound/test.mp3');
const s = new Sound(demoAudio,(error) => {
  if (error) {
      console.log('failed');
      return;
  }
  console.log('start');
  console.log('duration in seconds: ' + s.getDuration() + 'number of channels: ' + s.getNumberOfChannels());
})
const ASPECT_RATIO = width / height;
const LATITUDE = 29.6463;  
const LONGITUDE = -82.3477;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MainPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selection: 'Map',
    };  
  }


    _makeselection= selection =>{
      if(selection=="OverView"){
        return <Popupmenu/>
      }
      else if(selection=="Map"){
        return(
          <MapPage/>
      )
      }
      else{
        return <View><Text style={{fontSize:20,color:'white'}}>Sites</Text></View>
      }
    }


    render() {
        return (
          <View style={styles.container}>
            <Header
              leftComponent={ <Icon name='bars' type='font-awesome' onPress={() => this.props.navigation.openDrawer()} color='white' containerStyle={{height:20}}/>}
              centerComponent={{ text: 'KLEIO', style: { color: 'white', height:20} }}
              rightComponent={
                <PopoverTooltip
                  ref='tooltip1'
                  buttonComponent={
                    <Icon name='ellipsis-v' type='font-awesome' color='white' containerStyle={{height:20, width:20}}/>
                  }
                  items={[
                    {
                      label: 'Overview',
                      onPress: () => {this.setState({selection:'OverView'})}
                    },
                    {
                      label: 'Map',
                      onPress: () => {this.setState({selection:'Map'})}
                    }
                  ]}
                  />
              }
              containerStyle={{height:50}}
              leftContainerStyle={{top:-15}}
              centerContainerStyle={{top:-15}}
              rightContainerStyle={{top:-15}}
              backgroundColor='darkorange'
            />
            {this._makeselection(this.state.selection)}
            
           </View>
          
        )};
}
const styles = StyleSheet.create({
    mapcontainer: {
      position: 'absolute',
      top: 50,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    button: {
      position: 'absolute',
      top: 20,
      padding: 10,
    },
    container: {
      flex: 1,
      backgroundColor: 'blue',
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

  const RootStack = createStackNavigator(
    {
      MainPage: MainPage,
      Popupmenu: Popupmenu,
      MapPage: MapPage
    },
    {
      initialRouteName: 'MainPage',
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
    },{
        drawerLockMode: 'locked-closed'
  });
  
  export default createAppContainer(AppNavigator);