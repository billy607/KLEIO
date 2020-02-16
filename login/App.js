import React, { Component,PureComponent } from 'react';
import { Text, View, TextInput, Dimensions, StyleSheet, TouchableHighlight } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import { createAppContainer, createSwitchNavigator} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import Search from './Search';
import { Input, Button, SocialIcon } from 'react-native-elements';

var {height, width} = Dimensions.get('window');

class HelloWorldApp extends PureComponent {
    constructor(props) {
     super(props);
     this.state = {
       username: null,
       password: null,
       userInfo: null,
       gettingLoginStatus: true,
     };
    }

    componentDidMount() {
     //initial configuration
     GoogleSignin.configure({
       //It is mandatory to call this method before attempting to call signIn()
       scopes: ['https://www.googleapis.com/auth/drive.readonly'],
       // Repleace with your webClientId generated from Firebase console
       webClientId: 'REPLACE_YOUR_WEB_CLIENT_ID_HERE',
     });
     //Check if user is already signed in
     this._isSignedIn();
    }

    _isSignedIn = async () => {
     const isSignedIn = await GoogleSignin.isSignedIn();
     if (isSignedIn) {
       alert('User is already signed in');
       //Get the User details as user is already signed in
       this._getCurrentUserInfo();
     } else {
       //alert("Please Login");
       console.log('Please Login');
     }
     this.setState({ gettingLoginStatus: false });
    };

    _getCurrentUserInfo = async () => {
     try {
       const userInfo = await GoogleSignin.signInSilently();
       console.log('User Info --> ', userInfo);
       this.setState({ userInfo: userInfo });
     } catch (error) {
       if (error.code === statusCodes.SIGN_IN_REQUIRED) {
         alert('User has not signed in yet');
         console.log('User has not signed in yet');
       } else {
         alert("Something went wrong. Unable to get user's info");
         console.log("Something went wrong. Unable to get user's info");
       }
     }
    };

    _signIn = async () => {
     //Prompts a modal to let the user sign in into your application.
     try {
       await GoogleSignin.hasPlayServices({
         //Check if device has Google Play Services installed.
         //Always resolves to true on iOS.
         showPlayServicesUpdateDialog: true,
       });
       const userInfo = await GoogleSignin.signIn();
       console.log('User Info --> ', userInfo);
       this.setState({ userInfo: userInfo });
     } catch (error) {
       console.log('Message', error.message);
       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
         console.log('User Cancelled the Login Flow');
       } else if (error.code === statusCodes.IN_PROGRESS) {
         console.log('Signing In');
       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
         console.log('Play Services Not Available or Outdated');
       } else {
         console.log('Some Other Error Happened');
       }
     }
    };

    _signOut = async () => {
     //Remove user session from the device.
     try {
       await GoogleSignin.revokeAccess();
       await GoogleSignin.signOut();
       this.setState({ userInfo: null }); // Remove the user from your app's state as well
     } catch (error) {
       console.error(error);
     }
    };
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
                  <Button title="register"/>
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
    flex: 1,
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
    Home: HelloWorldApp,
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



export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}