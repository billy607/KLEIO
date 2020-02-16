import React, { Component,PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import PopoverTooltip from 'react-native-popover-tooltip';

import {Header, Icon} from 'react-native-elements';
import {createAppContainer } from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'
import MenuPage from './Menu';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const image = require('./image/menu.png');
var {height, width} = Dimensions.get('window'); 


class MainPage extends PureComponent {
    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        header: null,
    };
    constructor(props) {
      super(props);
      this.state = { selection: 'OverView' };
    }
    
    _makeselection(selection){
      if(selection=="OverView"){
        return <View><Text style={{fontSize:20,color:'white'}}>OverView</Text></View>
      }
      else if(selection=="Map"){
        return(
        <View style={styles.mapcontainer}>
        <MapView
           provider={PROVIDER_GOOGLE} // remove if not using Google Maps
           style={styles.map}
           region={{
             latitude: 37.78825,
             longitude: -122.4324,
             latitudeDelta: 0.015,
             longitudeDelta: 0.0121,
           }}
         >
         </MapView>
       </View>)
      }
      else{
        return <View><Text style={{fontSize:20,color:'white'}}>Sites</Text></View>
      }
    }
    render() {
        return (
          // <MenuProvider>
          <View style={styles.container}>
            <Header
              leftComponent={ <Icon name='bars' type='font-awesome' onPress={() => this.props.navigation.openDrawer()} color='white'/>}
              centerComponent={{ text: 'KLEIO', style: { color: 'white' } }}
              rightComponent={
                <PopoverTooltip
                  ref='tooltip1'
                  buttonComponent={
                    <Icon name='ellipsis-v' type='font-awesome' color='white'/>
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
              containerStyle={{height:height*0.1}}
              rightContainerStyle={{padding:10}}
              backgroundColor='darkorange'
            />
            {this._makeselection(this.state.selection)}
            
           </View>
          //  </MenuProvider>
          
        )};
}
const styles = StyleSheet.create({
    mapcontainer: {
      position: 'absolute',
      top: height*0.1,
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
      bottom: 0,
    },
    button: {
      position: 'absolute',
      top: 20,
      padding: 10,
    },
    container: {
      flex: 1,
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