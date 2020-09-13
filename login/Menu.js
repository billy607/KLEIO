import React, {Component} from 'react';
import {
  Dimensions,
  View,
  Animated,
  StyleSheet
} from 'react-native';
import {
  PanGestureHandler,
  TouchableOpacity,
  State,
} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import MusicPlayer from './components/MusicPlayer'

import ActionButton from 'react-native-action-button';

var {height, width} = Dimensions.get('window'); 
export default class MenuPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      show: false,
      showAnim: new Animated.Value(-width*0.8),
    }
    this._translateY = new Animated.Value(0);
    this._translateY.setOffset(0);
    this._translateX = new Animated.Value(0);
    this._translateX.setOffset(0);
    this._lastOffset = {x:0, y: 0 };
    this._onGestureEvent = Animated.event(
    [
        {
        nativeEvent: {
            translationX: this._translateX,
            translationY: this._translateY
        },
        },
    ],
    { useNativeDriver: true }
    );
  }
  onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      console.log('hhh')
      this._lastOffset.x += event.nativeEvent.translationX;
      if(this._lastOffset.x<=width/2-25){
        this._lastOffset.x=width*0.0005;
      }
      else{
        this._lastOffset.x=width-40;
      }
      this._translateX.setOffset(this._lastOffset.x);
      this._lastOffset.y += event.nativeEvent.translationY;
      if(this._lastOffset.x==width-40&&this._lastOffset.y<40){
        this._lastOffset.y=50
      }
      this._translateY.setOffset(this._lastOffset.y);
      this._translateY.setValue(0);
      this._translateX.setValue(0);
    }
  }
  fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(this.state.showAnim, {
      toValue: 0,
      duration: 1000
    }).start();
    this.setState({show:true});
  };
  
  fadeOut = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(this.state.showAnim, {
      toValue: -250,
      duration: 1000
    }).start();
    this.setState({show:false});
  };
  render(){
  return (
    <View style={{flex:1}}>
        <ActionButton buttonColor="rgba(231,76,60,1)" verticalOrientation='down'>
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      {this.state.show==false&&<PanGestureHandler onHandlerStateChange={this.onHandlerStateChange} onGestureEvent={this._onGestureEvent}>
        <Animated.View  style={{width:50,height:50,transform: [{translateX: this._translateX, translateY: this._translateY}]}}>
              <TouchableOpacity onPress={()=>this.fadeIn()}>
                <View style={{borderRadius:50, backgroundColor:'red', width:40,height:40,}}>
                  <Icon name='music' type='font-awesome' color='white' size={18} containerStyle={{flex:1, justifyContent:'center', alignItems:'center'}}/>
                </View>
              </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>}
      <Animated.View style={{position:'absolute',bottom:this.state.showAnim,left:width*0.1,right:width*0.1,height:height*0.25,backgroundColor:'blue',}}>
      <TouchableOpacity onPress={()=>this.fadeOut()}>
        <View style={{height:height*0.05}}/>
      </TouchableOpacity>
      <View style={{height:height*0.2}}>
        <MusicPlayer/>
      </View>
      </Animated.View>
    </View>
)
}
}
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
