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
  ImageBackground,
} from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-community/async-storage'
import {Icon,Overlay,Button} from 'react-native-elements';
import MapView, {Polyline,Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import Boundary, {Events} from 'react-native-boundary';
import {ScrollView} from 'react-native-gesture-handler';
import Sound from 'react-native-sound';
import {HeaderBackButton,  } from '@react-navigation/stack'
import PopupMenu from './components/PopupMenu'
import MusicPlayer from './components/MusicPlayer'

//Variable for drawing route on map

// let sound1 = require('./sound/1.mp3');
// let sound2 = require('./sound/2.mp3');
// let sound3 = require('./sound/3.mp3');
// let sound4 = require('./sound/4.mp3');
// let sound5 = require('./sound/5.mp3');//auditorium
// let sound6 = require('./sound/6.mp3');


const soundPath=[require('./sound/1.mp3'),require('./sound/2.mp3'),require('./sound/3.mp3'),require('./sound/4.mp3'),require('./sound/5.mp3'),require('./sound/6.mp3')]
const numbers = [0, 1, 2, 3, 4, 5];
const sounds = numbers.map((number) => 
    new Sound(soundPath[number],(error) => {
        if (error) {
            console.log('failed');
            return;
        }
        console.log('start');
        // console.log('duration in seconds: ' +  this.s.getDuration() + 'number of channels: ' +  this.s.getNumberOfChannels());
        }
    )
);


const waypoints = [ {latitude:29.6463, longitude:-82.3477},     //RU
                    //{latitude:29.6477, longitude:-82.3459},     //Help point on grass
                    {latitude:29.6481, longitude:-82.3437},     //Marston
                    {latitude:29.6489, longitude:-82.3441},     //Turlington
                    {latitude:29.6498, longitude:-82.3429},     //Plaza
                    {latitude:29.6500, longitude:-82.3462},     //Racquet
                    {latitude:29.6499, longitude:-82.3487}    //Griffin
                ];

const poiNames = ["RU", "Marston", "Turlington", "Plaza", "Racquet", "Griffin"];

const GOOGLE_MAPS_APIKEY = 'AIzaSyAwEASOqU1llLDKrblaktUWaec_zGuJnwU';

var {height, width} = Dimensions.get('window'); 
const ASPECT_RATIO = width / height;
const LATITUDE = 29.6482;  
const LONGITUDE = -82.3458;
const LATITUDE_DELTA = 0.010;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapPage extends Component {
    constructor(props) {
        super(props);
        this.props.navigation.setOptions({
            headerLeft: () => (
                <HeaderBackButton
                  onPress={() => {
                    this.props.navigation.navigate('Overview', {visited:this.state.visited})
                  }}
                  tintColor='white'
                />
            ),
            headerRight: () => (
                <Icon name='file-document-outline' type='material-community' color='white' underlayColor='darkorange' containerStyle={{padding:10}} onPress={()=>{this.props.navigation.navigate('Report',{ visited: this.state.visited });}}/>
            ),
          })
        var visited = Object.values(this.props.route.params.visited);
        console.log('mapParam: '+ visited[0])
        var visited1 = visited.map((item,index)=> parseInt(visited[index]))
        visited1[0]==1?console.log('visited1 is 1'):null
        visited1[1]==0?console.log('visited2 is 0'):console.log('visited2 not 0')
        // console.log('visited: '+ visited)
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
          index:1,
          visited:visited,
          current:-1,
          sound: sounds[0],
          currentPOI: "",
        };
        this.onPoiClick = this.onPoiClick.bind(this);
    }

    componentDidMount() {
        console.log("call componentDidMount!!!!!!!!");
        waypoints.map((marker,index) => (
            index += 1,
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
            var s=new Sound('file:/storage/emulated/0/Download/test.mp3',null,(error) => {
                if (error) {
                    console.log('failed');
                    return;
                }
            })
            setTimeout(() =>  {
            console.log(`Get out of my ${id}!!`);
            var ls=this.state.visited.map((item,index)=>
                (index+1).toString()==id?1:item
            );
            this.setState({current:parseInt(id,10)-1})
            this.setState({entergeo:true});
            this.setState({visited:ls})
            this.setState({currentPOI:poiNames[parseInt(id,10)-1]})
        
        
            this.setState({sound: s})
            
            }, 3000);
            console.log('sound: '+this.state.sound.getDuration())
            // Alert.alert('You have entered ' + poiNames[parseInt(id,10)-1])
        });
        
        Boundary.on(Events.EXIT, id => {
        // Prints 'Ya! You better get out of my Chipotle!!'
            console.log(`Ya! You better get out of my ${id}!!`);
            this.setState({entergeo:false});
        });
    }
    componentWillUnmount() {
        Boundary.off(Events.ENTER)
        Boundary.off(Events.EXIT)
        waypoints.map((marker,index) => (
            index += 1,
            console.log(index.toString()),
            Boundary.remove(index.toString())
            .then(() => console.log('Remove boundary on RU'))
            .catch(e => console.log('Failed to delete RU :)', e))
        ))


        // Remove the events
        
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
           style={this.state.current==-1?styles.mapInit:styles.map}
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
                    key={index}
                    coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                    //title={marker.title}
                    // description={marker.description}
                >
                    <View >
                        {
                        this.state.visited[index-1]==0? <ImageBackground    source={require('./image/Marker.png')} 
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

        {/* {this.state.poi!=null&&
            <PopupMenu name={this.state.poi && this.state.poi.name.replace(/\n/g, " ")}>
                <ScrollView >
                    <Text>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
                </ScrollView>
            </PopupMenu>
        } */}
        <View style={styles.note}>
            <Icon name='pencil-square-o' type='font-awesome' size={18} onPress={this.getData}/>
            {/* containerStyle={{position:'absolute', bottom:height*0.0005+50,right:width*0.0005}} */}
        </View>
        
        <Overlay isVisible={this.state.note} onBackdropPress={this.storeData} 
        overlayStyle={{width:width*0.8, height:height*0.65}}
        >
            <View style={{flex:1}}>
                <Text style={{flex:1,fontSize:23}}>Note</Text>
                <TextInput style={{flex:9,textAlignVertical: "top",backgroundColor:'lightgrey'}} multiline={true} value={this.state.noteContent} onChangeText={(value) => this.setState({noteContent:value})}/>
            </View>
        </Overlay>

        {this.state.current!=-1&&<MusicPlayer enter={this.state.entergeo} sound={this.state.sound} poiName={poiNames} current={this.state.current}/>}
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
    mapInit: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    speedup: {
        borderWidth:1,
        borderColor:'rgb(20,134,245)',
        borderRadius:10,
        height:25,
        width:40
    },
    note: {
        borderRadius:50, 
        backgroundColor:'white', 
        width:40,
        height:40,
        position:'absolute', 
        bottom:height*0.0005+55,
        right:width*0.01, 
        alignItems:'center',
        justifyContent:'center', 
        borderWidth:2,
        borderColor:'gray'
    }
});