import React, {Component} from 'react';
import {
  Dimensions,
  View,
  Animated,
} from 'react-native';
import {
  PanGestureHandler,
  TouchableOpacity,
  State,
} from 'react-native-gesture-handler';
import MusicPlayer from './components/MusicPlayer'
import { floor } from 'react-native-reanimated';

var {height, width} = Dimensions.get('window'); 
export default class MenuPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      show: false,
      upAnim: new Animated.Value(-200)
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
      this._translateX.setOffset(this._lastOffset.x);
      this._translateX.setValue(0);
      this._lastOffset.y += event.nativeEvent.translationY;
      this._translateY.setOffset(this._lastOffset.y);
      this._translateY.setValue(0);
    }
  }
  fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(this.state.upAnim, {
      toValue: 0,
      duration: 2000
    }).start();
  };
  render(){
  return (
    <View style={{flex:1}}>
    <PanGestureHandler onHandlerStateChange={this.onHandlerStateChange} onGestureEvent={this._onGestureEvent}>
      <Animated.View  style={{transform: [{translateX: this._translateX, translateY: this._translateY}]}}>
            <TouchableOpacity onPress={()=>this.fadeIn()}>
              <View style={{radius:20, backgroundColor:'red', width:50,height:50}}></View>
            </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
    <Animated.View style={{position:'absolute',bottom:this.state.upAnim,left:0,right:0,height:200, backgroundColor:'blue',}} /> 
    </View>
)
}
}
