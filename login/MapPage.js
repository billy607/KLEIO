import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-community/async-storage'
import {Icon,Overlay} from 'react-native-elements';
import MapView, {Polyline,Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import Boundary, {Events} from 'react-native-boundary';
import {ScrollView} from 'react-native-gesture-handler';
import Sound from 'react-native-sound';
import MapViewDirections from 'react-native-maps-directions';
import PopupMenu from './components/PopupMenu'
import MusicPlayer from './components/MiniMusicPlayer'
import FullMusicPlayer from './FullMusicPlayer';


//Variable for drawing route on map


const waypoints = [ {latitude:29.6463, longitude:-82.3477},     //RU
                    //{latitude:29.6477, longitude:-82.3459},     //Help point on grass
                    {latitude:29.6481, longitude:-82.3437},     //Marston
                    {latitude:29.6489, longitude:-82.3441},     //Turlington
                    {latitude:29.6498, longitude:-82.3429},     //Plaza
                    {latitude:29.6500, longitude:-82.3462},     //Racquet
                    {latitude:29.6499, longitude:-82.3487}    //Griffin
                ];


const origin1 = {latitude: 29.6463,  longitude: -82.3477};
const origin = {latitude: 29.6480,  longitude: -82.3439};
const destination = {latitude: 29.6499,  longitude: -82.3487};
const GOOGLE_MAPS_APIKEY = 'AIzaSyAwEASOqU1llLDKrblaktUWaec_zGuJnwU';

var {height, width} = Dimensions.get('window'); 
const ASPECT_RATIO = width / height;
const LATITUDE = 29.6482;  
const LONGITUDE = -82.3458;
const LATITUDE_DELTA = 0.010;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// let demoAudio = require('./sound/test.mp3');
// const s = new Sound(demoAudio,(error) => {
//   if (error) {
//       console.log('failed');
//       return;
//   }
//   console.log('start');
//   console.log('duration in seconds: ' + s.getDuration() + 'number of channels: ' + s.getNumberOfChannels());
// })

export default class MapPage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          destination: {
                  latitude: LATITUDE,
                  longitude: LONGITUDE,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                },
          poi: null,
          entergeo: false,
          note:false,
          noteContent:null,
          maxindex:0,
          index:1,
        };
        // this.sliderEditing = false;
        this.onPoiClick = this.onPoiClick.bind(this);
    }
    componentDidMount() {
        console.log("call componentDidMount!!!!!!!!");
        // Boundary.add({
        //     lat: 29.6513, 
        //     lng: -82.3402,
        //     radius: 20, // in meters
        //     id: "Bryan Hall",
        // })
        // .then(() => console.log("success1!"))
        // .catch(e => console.error("error :(", e));

        // Boundary.add(
        //     {
        //         lat: 29.6508, 
        //         lng: -82.3401,
        //         radius: 100, // in meters
        //         id: "abc",
        //     })
        //     .then(() => console.log("success2!"))
        //     .catch(e => console.error("error :(", e));

        // Boundary.add(
        // {
        //     lat: 29.6463,
        //     lng: -82.3477,
        //     radius: 100, // in meters
        //     id: "Reitz Union",
        // })
        // .then(() => console.log("success3!"))
        // .catch(e => console.error("error :(", e));
        waypoints.map((marker,index) => (
            index += 1,
            this.setState({maxindex:index}),
            console.log(index.toString()),
            Boundary.add(
                {
                    lat: marker.latitude,
                    lng: marker.longitude,
                    radius: 50, // in meters
                    id: index.toString(),
                })
                .then(() => console.log("success!"))
                .catch(e => console.error("error :(", e))
        ))

        Boundary.on(Events.ENTER, id => {
        // Prints 'Get out of my Chipotle!!'
            console.log(`Get out of my ${id}!!`);
            this.setState({entergeo:true});
            // this.Playaudio("onEnter "+ id);/////////////////////////////////////////////////////////////////////
            Alert.alert(`You have entered ${id}`)
        });
        
        Boundary.on(Events.EXIT, id => {
        // Prints 'Ya! You better get out of my Chipotle!!'
            console.log(`Ya! You better get out of my ${id}!!`);
            this.setState({entergeo:false});
            this.setState({index:(parseInt(id)+1)});
            console.log("h"+parseInt(id))
            console.log("hhh"+this.state.index)
            // this.pauseAudio();
        });
    }
    componentWillUnmount() {
        // Remove the events
        // Boundary.off(Events.ENTER)
        // Boundary.off(Events.EXIT)
        // s.stop()
    
        // // Remove the boundary from native API´s
        // Boundary.remove('Reitz Union')
        //   .then(() => console.log('Remove boundary on RU'))
        //   .catch(e => console.log('Failed to delete RU :)', e))
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
    onScreenClick= (e) => {
        const loc = e.nativeEvent;
        this.setState({
          destination: {
            latitude: loc.coordinate.latitude,
            longitude: loc.coordinate.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          poi:null,
        });
    }
    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        header: null,
    };
    storeData = async () => {
        try {
            console.log('store')
          this.setState({note:false})
          await AsyncStorage.setItem('@storage_Key', this.state.noteContent)
        } catch (e) {
          console.log(e)
        }
    };
    getData = async () => {
        this.setState({note:true})
        try {
          console.log('get')
          const value = await AsyncStorage.getItem('@storage_Key')
          if(value !== null) {
            this.setState({noteContent:value})
          }
        } catch(e) {
            console.log(e)
        }
    };
    render() {
        return (
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
           onPress={this.onScreenClick}
        >
            {/* <Polyline
                coordinates={[
                    origin1,
                    waypoint1,
                    destination
                ]}
                strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                
                strokeWidth={6}
            /> */}

            <MapViewDirections
                origin={origin1}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                waypoints={waypoints}
                mode={"WALKING"}
                optimizeWaypoints={true}
                precision="high"
                strokeWidth={10}
                strokeColor="deepskyblue"
                lineDashPattern = {[15,15]}
            />
            {this.state.poi && (
            <Marker 
              coordinate={this.state.poi.coordinate}
              title={"title"}
              description={"description"}
              onPress={()=>console.log('hello')}>
            </Marker>
            )}
            
            {
            waypoints.map((marker,index) => (
                // console.log(index),
                // console.log("\n"),
                
                index += 1,
                <Marker
                    coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                    //title={marker.title}
                    // description={marker.description}
                >
                    <View >
                        {index!=this.state.index? <ImageBackground    source={require('./image/Marker.png')} 
                                            style={{resizeMode: "contain", 
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: 17.5, 
                                            height: 29,
                                            opacity:0.5}}>
                            <Text style={{fontSize:12}}>{index}</Text>
                        </ImageBackground>
                        :<ImageBackground    source={require('./image/Marker.png')} 
                                            style={{resizeMode: "contain", 
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: 17.5, 
                                            height: 29,}}>
                            <Text style={{fontSize:12}}>{index}</Text>
                        </ImageBackground>}
                    </View>
                </Marker>
            ))}

        </MapView>

        {/* {this.state.entergeo==true&& */}
        
        {/* }    */}
        {this.state.poi!=null&&
            <PopupMenu name={this.state.poi && this.state.poi.name.replace(/\n/g, " ")}>
                <ScrollView >
                    <Text>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
                </ScrollView>
            </PopupMenu>
        }
        <TouchableOpacity activeOpacity={0.8} style={{position:'absolute', bottom:0}} onPress={()=>{this.props.navigation.navigate('FullMusicPlayer');}}>
            <MusicPlayer/>
        </TouchableOpacity>
        
        <Icon name='pencil-square-o' type='font-awesome' raised={true} size={18} onPress={this.getData} containerStyle={{position:'absolute', top:height*0.0005,right:width*0.0005}}/>
        
        <Overlay isVisible={this.state.note} onBackdropPress={this.storeData} 
        overlayStyle={{width:width*0.8, height:height*0.65}}
        >
            <View style={{flex:1}}>
                <Text style={{flex:1,fontSize:23}}>Note</Text>
                <TextInput style={{flex:9,textAlignVertical: "top",backgroundColor:'lightgrey'}} multiline={true} value={this.state.noteContent} onChangeText={(value) => this.setState({noteContent:value})}/>
            </View>
        </Overlay>
       </View>
    )};
}

const styles = StyleSheet.create({
    mapcontainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 50
    },
    speedup: {
        borderWidth:1,
        borderColor:'rgb(20,134,245)',
        borderRadius:10,
        height:25,
        width:40
    },
});