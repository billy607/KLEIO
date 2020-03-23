import React, {PureComponent } from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {Icon} from 'react-native-elements';
import MapView, {Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import Boundary, {Events} from 'react-native-boundary';
import {
  PanGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';
import Sound from 'react-native-sound';


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
const pullUpMenuHeight=100;
const ASPECT_RATIO = width / height;
const LATITUDE = 29.6463;  
const LONGITUDE = -82.3477;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapPage extends PureComponent {
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
          uparrow: true,
          audioState:'paused', //playing, paused
          audioSeconds:0,
          audioDuration:s.getDuration(),
        };
        this.sliderEditing = false;
        this.onPoiClick = this.onPoiClick.bind(this);
        this._translateY = new Animated.Value(0);
        this._translateY.setOffset(height-pullUpMenuHeight);///////////////////
        this._lastOffset = {y: height-pullUpMenuHeight };//////////////////////
        this._onGestureEvent = Animated.event(
        [
            {
            nativeEvent: {
                translationY: this._translateY
            },
            },
        ],
        { useNativeDriver: true }
        );
    }
    componentDidMount() {
        console.log("call componentDidMount!!!!!!!!");
        if(s.isLoaded && this.state.audioState == 'playing' && !this.sliderEditing){
            s.getCurrentTime((seconds, isPlaying) => {
                this.setState({audioSeconds:seconds});
            })
            console.log("in playing");
        }

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
    Playaudio=async()=>{
        if(s){
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
            //this.setState({audioState:'paused', audioSeconds:0});
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
    onSliderEditEnd = () => {
        this.sliderEditing = false;
    }
    onSliderEditing = value => {
        console.log("sliding!");
        console.log("audio was at "+this.state.audioSeconds);
        if(s){
            console.log("!!");
            s.setCurrentTime(value);
            this.setState({audioSeconds:value});
        }
        console.log("audio now at " + this.state.audioSeconds);
    }
    _onHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
          this._lastOffset.y += event.nativeEvent.translationY;
          if(event.nativeEvent.translationY>10) this._lastOffset.y=height-pullUpMenuHeight;///////////////////
          else if(event.nativeEvent.translationY<-10) this._lastOffset.y=50+StatusBar.currentHeight;
          if(this._lastOffset.y<height-pullUpMenuHeight) {///////////////////////
            this.setState({uparrow: false});
          }
          else this.setState({uparrow: true});
          this._translateY.setOffset(this._lastOffset.y);
          this._translateY.setValue(0);
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
            {this.state.poi && (
            <Marker 
              coordinate={this.state.poi.coordinate}
              title={"title"}
              description={"description"}
              onPress={()=>console.log('hello')}>
            </Marker>
            )}
        </MapView>
        <View style={{width:300,height:150,backgroundColor: 'white',opacity:0.7}}>
            
            <Slider
                style={{width: 300, height: 40}}
                onSlidingStart={this.onSliderEditStart}
                onSlidingComplete={this.onSliderEditEnd}
                onValueChange={this.onSliderEditing}
                value={this.state.audioSeconds} 
                maximumValue={this.state.audioDuration} 
                minimumValue={0} 
                maximumTrackTintColor='black' 
                minimumTrackTintColor='grey' 
            />
            <View style={{flex:1,flexDirection:'row'}}>
            <Icon name='backward' type='font-awesome' color='blue' containerStyle={{flex:1}}/> 
            {this.state.audioState=='playing'?
                <Icon name='pause' type='font-awesome' color='blue' onPress={this.pauseAudio} containerStyle={{flex:1}}/>:
                <Icon name='play' type='font-awesome' color='blue' onPress={this.Playaudio} containerStyle={{flex:1}}/>
            }
            <Icon name='forward' type='font-awesome' color='blue' containerStyle={{flex:1}}/>
            </View>
        </View>
        <View><Text></Text></View>
        <View style={{width:width}}>
        <PanGestureHandler onHandlerStateChange={this._onHandlerStateChange} onGestureEvent={this._onGestureEvent}>
        <Animated.View style={{
            position:'absolute', 
            bottom: 0, 
            width:width, 
            height:height,
            backgroundColor:'white',
            borderTopLeftRadius: this._translateY.interpolate({
            inputRange:[0,height-50],
            outputRange:[0,20],
            extrapolate: 'clamp'
            }),
            borderTopRightRadius: this._translateY.interpolate({
            inputRange:[0,height-50],
            outputRange:[0,20],
            extrapolate: 'clamp'
            }),
            opacity: this.state.poi? 1:0,
            transform: [{translateY: this._translateY.interpolate({
            inputRange:[0,height-50],
            outputRange:[0,height-50],
            extrapolate: 'clamp'
            })}]}} >
            <View style={{height:50}}>
            {this.state.uparrow? 
                <Icon name='chevron-up' type='font-awesome' color='gray' containerStyle={{flex: 1, alignItems: 'center'}} />:
                <Icon name='chevron-down' type='font-awesome' color='gray' containerStyle={{flex: 1, alignItems: 'center'}}/>
            } 
            <View style={{top:0, flexDirection:'row'}}>
                <Text>{this.state.poi && this.state.poi.name.replace(/\n/g, " ")}</Text> 
                
                {/* <Icon name='stop' type='font-awesome' color='blue' onPress={this.Stopaudio}/> */}
            </View>
            </View>
            <ScrollView >
            <Text>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text> 
            </ScrollView>
        </Animated.View>
        </PanGestureHandler>
        </View>
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
});