import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity
  } from 'react-native';
import Slider from '@react-native-community/slider';
import {Icon} from 'react-native-elements';

var {height, width} = Dimensions.get('window'); 
// let demoAudio = require('../sound/test.mp3');
// const this.props.sound = new Sound(demoAudio,(error) => {
//   if (error) {
//       console.log('failed');
//       return;
//   }
//   console.log('start');
//   console.log('duration in seconds: ' + this.props.sound.getDuration() + 'number of channels: ' + this.props.sound.getNumberOfChannels());
// })
var before=false;
export default class MusicPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          sound: this.props.sounds[this.props.current],
          audioState:'paused', //playing, paused
          audioSeconds: 0,
          audioDuration: this.props.sounds[this.props.current].getDuration(),
          audioSpeed: 1,
          note:false,
          noteContent:null,
          maximize:false,
          order:[-1,-1,-1,-1,-1,-1],
          currentPlay: this.props.current,
        };
        this.sliderEditing = false;
        console.log('duration: '+ this.props.sounds[this.props.current].getDuration())
    }
    componentDidMount() {
        // console.log("audioState:"+this.props.entergeo);
        // this.props.entergeo==true?this.setState({audioState:'playing'}):this.setState({audioState:'paused'});
        this.timeout = setInterval(() => {
            if(this.state.audioState == 'playing' && !this.sliderEditing){
                this.state.sound.getCurrentTime((seconds) => {
                    this.setState({audioSeconds:seconds});
                })
            }
        }, 100);
    }
    componentDidUpdate(preProps){
        if(preProps.current!=this.props.current) {
            this.state.sound.setCurrentTime(0);
            this.setState({
                sound: this.props.sounds[this.props.current],
                audioDuration: this.props.sounds[this.props.current].getDuration(),
                currentPlay: this.props.current
            })
        }
        if(this.props.enter!=preProps.enter){
            before=this.props.enter;
            if(before) this.Playaudio("press play button")
            else{
                this.pauseAudio();
            }
            console.log('indexof '+this.state.order.indexOf(this.props.current))
            if(this.state.order.indexOf(this.props.current)==-1){
                var position=this.state.order.indexOf(-1);
                var orderLs=this.state.order;
                orderLs[position]=this.props.current;
                this.setState({order:orderLs});
            }
            console.log('order '+this.state.order)
        }
    }
    Playaudio=async(param)=>{
        console.log(param)
        if(this.state.sound){
            console.log('playing')
            console.log(this.state.audioDuration);
            this.state.sound.play(this.playComplete);
            this.setState({audioState: 'playing'});   
        }else{
            console.log("audio loaded failed");
        }
    }
    playComplete = (success) => {
        if(this.state.sound){
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
                Alert.alert('Notice', 'audio file error. (Error code : 2)');
            }
            this.setState({audioState:'paused', audioSeconds:0});
            this.state.sound.setCurrentTime(0);
        }
    }
    Stopaudio=()=>{
        if(this.state.sound){
            console.log('sound stop!!!')
            this.state.sound.stop();
        }
        this.setState({audioState:'paused'});
    }
    pauseAudio=()=>{
        if(this.state.sound){
            this.state.sound.pause();
        }
        this.setState({audioState:'paused'});
    }
    onSliderEditStart = () => {
        this.sliderEditing = true;
    }
    onSliderEditEnd = (value) => {
        this.sliderEditing = false;
        if(this.state.sound){
            this.state.sound.setCurrentTime(value);
            this.setState({audioSeconds:value});
        }
    }
    jumpPrevSeconds = () => {this.jumpSeconds(-10);}
    jumpNextSeconds = () => {this.jumpSeconds(10);}
    jumpSeconds = (secsDelta) => {
        if(this.state.sound){
            this.state.sound.getCurrentTime((secs) => {
                let nextSecs = secs + secsDelta;
                if(nextSecs < 0) nextSecs = 0;
                else if(nextSecs > this.state.audioDuration) nextSecs = this.state.audioDuration;
                this.state.sound.setCurrentTime(nextSecs);
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
        this.state.sound.setSpeed(speed);
        if(!this.state.sound.isPlaying()) this.state.sound.pause();
        this.setState({audioSpeed: speed});
    }
    backward = () =>{
        this.Stopaudio()
        console.log('this is backward!!! currentplay '+ this.state.currentPlay)
        var index=this.state.order.indexOf(this.state.currentPlay);  //[2 4 0 -1 -1 -1]
        if(index>0){
            this.setState({
                sound:this.props.sounds[this.state.order[index-1]],
                currentPlay:this.state.order[index-1]
            })
        }
        // this.Playaudio()
    }
    forward = () =>{
        this.Stopaudio()
        console.log('this is forward!!! currentplay '+ this.state.currentPlay)
        var index=this.state.order.indexOf(this.state.currentPlay);  //[2 4 0 -1 -1 -1]
        if(index<5){
            this.setState({
                sound:this.props.sounds[this.state.order[index+1]],
                currentPlay:this.state.order[index+1]
            })
        }
        // this.Playaudio()
    }


    render() {
        if(this.state.maximize==false){
            return (
                <TouchableOpacity activeOpacity={0.8} style={{position:'absolute', bottom:0}} onPress={()=>{this.setState({maximize:true})}}>
                    <View style={{flex:1, backgroundColor: 'darkorange',flexDirection:'row',width:width,height:50,alignItems:'center',paddingHorizontal:width*0.05}}>
                        <Text style={{flex:8,}}>{this.props.poiName[this.state.currentPlay]}</Text>
                        <Icon name='replay-10' type='material' underlayColor='darkorange' color='white' size={35} containerStyle={{flex:1,}} onPress={this.jumpPrevSeconds}/> 
                        <View style={{flex:0.5}}/>
                        {this.state.audioState=='playing'?
                            <Icon name='pause' type='font-awesome' underlayColor='darkorange' color='white' onPress={this.pauseAudio} containerStyle={{flex:1}}/>:
                            <Icon name='play' type='font-awesome' underlayColor='darkorange' color='white' onPress={()=>this.Playaudio("press play button")} containerStyle={{flex:1}}/>
                        }
                    </View> 
                </TouchableOpacity>
            )
        }else{   
            return(    
                <View style={{backgroundColor:'darkorange',height:height,width:width}}>
                <View style={{flex:1,paddingHorizontal:width*0.05,paddingVertical:width*0.05}}>
                    <View style={{flexDirection:'row', flex:1}}>
                        <View style={{flex:2,alignItems:'flex-start'}}>
                            <Icon name='chevron-down-circle-outline' type='material-community' color='white' underlayColor='darkorange' size={35} onPress={()=>{this.setState({maximize:false})}}/>
                        </View>    
                        <View style={{flex:8}}>
                            <View style={{flex:1}}/>
                            <Image source={require('../image/Alachua_sculpture.jpg')} style={{flex:1.5, width:undefined, height:undefined}} resizeMode='stretch'/>
                            <Text style={{flex:1, textAlign:'center', textAlignVertical:'center', fontSize:18, fontFamily:'monospace'}}>{this.props.poiName[this.state.currentPlay]}</Text>
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
                        <Icon name='step-backward' type='font-awesome'color='white' size={30} containerStyle={{flex:1}} onPress={this.backward}/>
                        <Icon name='replay-10' type='material' color='white' size={40} containerStyle={{flex:1}} onPress={this.jumpPrevSeconds}/> 
                        {this.state.audioState=='playing'?
                            <Icon name='pause-circle' type='font-awesome' color='white' size={60} onPress={this.pauseAudio} containerStyle={{flex:1}}/>:
                            <Icon name='play-circle' type='font-awesome' color='steelblue' size={60} onPress={()=>this.Playaudio("press play button")} containerStyle={{flex:1}}/>
                        }
                        <Icon name='forward-10' type='material' color='white' size={40} containerStyle={{flex:1}} onPress={this.jumpNextSeconds}/>
                        <Icon name='step-forward' type='font-awesome' color='white' size={30} containerStyle={{flex:1}} onPress={this.forward}/>
                        <View style={{flex:1, alignItems:'center'}}>
                            <View style={styles.speedup}><Text style={{textAlign:'center',fontWeight: 'bold'}} onPress={this.speedUp}>x{this.state.audioSpeed}</Text></View>
                        </View>
                    </View>
                </View>
                </View>
            )
        }
    }
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