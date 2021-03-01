import React, { Component,PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  BackHandler,
  Alert,
  Text
} from 'react-native';
import {Icon, SearchBar, ListItem, Header} from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
import { TouchableOpacity } from 'react-native-gesture-handler';


const image = require('./image/menu.png');

var {height, width} = Dimensions.get('window'); 

const list = [
  {
    name: 'UNIVERSITY OF FLORIDA',
  },
  {
    name: 'UNIVERSITY OF FLORIDA',
  },
  {
    name: 'UNIVERSITY OF FLORIDA',
  },
  {
    name: 'UNIVERSITY OF FLORIDA',
  },
  {
    name: 'UNIVERSITY OF FLORIDA',
  },
  {
    name: 'UNIVERSITY OF FLORIDA',
  },
  {
    name: 'UNIVERSITY OF FLORIDA',
  },
]

const data = ['University of Florida', 'abc', 'bcd', 'fasdfa', 'afwee', 'kjfal;k',]

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search:'',
      show: false,
      edit: false,
    };
  }
  backAction = () => {//android back button action
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };
  componentDidMount() {
    fetch('http://ec2-100-26-230-81.compute-1.amazonaws.com/api/v1/user/getAllUser')
      .then((response) => response.json())
      .then((json) => {
        // this.setState({response: json.userName});
        console.log("response: "+ json[0].userName);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        console.log("finally!")
      });

    this._unsubscribe = this.props.navigation.addListener('blur', () => {
      this.backHandler.remove();
    });
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        this.backAction
      );
    });
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  updateSearch = search =>{
    this.setState({search: search});
    this.setState({edit:true})
  }
  render() {
    const { search } = this.state;

    return (
      // <View style={styles.maincontainer}>
        /* <Header
          leftComponent={ <Icon name='bars' type='font-awesome' onPress={() => this.props.navigation.openDrawer()} color='white'/>}
          centerComponent={{ text: 'KLEIO', style: { color: 'white' } }}
          backgroundColor='darkorange'
          containerStyle={{shadowColor:'transparent', height: 50}}
          leftContainerStyle={{top:-15}}
          centerContainerStyle={{top:-15}}
          rightContainerStyle={{top:-15}}
        /> */
        <View style={styles.container}>
          <View style={{position:'absolute',top:height*0.05,left:width*0.1,width:width*0.8}}>
          <SearchBar
            placeholder='Explore'
            onChangeText={this.updateSearch}
            value={search}
            inputContainerStyle={{backgroundColor: 'white'}}
            containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5,}}
            leftIconContainerStyle={{backgroundColor:'white'}}
          />
          {this.state.edit&&<View style={{backgroundColor:'blue',height:height*0.25,zIndex:1}}><ScrollView style={{height:height*0.2,width:width*0.8,backgroundColor:'white'}}> 
            {data.map((suggestion, i) => (
                suggestion.includes(search)?<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Overview')}}><Text style={{fontSize:18}}>{suggestion}</Text></TouchableOpacity>:null
                ))}
          </ScrollView>
          <Icon name='close' type='font-awsome' onPress={()=>{this.setState({edit:false})}}/>
          </View>
          }
          </View>
          {/* <Autocomplete 
            containerStyle={{
            left: width*0.1,
            position: 'absolute',
            right: width*0.1,
            top: width*0.4,
            zIndex: 1}}
            
          /> */}

          {!this.state.edit&&<View style={styles.iconcontainer}>
            <Icon
              raised={true}
              name='crosshairs'
              type='font-awesome'
              color='#f50'
              onPress={() => {
                this.setState({show: true})
              }}/>
          </View>}
          {this.state.show?
          <ScrollView style={styles.ScrollView}>
            <View style={{padding:5}}>
            {
              list.map((l, i) => (
                <ListItem
                  key={i}
                  title={l.name}
                  bottomDivider
                  onPress={() => {
                    this.props.navigation.navigate('Overview');}}
                />
              ))
            }
              </View>
            </ScrollView>
          :null}
          </View>
    );
  }
}

const styles = StyleSheet.create({
  maincontainer:{
    backgroundColor:'hsl(28,110%,54%)', 
    // position:'absolute',
    // top:0,
    height:height,
    width:width
  },
  iconcontainer: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'darkorange',
    // paddingBottom:height*0.05,
    // paddingTop:height*0.05
    position: 'absolute', 
    top: height*0.2, 
    left: 0, 
    right: 0, 
    bottom: 0,  
    alignItems: 'center'
  },
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // backgroundColor: 'darkorange',
    // padding: 0.1*width,
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    backgroundColor: 'darkorange',
  },
  SafeAreaView: {
    // flex: 1,
    // justifyContent: 'center',
    position:'absolute',
    top:height*0.4,
    left:width*0.1,
    
    backgroundColor: 'darkorange',
  },
  ScrollView: {
    position:'absolute',
    top:height*0.35,
    left:width*0.1,
    borderRadius: 10,
    width:width*0.8,
    height:height*0.5,
    backgroundColor: 'white',
  },
});
// const Stack = createStackNavigator();
// function MyStack() {
//   return (
//     <Stack.Navigator initialRouteName='HomeScreen' headerMode='none'>
//       <Stack.Screen name="Home" component={MyDrawer} />
//       <Stack.Screen name="MainPage" component={MainPage} />
//     </Stack.Navigator>
//   );
// }
// const Drawer = createDrawerNavigator();
// function MyDrawer() {
//   return (
//     <Drawer.Navigator >
//       <Drawer.Screen name="Home" component={SearchPage}/>
//       <Drawer.Screen name="Setting" component={MenuPage} />
//     </Drawer.Navigator>
//   );
// }
// export default class Search extends React.Component {
//   render() {
//     return (
//       <MyStack/>
//       )
//   }
// }