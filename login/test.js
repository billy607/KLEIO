import React, { Component,PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  BackHandler,
  Alert,
  Button,
  Text,
  Image,
  PermissionsAndroid
} from 'react-native';
import {Icon, SearchBar, ListItem, Header} from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob'
import Sound from 'react-native-sound';
// file:/storage/emulated/0/Download/test.mp3

                
const { config, fs } = RNFetchBlob;
const downloads = Platform.OS == 'android' ? fs.dirs.DownloadDir:fs.dirs.DocumentDir;
const requestWritePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "write storage Permission",
          message:
            "write storage permission " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can");
      } else {
        console.log("denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestReadPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "READ storage Permission",
          message:
            "READ storage permission " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can");
      } else {
        console.log("denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

function downloadFile(url,fileName) {
    return config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache : true,
      addAndroidDownloads : {
        useDownloadManager : true,
        notification : true,
        path:  downloads + '/' + fileName + '.mp4',
      }
    })
    .fetch('GET', url).then((res) => {
        // do some magic here
        console.log('download success')
        console.log('The file saved to ', res.path())
      });
  }
function createaudio(){
    var sound=new Sound('file:/storage/emulated/0/Download/test.mp3',null,(error) => {
      if (error) {
          console.log('failed');
          return;
      }
      })
    setTimeout(function () {
        sound.play()
    console.log(sound.isPlaying())
    console.log(sound.getDuration())
    }, 5000);
      
  }
export default class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: null,
    };
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
  
  componentDidMount() {
    // downloadFile('http://ec2-54-81-254-195.compute-1.amazonaws.com/api/v1/file/name/eva-004.mp3','eva-004')
    // RNFetchBlob
    // .config({
    //   // add this option that makes response data to be stored as a file,
    //   // this is much more performant.
    //   fileCache : true,
    //   appendExt : 'jpg'
    // })
    // .fetch('GET', "http://ec2-54-81-254-195.compute-1.amazonaws.com/api/v1/file/name/eva-004.mp3").then((res) => {
    //   // do some magic here
    //   console.log('download success')
    //   console.log('The file saved to ', res.path())
    //   this.setState({path: res.path()})
    //   console.log('statepath: '+this.state.path)
    // })
    
    
  }
  
  render() {

    return (
      <View>
        {createaudio()}
          <Text>This is test page</Text>
          <Button title="request write permissions" onPress={() => {
          requestWritePermission();}} />
          <Button title="download" onPress={() => {downloadFile('http://ec2-54-81-254-195.compute-1.amazonaws.com/api/v1/file/name/test.mp3','test')} }/>
          <Button title="request read permissions" onPress={() => {
          requestReadPermission();}} />
          <Image source={{width:200,height:200,uri:'file://'+ downloads + '/' + 'eva-004.jpg'}}/> 
      </View>
    );
  }
}

