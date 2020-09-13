import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    Dimensions,
    TouchableOpacity
  } from 'react-native';
import Slider from '@react-native-community/slider';
import {Icon} from 'react-native-elements';
import Sound from 'react-native-sound';

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
export default class FullMusicPlayer extends Component {
    constructor(props) {
        super(props);
        this.s=s;
        this.state = {
          audioState:'paused', //playing, paused
          audioSeconds: 0,
          audioDuration: s.getDuration(),
          audioSpeed: 1,
          note:false,
          noteContent:null
        };
        this.sliderEditing = false;
    }
    componentDidMount() {
        console.log("audioState:"+this.state.audioState);
        this.timeout = setInterval(() => {
            if(this.state.audioState == 'playing' && !this.sliderEditing){
                this.s.getCurrentTime((seconds) => {
                    this.setState({audioSeconds:seconds});
                })
            }
        }, 100);
    }
    Playaudio=async(param)=>{
        console.log(param)
        if(this.s){
            console.log('playing')
            console.log(this.state.audioDuration);
            this.s.play(this.playComplete);
            this.setState({audioState: 'playing'});   
        }else{
            console.log("audio loaded failed");
        }
    }
    playComplete = (success) => {
        if(this.s){
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
                Alert.alert('Notice', 'audio file error. (Error code : 2)');
            }
            this.setState({audioState:'paused', audioSeconds:0});
            this.s.setCurrentTime(0);
        }
    }
    Stopaudio=()=>{
        this.s.stop();
    }
    pauseAudio=()=>{
        if(this.s){
            this.s.pause();
        }
        this.setState({audioState:'pause'});
    }
    onSliderEditStart = () => {
        this.sliderEditing = true;
    }
    onSliderEditEnd = (value) => {
        this.sliderEditing = false;
        if(this.s){
            this.s.setCurrentTime(value);
            this.setState({audioSeconds:value});
        }
    }
    jumpPrevSeconds = () => {this.jumpSeconds(-10);}
    jumpNextSeconds = () => {this.jumpSeconds(10);}
    jumpSeconds = (secsDelta) => {
        if(this.s){
            this.s.getCurrentTime((secs) => {
                let nextSecs = secs + secsDelta;
                if(nextSecs < 0) nextSecs = 0;
                else if(nextSecs > this.state.audioDuration) nextSecs = this.state.audioDuration;
                this.s.setCurrentTime(nextSecs);
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
        this.s.setSpeed(speed);
        if(!this.s.isPlaying()) this.s.pause();
        this.setState({audioSpeed: speed});
    }


    render() {
        return (
        <View style={{backgroundColor:'darkorange',height:height,width:width}}>
            <View style={{flex:1,paddingHorizontal:width*0.05,paddingVertical:width*0.05}}>
                <View style={{flexDirection:'row', flex:1}}>
                    <View style={{flex:2,alignItems:'flex-start'}}>
                        <Icon name='chevron-down-circle-outline' type='material-community' color='white' underlayColor='darkorange' size={35} onPress={()=>{this.props.navigation.goBack()}}/>
                    </View>    
                    <View style={{flex:8}}>
                        <View style={{flex:1}}/>
                        <Image source={require('./image/Alachua_sculpture.jpg')} style={{flex:1.5, width:undefined, height:undefined}} resizeMode='stretch'/>
                        <Text style={{flex:1, textAlign:'center', textAlignVertical:'center', fontSize:18, fontFamily:'monospace'}}>Alachua sculpture</Text>
                    </View>
                    <View style={{flex:2}}/>
                </View>
                <Slider
                    // style={{width: width, height: height*0.05,}}
                    onSlidingStart={this.onSliderEditStart}
                    onSlidingComplete={this.onSliderEditEnd}
                    // onValueChange={this.onSliderEditing} 
                    value={this.state.audioSeconds}
                    maximumValue={this.state.audioDuration} 
                    minimumValue={0} 
                    maximumTrackTintColor='black' 
                    minimumTrackTintColor='grey' 
                    thumbTintColor= 'white'
                />
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{flex:1}}/>
                    <Icon name='replay-10' type='material' color='white' size={40} containerStyle={{flex:1}} onPress={this.jumpPrevSeconds}/> 
                    {this.state.audioState=='playing'?
                        <Icon name='pause-circle' type='font-awesome' color='white' size={60} onPress={this.pauseAudio} containerStyle={{flex:1}}/>:
                        <Icon name='play-circle' type='font-awesome' color='steelblue' size={60} onPress={()=>this.Playaudio("press play button")} containerStyle={{flex:1}}/>
                    }
                    <Icon name='forward-10' type='material' color='white' size={40} containerStyle={{flex:1}} onPress={this.jumpNextSeconds}/>
                    <View style={{flex:1, alignItems:'center'}}>
                        <View style={styles.speedup}><Text style={{textAlign:'center',fontWeight: 'bold'}} onPress={this.speedUp}>x{this.state.audioSpeed}</Text></View>
                    </View>
                </View>
            </View>
        </View>
    )}
}
const styles = StyleSheet.create({
    speedup: {
        borderWidth:1,
        borderColor:'rgb(20,134,245)',
        borderRadius:10,
        height:25,
        width:40
    },
});