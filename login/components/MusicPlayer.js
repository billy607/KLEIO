import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
  } from 'react-native';
import Slider from '@react-native-community/slider';
import {Icon} from 'react-native-elements';

var {height, width} = Dimensions.get('window'); 
export default class MusicPlayer extends Component {
    constructor(props) {
        super(props);
        this.s=this.props.s;
        this.state = {
          audioState:this.props.audioState, //playing, paused
          audioSeconds: 0,
          audioDuration: this.props.s.getDuration(),
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
    jumpPrevSeconds = () => {this.jumpSeconds(-5);}
    jumpNextSeconds = () => {this.jumpSeconds(5);}
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
        <View style={{width:width*0.8,height:height*0.25,backgroundColor: 'white',opacity:0.7}}>
        {/* <Slider
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
        {console.log('second:'+this.state.audioState)}
        {this.state.audioState=='playing'?
            <Icon name='pause' type='font-awesome' color='rgb(20,134,245)' onPress={this.pauseAudio} containerStyle={{flex:1}}/>:
            <Icon name='play' type='font-awesome' color='rgb(20,134,245)' onPress={()=>this.Playaudio("press play button")} containerStyle={{flex:1}}/>
        }

        <Icon name='forward' type='font-awesome' color='rgb(20,134,245)' containerStyle={{flex:1}} onPress={this.jumpNextSeconds}/>

        <View style={{paddingRight:10}}><View style={styles.speedup}><Text style={{textAlign:'center',fontWeight: 'bold'}} onPress={this.speedUp}>x{this.state.audioSpeed}</Text></View></View>
            </View> */}
        </View>
    )}
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