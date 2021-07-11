import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import TrackPlayer from 'react-native-track-player';

TrackPlayer.setupPlayer().then(() => {
    // The player is ready to be used
});
const string='marston'
const track1 = {
    id: '1', // Must be a string, required
    url: 'http://ec2-54-81-254-195.compute-1.amazonaws.com/api/v1/file/name/'+string+'.mp3', // Load media from the network
    title: 'test',
    artist: 'kelio',
};
const track2 = {
    id: '1', // Must be a string, required
    url: require('./sound/1.mp3'), // Load media from the network
    title: 'test',
    artist: 'kelio',
};

// Add the tracks to the queue:
// function addaudio = async () => {
// await TrackPlayer.add([track1]);
// };

const addaudio = async () => {
    await TrackPlayer.add([track2]);
    await TrackPlayer.add([track1]);
    TrackPlayer.play()
    console.log('trackid: '+await TrackPlayer.getDuration())
  };
export default class Trackplayertest extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  
  componentDidMount() {
    addaudio()
    // TrackPlayer.play()
  }
  
  render() {

    return (
      <View>
        <Text> welcome!</Text>
      </View>
    );
  }
}

