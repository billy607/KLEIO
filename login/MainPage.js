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
import Boundary, {Events} from 'react-native-boundary';

const image = require('./image/menu.png');
var {height, width} = Dimensions.get('window'); 


<<<<<<< HEAD
class MainPage extends PureComponent {
=======
class MainPage extends Component {
  componentDidMount() {
    Boundary.add({
      lat: 29.6463,
      lng: -82.3477,
      radius: 100, // in meters
      id: "Reitz Union",
    })
      .then(() => console.log("success!"))
      .catch(e => console.error("error :(", e));
   
    Boundary.on(Events.ENTER, id => {
      // Prints 'Get out of my Chipotle!!'
      console.log(`Get out of my ${id}!!`);
    });
    
    Boundary.on(Events.EXIT, id => {
      // Prints 'Ya! You better get out of my Chipotle!!'
      console.log(`Ya! You better get out of my ${id}!!`)
    });
      // .then(() => console.log("exit function fired!"))
      // .catch(e => console.error("error on exit :(", e))
  }

  componentWillUnmount() {
    // Remove the events
    Boundary.off(Events.ENTER)
    Boundary.off(Events.EXIT)

    // Remove the boundary from native API´s
    Boundary.remove('Reitz Union')
      .then(() => console.log('Remove boundary on RU'))
      .catch(e => console.log('Failed to delete RU :)', e))
  }

  onPoiClick(e) {
    const poi = e.nativeEvent;
    console.log(poi.name);
  }
>>>>>>> 28aefd0739418ae291d28e07211a1b4e7c60e9ed
    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        header: null,
    };
    constructor(props) {
      super(props);
      this.state = { selection: 'OverView' };
    }
<<<<<<< HEAD
    
    _makeselection(selection){
=======


    makeselection(selection){
>>>>>>> 28aefd0739418ae291d28e07211a1b4e7c60e9ed
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
             latitude: 29.6463,  
             longitude: -82.3477,
             latitudeDelta: 0.020,
             longitudeDelta: 0.020,
           }}
           showsUserLocation={true}
           onPoiClick={this.onPoiClick}
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