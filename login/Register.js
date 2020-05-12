import React, { Component,PureComponent } from 'react';
import { Text, View, TextInput, Dimensions, StyleSheet, TouchableHighlight } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import { createAppContainer, createSwitchNavigator} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import Search from './Search';
import { Input, Button, SocialIcon } from 'react-native-elements';



var {height, width} = Dimensions.get('window');

class register extends Component {
    constructor(props) {
     super(props);
     this.state = {
       username: null,
       password: null,
       userInfo: null,
       gettingLoginStatus: true,
     };
    }

    render() {
        return (
              <View style={styles.container}>
                <Text style={styles.text}>Register</Text>
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
                  <Button title="register"/>
                  <Text style={{width: width*0.2}}/>
                  <Button title="cancel"
                  onPress={() => 
                    this.props.navigation.goback(null)
                  }/>
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

const RootStack = createSwitchNavigator(
  {
    Home: register,
    Search: Search,
  },
     {
       initialRouteName: 'Home',
       defaultNavigationOptions: {
        header: null
      },
      backBehavior: 'none',
     }
   );

const AppContainer = createAppContainer(RootStack);



export default class Register extends React.Component {
  render() {
    return <AppContainer />;
  }
}

