///04,28实现了导入音频，进入POI播放离开POI暂停，实现了如果去之前去过的地点app不会添加重复的音频到trackplayer里面
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
import TrackPlayer from 'react-native-track-player';

var {height, width} = Dimensions.get('window'); 
// TrackPlayer.setupPlayer().then(() => {
//     // The player is ready to be used
// });
var before=false;
var n=0;
var enter=false
var soundQueue=new Array()
var poiQueue=new Array()

const poiNames = ["RU", "Marston", "Turlington", "Plaza", "Racquet", "Griffin"];
export default class MusicPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentsound: null,
          audioState:'paused', //playing, paused
          audioSeconds: 0,
          audioDuration: 0,
          audioSpeed: 1,
          note:false,
          noteContent:null,
          maximize:false,
          order:[-1,-1,-1,-1,-1,-1],
          currentPlay: null,
        };
        this.sliderEditing = false;
    }
    componentDidMount(){
        this.timeout = setInterval(() => {
            if(this.state.audioState == 'playing' && !this.sliderEditing&&this.state.currentsound!=null){
                this.getPos(this.state.currentsound)
            }
        }, 100);
       
        
    }
    componentDidUpdate(preProps){
        if(this.props.entergeo!=preProps.entergeo){///enter不同说明进入或离开POI
            enter=!enter
            if(enter){
                if(!soundQueue.includes(this.props.soundId)){
                    // poiQueue.push(this.props.poiNames[this.props.current])
                    soundQueue.push(this.props.soundId)
                }  
                else{
                    var soundPreviousIndex=soundQueue.indexOf(this.props.soundId)
                    this.props.player.remove([soundPreviousIndex])
                    soundQueue.splice(soundPreviousIndex,1)
                    soundQueue.push(this.props.soundId)
                } 
                this.Playaudio(this.props.player)
            }
            else{
                this.pauseAudio(this.props.player)
            }
        }
        // else if(this.props.entergeo!=preProps.entergeo&&preProps.sound==null){
        //     console.log('lalal')
        //     enter=!enter
        //     soundQueue.push(this.props.player)
        //     console.log('不在: '+soundQueue.length)
        //     this.Playaudio(this.props.player)
        // }
    }

    checksoundname=async(sound)=>{
        const title = await sound.getCurrentTrack();
        console.log('checkname: '+title)
    }
    
    Playaudio = async(player) =>{
        if(player!=null){
            const tracks = await player.getQueue();
            if (tracks.length > 1) {
                await player.skipToNext();
            }
            player.play();
            this.setState({currentsound: player})
            this.setState({audioState: 'playing'});
            this.setsoundname(player) 
        }
    }

    setsoundname=async(sound)=>{
        const title = await sound.getCurrentTrack();
        this.setState({currentPlay: title})
        const duration= await sound.getDuration()
        this.setState({audioDuration: duration})
        console.log('currentplay: '+title)
    }
    pauseAudio=(sound)=>{
        sound.pause();
        this.setState({audioState:'paused'});
    }
    onSliderEditStart = () => {
        this.sliderEditing = true;
    }
    onSliderEditEnd = (value) => {
        this.sliderEditing = false;
        this.state.currentsound.seekTo(value)
        this.setState({audioSeconds:value});
    }
    getPos=async(sound)=>{
        var position = await sound.getPosition();
        this.setState({audioSeconds: position})
    }
    jumpPrev15Secs = (sound) => {
        // console.log('jumpprevseconds')
        if(sound!=null){
            this.getPos(sound)
        }
        sound.seekTo(Math.max(this.state.audioSeconds-10,0));
    }
    jumpNext15Secs = (sound) => {
        if(sound!=null){
            this.getPos(sound)
        }
        console.log('duration: '+this.state.audioDuration)
        sound.seekTo(Math.min(this.state.audioSeconds+10,this.state.audioDuration));
    }

    speedUp = (sound) =>{
        var speed = this.state.audioSpeed
        if(speed>=2){
            speed = 1;
        }else{
            speed = speed + 0.5;
        }
        sound.setRate(speed)
        this.setState({audioSpeed: speed});
    }
    backward = async(sound) =>{
        await this.props.player.skipToPrevious();
        console.log('this is backward!!! currentplay '+ this.state.currentPlay)
        // var index=soundQueue.indexOf([this.state.currentPlay,sound])
        // console.log('index: '+index)
        // if(index>0){
        //     sound.stop()
        //     this.setState({
        //         currentsound:soundQueue[index-1][1]
        //     })
        //     this.setsoundname(this.state.currentsound)
        //     this.Playaudio(this.state.currentsound)
        // }
    }
    forward = async(sound) =>{
        await this.props.player.skipToNext();
        console.log('this is forward!!! currentplay '+ this.state.currentPlay)
    }


    render() {
        if(this.state.maximize==false){
            return (
                <TouchableOpacity activeOpacity={0.8} style={{position:'absolute', bottom:0}} onPress={()=>{this.setState({maximize:true})}}>
                    <View style={{flex:1, backgroundColor: 'darkorange',flexDirection:'row',width:width,height:50,alignItems:'center',paddingHorizontal:width*0.05}}>
                        <Text style={{flex:8,}}>{this.state.currentPlay}</Text>
                         
                        {/* <View style={{flex:0.5}}/> */}
                        {this.state.audioState=='playing'?
                            <Icon name='pause' type='font-awesome' underlayColor='darkorange' color='white' onPress={()=>this.pauseAudio(this.state.currentsound)} containerStyle={{flex:1}}/>:
                            <Icon name='play' type='font-awesome' underlayColor='darkorange' color='white' onPress={()=>this.Playaudio(this.state.currentsound)} containerStyle={{flex:1}}/>
                        }
                        {/* <Icon name='replay-10' type='material' underlayColor='darkorange' color='white' size={35} containerStyle={{flex:1,}} onPress={this.jumpPrev(this.state.currentsound)}/> */}
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
                            <Text style={{flex:1, textAlign:'center', textAlignVertical:'center', fontSize:18, fontFamily:'monospace'}}>{this.props.poiNames[this.state.currentPlay]}</Text>
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
                        <Icon name='step-backward' type='font-awesome'color='white' size={30} containerStyle={{flex:1}} onPress={()=>this.backward(this.state.currentsound)}/>
                        <Icon name='replay-10' type='material' color='white' size={40} containerStyle={{flex:1}} onPress={()=>this.jumpPrev15Secs(this.state.currentsound)}/> 
                        {this.state.audioState=='playing'?
                            <Icon name='pause-circle' type='font-awesome' color='white' size={60} onPress={()=>this.pauseAudio(this.state.currentsound)} containerStyle={{flex:1}}/>:
                            <Icon name='play-circle' type='font-awesome' color='steelblue' size={60} onPress={()=>this.Playaudio(this.state.currentsound)} containerStyle={{flex:1}}/>
                        }
                        <Icon name='forward-10' type='material' color='white' size={40} containerStyle={{flex:1}} onPress={()=>this.jumpNext15Secs(this.state.currentsound)}/>
                        <Icon name='step-forward' type='font-awesome' color='white' size={30} containerStyle={{flex:1}} onPress={()=>this.forward(this.state.currentsound)}/>
                        <View style={{flex:1, alignItems:'center'}}>
                            <View style={styles.speedup}><Text style={{textAlign:'center',fontWeight: 'bold'}} onPress={()=>this.speedUp(this.state.currentsound)}>x{this.state.audioSpeed}</Text></View>
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