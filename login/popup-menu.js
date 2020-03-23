import React, { Component,PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Modal,
  Alert,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import Slider from '@react-native-community/slider';

export class Popupmenu extends Component {
    render() {
        return (
            <View>
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                />
            </View>
        )}
}