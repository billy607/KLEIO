import React, { Component,PureComponent } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableHighlight,BackHandler,Alert } from 'react-native';
import { Input, Button, SocialIcon } from 'react-native-elements';

var {height, width} = Dimensions.get('window');
export default class HelloWorldApp extends PureComponent {
    constructor(props) {
     super(props);
     this.state = {
       username: null,
       password: null,
       userInfo: null,
       gettingLoginStatus: true,
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
     this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
    }
    componentWillUnmount() {
      this.backHandler.remove();
    }
    render() {
        return (
              <View style={styles.container}>
                <Text style={styles.text}>WELCOME TO KLEIO</Text>
                <Input
                  placeholder=' your email address'
                  leftIcon={{ type: 'font-awesome', name: 'envelope',color:"white" }}
                  inputStyle={{color:"white"}}
                />
                <Input 
                  placeholder=' your password'
                  leftIcon={{ type: 'font-awesome', name: 'key',color:"white" }}
                  inputStyle={{color:"white"}}
                />
                <Text>    </Text>
                <View style={{flexDirection: "row"}}>
                  <Button title="login" 
                    onPress={() => {
                      this.props.navigation.navigate('Search');
                    }}/>
                  <Text style={{width: width*0.2}}/>
                  <Button title="register"
                  onPress={() => {
                    this.props.navigation.navigate('Register');
                    }}/>
                </View>
                <View style={styles.iconcontainer}>
                  <SocialIcon
                    type='facebook'
                  />
                  <Text>        </Text>
                  <SocialIcon
                    type='google'
                  />
                </View>
              </View>
        );
    }
}

const styles = StyleSheet.create({
  container:{
    // position:'absolute',
    // top:0,
    // height:height,
    // width:width,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkorange',
    padding: 20
  },
  text:{
    color: "white",
    fontSize: 20,
    position: "absolute",
    top:100
  },
  iconcontainer:{
    flexDirection: "row",
    position: 'absolute',
    bottom: 50
  }
})

// const Stack = createStackNavigator();
// function MyStack() {
//   return (
//     <Stack.Navigator initialRouteName='Home' headerMode='none'>
//       <Stack.Screen name="Home" component={HelloWorldApp} />
//       <Stack.Screen name="Search" component={Search} />
//       <Stack.Screen name='Register' component={Register} />
//     </Stack.Navigator>
//   );
// }
// export default class Test extends React.Component {
//   render() {
//     return (
//       // <NavigationContainer>
//       // <MyStack/>
//       // </NavigationContainer>
//       <HelloWorldApp/>
//       )
//   }
// }