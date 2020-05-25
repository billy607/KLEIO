import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TextInput,
  Alert
} from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-community/async-storage'
import {Icon,Overlay} from 'react-native-elements';
import MapView, {Polyline,Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import Boundary, {Events} from 'react-native-boundary';
import {
  ScrollView,
} from 'react-native-gesture-handler';
import Sound from 'react-native-sound';
import MapViewDirections from 'react-native-maps-directions';
import PopupMenu from './components/PopupMenu'


//Variable for drawing route on map


const waypoint1 = {latitude: 29.6450, longitude:  -82.3395};

const origin1 = {latitude: 29.6526, longitude: -82.3386};
const origin = {latitude: 29.6480,  longitude: -82.3439};
const destination = {latitude: 29.6463, longitude: -82.3477};
const GOOGLE_MAPS_APIKEY = 'AIzaSyAwEASOqU1llLDKrblaktUWaec_zGuJnwU';

var {height, width} = Dimensions.get('window'); 
let demoAudio = require('./sound/test.mp3');
const s = new Sound(demoAudio,(error) => {
  if (error) {
      console.log('failed');
      return;
  }
  console.log('start');
//   console.log('duration in seconds: ' + s.getDuration() + 'number of channels: ' + s.getNumberOfChannels());
})
const ASPECT_RATIO = width / height;
const LATITUDE = 29.6463;  
const LONGITUDE = -82.3477;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
          audioState:'paused', //playing, paused
          audioSeconds: 0,
          audioDuration: s.getDuration(),
          audioSpeed: 1,
          entergeo: false,
          note:false,
          noteContent:null
        };
        this.sliderEditing = false;
        this.onPoiClick = this.onPoiClick.bind(this);
    }
    componentDidMount() {
        console.log("call componentDidMount!!!!!!!!");
        this.timeout = setInterval(() => {
            if(this.state.audioState == 'playing' && !this.sliderEditing){
                s.getCurrentTime((seconds) => {
                    this.setState({audioSeconds:seconds});
                })
            }
        }, 100);
        Boundary.add({
            lat: 29.6513, 
            lng: -82.3402,
            radius: 20, // in meters
            id: "Bryan Hall",
        })
        .then(() => console.log("success1!"))
        .catch(e => console.error("error :(", e));

        Boundary.add(
            {
                lat: 29.6508, 
                lng: -82.3401,
                radius: 20, // in meters
                id: "Gerson Hall",
            })
            .then(() => console.log("success2!"))
            .catch(e => console.error("error :(", e));

        Boundary.add(
        {
            lat: 29.6463,
            lng: -82.3477,
            radius: 100, // in meters
            id: "Reitz Union",
        })
        .then(() => console.log("success3!"))
        .catch(e => console.error("error :(", e));

    
        Boundary.on(Events.ENTER, id => {
        // Prints 'Get out of my Chipotle!!'
            console.log(`Get out of my ${id}!!`);
            this.setState({entergeo:true});
            this.Playaudio("onEnter "+ id);/////////////////////////////////////////////////////////////////////
            Alert.alert(`You have entered ${id}`)
        });
        
        Boundary.on(Events.EXIT, id => {
        // Prints 'Ya! You better get out of my Chipotle!!'
            console.log(`Ya! You better get out of my ${id}!!`);
            this.setState({entergeo:false});
            this.pauseAudio();
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
    Playaudio=async(param)=>{
        console.log(param)
        if(s){
            console.log('playing')
            console.log(this.state.audioDuration);
            s.play(this.playComplete);
            this.setState({audioState: 'playing'});   
        }else{
            console.log("audio loaded failed");
        }
    }
    playComplete = (success) => {
        if(s){
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
                Alert.alert('Notice', 'audio file error. (Error code : 2)');
            }
            this.setState({audioState:'paused', audioSeconds:0});
            s.setCurrentTime(0);
        }
    }
    Stopaudio=()=>{
        s.stop();
    }
    pauseAudio=()=>{
        if(s){
            s.pause();
        }
        this.setState({audioState:'pause'});
    }
    onSliderEditStart = () => {
        this.sliderEditing = true;
    }
    onSliderEditEnd = (value) => {
        this.sliderEditing = false;
        if(s){
            s.setCurrentTime(value);
            this.setState({audioSeconds:value});
        }
    }
    jumpPrevSeconds = () => {this.jumpSeconds(-5);}
    jumpNextSeconds = () => {this.jumpSeconds(5);}
    jumpSeconds = (secsDelta) => {
        if(s){
            s.getCurrentTime((secs) => {
                let nextSecs = secs + secsDelta;
                if(nextSecs < 0) nextSecs = 0;
                else if(nextSecs > this.state.audioDuration) nextSecs = this.state.audioDuration;
                s.setCurrentTime(nextSecs);
                this.setState({audioSeconds:nextSecs});
            })
        }
    }

    speedUp = () =>{
        var speed = this.state.audioSpeed
        if(speed>=2){
            speed = 1;
        }else{
            speed = speed + 0.5;
        }
        console.log(speed);
        s.setSpeed(speed);
        if(!s.isPlaying()) s.pause();
        this.setState({audioSpeed: speed});
    }
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
            <Polyline
                coordinates={[
                    origin1,
                    waypoint1,
                    destination
                ]}
                strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                
                strokeWidth={6}
            />

            <MapViewDirections
                origin={origin1}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                mode={"WALKING"}
                strokeWidth={3}
                strokeColor="hotpink"
            />
            {this.state.poi && (
            <Marker 
              coordinate={this.state.poi.coordinate}
              title={"title"}
              description={"description"}
              onPress={()=>console.log('hello')}>
            </Marker>
            )}
        </MapView>
        
        
        <View style={{width:width*0.8,height:height*0.2,backgroundColor: 'white',opacity:this.state.entergeo==true?0.7:0}}>
            <Slider
                style={{width: width*0.8, height: 40}}
                onSlidingStart={this.onSliderEditStart}
                onSlidingComplete={this.onSliderEditEnd}
                // onValueChange={this.onSliderEditing} 
                value={this.state.audioSeconds}
                maximumValue={this.state.audioDuration} 
                minimumValue={0} 
                maximumTrackTintColor='black' 
                minimumTrackTintColor='grey' 
                thumbTintColor= 'rgb(20,134,245)'
            />
            <View style={{flex:1,flexDirection:'row'}}>
            <Icon name='backward' type='font-awesome' color='rgb(20,134,245)' containerStyle={{flex:1}} onPress={this.jumpPrevSeconds}/> 
            
            {this.state.audioState=='playing'?
                <Icon name='pause' type='font-awesome' color='rgb(20,134,245)' onPress={this.pauseAudio} containerStyle={{flex:1}}/>:
                <Icon name='play' type='font-awesome' color='rgb(20,134,245)' onPress={()=>this.Playaudio("press play button")} containerStyle={{flex:1}}/>
            }

            <Icon name='forward' type='font-awesome' color='rgb(20,134,245)' containerStyle={{flex:1}} onPress={this.jumpNextSeconds}/>

        <View style={{paddingRight:10}}><View style={styles.speedup}><Text style={{textAlign:'center',fontWeight: 'bold'}} onPress={this.speedUp}>x{this.state.audioSpeed}</Text></View></View>
            </View>
        </View>
        
        <View style={{width:width}}>
            
            {this.state.poi!=null&&
                <PopupMenu name={this.state.poi && this.state.poi.name.replace(/\n/g, " ")}>
                    <ScrollView >
                        <Text>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
                    </ScrollView>
                </PopupMenu>
            }
        </View>

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
    speedup: {
        borderWidth:1,
        borderColor:'rgb(20,134,245)',
        borderRadius:10,
        height:25,
        width:40
    },
});