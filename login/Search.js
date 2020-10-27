import React, { Component,PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  BackHandler,
  Alert 
} from 'react-native';
import {Icon, SearchBar, ListItem, Header} from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';


const image = require('./image/menu.png');

var {height, width} = Dimensions.get('window'); 

const list = [
  {
    name: 'UNIVERSITY OF FLORIDA',
  },
]


export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search:'',
      show: false,
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
          <SearchBar
            placeholder="Explore"
            onChangeText={this.updateSearch}
            value={search}
            inputContainerStyle={{backgroundColor: 'white'}}
            containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5,}}
            leftIconContainerStyle={{backgroundColor:'white'}}
          />
          {/* <Autocomplete 
            containerStyle={{
            left: width*0.1,
            position: 'absolute',
            right: width*0.1,
            top: width*0.4,
            zIndex: 1}}
            
          /> */}
          <Icon
            raised={true}
            name='crosshairs'
            type='font-awesome'
            color='#f50'
            onPress={() => {
              this.setState({show: true})
            }}
            containerStyle={styles.iconcontainer}/>
           {this.state.show?<SafeAreaView style={styles.SafeAreaView}>
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
          </SafeAreaView>:null}
        </View>
      // </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkorange',
    paddingBottom:height*0.05,
    paddingTop:height*0.05
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'darkorange',
    padding: 0.1*width,
  },
  SafeAreaView: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: 'darkorange',
  },
  ScrollView: {
    borderRadius: 10,
    width:width*0.8,
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