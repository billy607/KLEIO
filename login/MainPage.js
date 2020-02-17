import React, { Component,PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Modal,
  Alert,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import PopoverTooltip from 'react-native-popover-tooltip';

import {Header, Icon, Tooltip, Button} from 'react-native-elements';
import {createAppContainer } from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'
import MenuPage from './Menu';
import MapView, { Callout, Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import Boundary, {Events} from 'react-native-boundary';
import { PanGestureHandler, State } from 'react-native-gesture-handler'


const image = require('./image/menu.png');
var {height, width} = Dimensions.get('window'); 
const circleRadius = 30;

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
      destination: {
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            },
      poi: null,
      modalVisible: false,
    };
    this.onPoiClick = this.onPoiClick.bind(this);
  }

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

    this.setState({
      destination: {
                latitude: poi.coordinate.latitude,
                longitude: poi.coordinate.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              },
       poi:poi,
     });
  }
    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        header: null,
    };
    
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
           initialRegion={{
             latitude: LATITUDE,  
             longitude: LONGITUDE,
             latitudeDelta: LATITUDE_DELTA,
             longitudeDelta: LONGITUDE_DELTA,
           }}
           showsUserLocation={true}
           onPoiClick={this.onPoiClick}
         >
           {this.state.poi && (
            <Marker 
              coordinate={this.state.poi.coordinate}
              title={"title"}
              description={"description"}
              onPress={()=>console.log('hello')}>
            </Marker>
          )}
         </MapView>
         <View style={{
            position:'absolute', 
            bottom: 0, 
            width:width, 
            backgroundColor:'white',
            opacity: this.state.poi?100:0,
            flexDirection:'row'}} >
           <Text style={{left:0}}>{this.state.poi && this.state.poi.name}</Text>
           <Text style={{position:'absolute', right:0, color:'blue'}} 
              onPress={() => {
                this.setModalVisible(true)}}> more details>> </Text>
        </View>
         <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              >
              <View style={{
                  justifyContent: 'center',
                  backgroundColor: 'darkorange',
                  height:height*0.1,
                  top:0
                  }}>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
              <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  backgroundColor: 'rgba(255,255,255, 0.8)'}}>
                <View style={{
                    position:'absolute',
                    top:0, }}>
                  <Text>If your app relies on multi touch pan handling this section provides some information how the default behavior differs between the platform and how (if necessary) it can be unified.

The difference in multi touch pan handling lies in the way how translation properties during the event are being calculated. On iOS the default behavior when more than one figer is placed on the screen is to treat this situation as if only one pointer was placed in the center of mass (average position of all the pointers). This applies also to many platform native components that handle touch even if not primarily interested in multi touch interactions like for example UIScrollView component.

The default behavior for native components like scroll view, pager views or drawers is different and hence gesture handler defaults to that when it comes to pan handling. The difference is that instead of treating the center of mass of all the fingers placed as a leading pointer it takes the latest placed finger as such. This behavior can be changed on Android using avgTouches flag.

Note that on both Android and iOS when the additional finger is placed on the screen that translation prop is not affected even though the position of the pointer being tracked might have changed. Therefore it is safe to rely on translation most of the time as it only reflects the movement that happens regardless of how many fingers are placed on the screen and if that number changes over time. If you wish to track the "center of mass" virtual pointer and account for its changes when the number of finger changes you can use relative or absolute position provided in the event (x and y or absoluteX and absoluteY).If your app relies on multi touch pan handling this section provides some information how the default behavior differs between the platform and how (if necessary) it can be unified.

The difference in multi touch pan handling lies in the way how translation properties during the event are being calculated. On iOS the default behavior when more than one figer is placed on the screen is to treat this situation as if only one pointer was placed in the center of mass (average position of all the pointers). This applies also to many platform native components that handle touch even if not primarily interested in multi touch interactions like for example UIScrollView component.

The default behavior for native components like scroll view, pager views or drawers is different and hence gesture handler defaults to that when it comes to pan handling. The difference is that instead of treating the center of mass of all the fingers placed as a leading pointer it takes the latest placed finger as such. This behavior can be changed on Android using avgTouches flag.

Note that on both Android and iOS when the additional finger is placed on the screen that translation prop is not affected even though the position of the pointer being tracked might have changed. Therefore it is safe to rely on translation most of the time as it only reflects the movement that happens regardless of how many fingers are placed on the screen and if that number changes over time. If you wish to track the "center of mass" virtual pointer and account for its changes when the number of finger changes you can use relative or absolute position provided in the event (x and y or absoluteX and absoluteY).</Text>

                  
                </View>
              </View>
            </Modal>
            
            {/* <TouchableHighlight
              style={{width:150}}>
              <Button title='show info' onPress={() => {
                this.setModalVisible(true);
              }}></Button>
            </TouchableHighlight> */}
       </View>)
      }
      else{
        return <View><Text style={{fontSize:20,color:'white'}}>Sites</Text></View>
      }
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

    //_touchX = new Animated.Value(width / 2 - circleRadius);
    //_onPanGestureEvent = Animated.event([{nativeEvent: {x: this._touchX}}], { useNativeDriver: true });
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
                    <Icon name='ellipsis-v' type='font-awesome' color='white' containerStyle={{width:20}}/>
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
            {/* <PanGestureHandler
              onGestureEvent={this._onPanGestureEvent}>
              <Animated.View style={{
                height: 150,
                justifyContent: 'center',
              }}>
                <Animated.View
                  style={[{
                      backgroundColor: '#42a5f5', borderRadius: circleRadius, height: circleRadius * 2, width: circleRadius * 2,
                    }, {
                      transform: [{translateX: Animated.add(this._touchX, new Animated.Value(-circleRadius))}]
                    }]}
                />
              </Animated.View>
            </PanGestureHandler> */}
            
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