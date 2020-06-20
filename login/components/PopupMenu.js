import React, {Component, PureComponent, Children } from 'react';
import {
  Text,
  View,
  Dimensions,
  Animated,
  StatusBar
} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';

const pullUpMenuHeight=150;
var {height, width} = Dimensions.get('window'); 

export default class Popupmenu extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          uparrow: true,
        };
        this._translateY = new Animated.Value(0);
        this._translateY.setOffset(height-pullUpMenuHeight-StatusBar.currentHeight);///////////////////
        this._lastOffset = {y: 0 };//////////////////////
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

    onHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
          console.log('hhh')
          this._lastOffset.y += event.nativeEvent.translationY;
          if(event.nativeEvent.translationY>0) this._lastOffset.y=height-pullUpMenuHeight;///////////////////
          else if(event.nativeEvent.translationY<0) this._lastOffset.y=0;//StatusBar.currentHeight
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
            <View>
              <PanGestureHandler onHandlerStateChange={this.onHandlerStateChange} onGestureEvent={this._onGestureEvent}>
                  <Animated.View style={{
                      position:'absolute', 
                      top: 0, 
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
                      // opacity: this.state.poi? 1:0,
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
                            <Text>{this.props.name}</Text> 
                        </View>

                      </View>
                      {this.props.children}
                  </Animated.View>
              </PanGestureHandler>
            </View>
        )}
}