import React, { Component,PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
} from 'react-native';
import PopoverTooltip from 'react-native-popover-tooltip';

import {Header, Icon} from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Overview from './Overview';
import Sound from 'react-native-sound';
import MapPage from './MapPage';
import MenuPage from './Menu';


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

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: 'Map',
    };  
  }


    _makeselection= selection =>{
      if(selection=="OverView"){
        return (<Overview/>)
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
                  delayLongPress={0}
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
      position:'absolute',
      top:0,
      height:height,
      width:width,
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

  const Stack = createStackNavigator();
  function MyStack() {
    return (
      <Stack.Navigator initialRouteName='MainPage' headerMode='none'>
        <Stack.Screen name="Home" component={MainPage} />
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen name="MapPage" component={MapPage} />
      </Stack.Navigator>
    );
  }
  const Drawer = createDrawerNavigator();
  function MyDrawer() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={MainPage} options={{gestureEnabled: true}}/>
      </Drawer.Navigator>
    );
  }
  export default class App extends React.Component {
    render() {
      return (
        <MyDrawer/>
        )
    }
  }