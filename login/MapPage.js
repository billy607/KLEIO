import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-community/async-storage'
import {Icon,Overlay,Button} from 'react-native-elements';
import MapView, {Polyline,Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import Boundary, {Events} from 'react-native-boundary';
import {ScrollView} from 'react-native-gesture-handler';
import Sound from 'react-native-sound';
import {HeaderBackButton,  } from '@react-navigation/stack'
import PopupMenu from './components/PopupMenu'
import MusicPlayer from './components/MusicPlayer'
import TrackPlayer from 'react-native-track-player';

var soundQueue=new Array()

const GOOGLE_MAPS_APIKEY = 'AIzaSyAwEASOqU1llLDKrblaktUWaec_zGuJnwU';

var {height, width} = Dimensions.get('window'); 
const ASPECT_RATIO = width / height;
const LATITUDE = 29.6482;  
const LONGITUDE = -82.3458;
const LATITUDE_DELTA = 0.010;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
var t=null;
const testduration=[134, 56, 108, 50, 16, 68]

TrackPlayer.setupPlayer().then(() => {
    // The player is ready to be used
});
export default class MapPage extends Component {
    constructor(props) {
        super(props);
        this.props.navigation.setOptions({
            headerLeft: () => (
                <HeaderBackButton
                  onPress={() => {
                    this.props.navigation.navigate('Overview', {visited:this.state.visited})
                  }}
                  tintColor='white'
                />
            ),
            headerRight: () => (
                <Icon name='file-document-outline' type='material-community' color='white' underlayColor='darkorange' containerStyle={{padding:10}} onPress={()=>{this.props.navigation.navigate('Report',{ visited: this.state.visited });}}/>
            ),
          })
        var visited = Object.values(this.props.route.params.visited);
        console.log('mapParam: '+ visited[0])
        var visited1 = visited.map((item,index)=> parseInt(visited[index]))
        visited1[0]==1?console.log('visited1 is 1'):null
        visited1[1]==0?console.log('visited2 is 0'):console.log('visited2 not 0')
        // console.log('visited: '+ visited)
        this.state = {
          destination: {
                  latitude: LATITUDE,
                  longitude: LONGITUDE,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                },
          chosenPoi: null,
          entergeo: false,
          note:false,
          noteContent:null,
          visited:visited,
          current:-1,
          universityId: 1,
          poiInformation: null,
          isPoiLoaded: false
        };
        this.onPoiClick = this.onPoiClick.bind(this);
    }

    componentDidMount() {
        console.log("call componentDidMount!!!!!!!!");
        // TODO: add order for poi
        this.fetchAndAssignPoiInformation();
    }

    componentWillUnmount() {
        Boundary.off(Events.ENTER)
        Boundary.off(Events.EXIT)
        this.state.poiInformation.map((marker,index) => (
            index += 1,
            Boundary.remove(index.toString())
            .then(() => console.log('Remove boundary on' + marker.get('name')))
            .catch(e => console.log('Failed to delete' + marker.get('name') + ': )', e))
        ))
    }

    fetchAndAssignPoiInformation() {
        fetch('http://ec2-54-174-141-206.compute-1.amazonaws.com/api/v1/poi/' + this.state.universityId)
            .then((response) => response.json())
            .then((json) => {
                this.initializePoiInfo(json);
            })
            //create boundries
            .then(() => {
                this.state.poiInformation.map((marker,index) => (
                    index += 1,
                    console.log(index.toString() + ": " + marker.get('name') + "{" + marker.get('latitude') + "," + marker.get('longitude') + "}"),
                    Boundary.add(
                        {
                            lat: marker.get('latitude'),
                            lng: marker.get('longitude'),
                            radius: 50, // in meters
                            id: index.toString(),
                        })
                        .then(() => console.log("success!"))
                        .catch(e => console.error("error :(", e))
                ))
            })
            //set boundry function
            .then(() => {
                Boundary.on(Events.ENTER, id => {
                    console.log(`Get out of my ${id}!!`);
                    var ls=this.state.visited.map((item,index)=>
                        (index+1).toString()==id?1:item
                    );
                    this.Loadaudio(id)
                    this.setState({current:parseInt(id,10)-1})
                    this.setState({entergeo:true});
                    this.setState({visited:ls})
                    
                    Alert.alert('You have entered ' + this.state.poiInformation[parseInt(id,10)-1].get('name'))
                });
            })
            .then(() => {
                Boundary.on(Events.EXIT, id => {
                    // Prints 'Ya! You better get out of my Chipotle!!'
                    console.log(`Ya! You better get out of my ${id}!!`);
                    this.setState({entergeo:false});
                })
            })
            .catch((error) => console.error(error))
            .finally(() => {
                console.log("finally!")
            });
    }

    initializePoiInfo = (json) => {
        let poiInfo = [];
        json.map(obj => {
            let tempPoi = new Map();
            tempPoi.set('longitude', obj.longitude);
            tempPoi.set('latitude', obj.latitude);
            tempPoi.set('name', obj.name);
            poiInfo.push(tempPoi);
        })
        this.setState({poiInformation: poiInfo});
        this.setState({isPoiLoaded: true});
    }

    Loadaudio=async(soundId)=>{
        console.log('sound: '+soundId)

        var audioLength = 0;
        audioLength = testduration[parseInt(soundId,10)-1]
        await TrackPlayer.add([{
            id: soundId, // Must be a string, required ec2-54-81-254-195.compute-1.amazonaws.com
            url: 'http://ec2-54-174-141-206.compute-1.amazonaws.com/api/v1/file/name/'+soundId+'.mp3', // Load media from the network
            title: this.state.poiInformation[parseInt(soundId,10)-1].get('name'),
            artist: 'kleio',
            duration: audioLength
        }]);
         console.log('MapPage.js finish add...')
        // await TrackPlayer.skip(sound);
    }

    onPoiClick(e) {
        const poi = e.nativeEvent;
        this.setState({
          destination: {
                  latitude: poi.coordinate.latitude,
                  longitude: poi.coordinate.longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                },
          poi:poi,
        });
    }

    onScreenClick= (e) => {
        const loc = e.nativeEvent;
        this.setState({
          destination: {
            latitude: loc.coordinate.latitude,
            longitude: loc.coordinate.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          poi:null,
        });
    }
    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        header: null,
    };

    storeData = async () => {
        try {
            console.log('store')
          this.setState({note:false})
          await AsyncStorage.setItem('@storage_Key', this.state.noteContent)
        } catch (e) {
          console.log(e)
        }
    };

    getData = async () => {
        this.setState({note:true})
        try {
          console.log('get')
          const value = await AsyncStorage.getItem('@storage_Key')
          if(value !== null) {
            this.setState({noteContent:value})
          }
        } catch(e) {
            console.log(e)
        }
    };

    render() {
        return (
        <View style={styles.mapcontainer}>
        <MapView
           provider={PROVIDER_GOOGLE} // remove if not using Google Maps
           style={this.state.current==-1?styles.mapInit:styles.map}
           initialRegion={{
             latitude: LATITUDE,  
             longitude: LONGITUDE,
             latitudeDelta: LATITUDE_DELTA,
             longitudeDelta: LONGITUDE_DELTA,
           }}
           showsUserLocation={true}
           onPoiClick={this.onPoiClick}
           onPress={this.onScreenClick}
        >
            {this.state.chosenPoi && (
            <Marker 
              coordinate={this.state.chosenPoi.coordinate}
              title={"title"}
              description={"description"}
              onPress={()=>console.log('hello')}>
            </Marker>
            )}
            
            {this.state.isPoiLoaded && this.state.poiInformation.map((marker,index) => (
                // console.log(index),
                // console.log("\n"),
                
                index += 1,
                <Marker
                    key={index}
                    coordinate={{ latitude: marker.get('latitude'), longitude: marker.get('longitude') }}
                    //title={marker.title}
                    // description={marker.description}
                >
                    <View >
                        {
                        this.state.visited[index-1]==0? <ImageBackground    source={require('./image/Marker.png')} 
                                            style={{resizeMode: "contain", 
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: 17.5, 
                                            height: 29,
                                            opacity:0.5}}>
                            <Text style={{fontSize:12}}>{index}</Text>
                        </ImageBackground>
                        :<ImageBackground    source={require('./image/Marker.png')} 
                                            style={{resizeMode: "contain", 
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: 17.5, 
                                            height: 29,}}>
                            <Text style={{fontSize:12}}>{index}</Text>
                        </ImageBackground>}
                    </View>
                </Marker>
            ))}

        </MapView>

        {/* {this.state.poi!=null&&
            <PopupMenu name={this.state.poi && this.state.poi.name.replace(/\n/g, " ")}>
                <ScrollView >
                    <Text>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
                </ScrollView>
            </PopupMenu>
        } */}
        <View style={styles.note}>
            <Icon name='pencil-square-o' type='font-awesome' size={18} onPress={this.getData}/>
            {/* containerStyle={{position:'absolute', bottom:height*0.0005+50,right:width*0.0005}} */}
        </View>
        
        <Overlay isVisible={this.state.note} onBackdropPress={this.storeData} 
        overlayStyle={{width:width*0.8, height:height*0.65}}
        >
            <View style={{flex:1}}>
                <Text style={{flex:1,fontSize:23}}>Note</Text>
                <TextInput style={{flex:9,textAlignVertical: "top",backgroundColor:'lightgrey'}} multiline={true} value={this.state.noteContent} onChangeText={(value) => this.setState({noteContent:value})}/>
            </View>
        </Overlay>

        {this.state.current!=-1&&<MusicPlayer entergeo={this.state.entergeo} player={TrackPlayer} poiNames={this.state.poiInformation.map((obj) => {return obj.get('name')})} current={this.state.current} soundId={this.state.current}/>}
       </View>
    )};
}

const styles = StyleSheet.create({
    mapcontainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 50
    },
    mapInit: {
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
    note: {
        borderRadius:50, 
        backgroundColor:'white', 
        width:40,
        height:40,
        position:'absolute', 
        bottom:height*0.0005+55,
        right:width*0.01, 
        alignItems:'center',
        justifyContent:'center', 
        borderWidth:2,
        borderColor:'gray'
    }
});