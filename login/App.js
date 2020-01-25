import React, { Component } from 'react';
import { Text, View, TextInput, Dimensions, StyleSheet, Button, TouchableHighlight } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import { createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import Search from './Search';

var {height, width} = Dimensions.get('window');

class HelloWorldApp extends Component {
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
              <View  style={{flex: 1, flexDirection: 'column'}}>
                    <View  backgroundColor='darkorange' style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{color:'black',
                                     fontSize:40,
                                     fontWeight:'bold',
                                     textShadowColor:'#C0C0C0',
                                     textShadowRadius:2,
                                     textShadowOffset:{width:2,height:2}}}>Welcome!</Text>
                    </View>
                    <View backgroundColor='darkorange' style={{flex: 4, justifyContent: "center", alignItems: "center"}}>
                        <Text style={{color:'black',
                                       fontSize:20,
                                       fontWeight:'bold',
                                       textShadowColor:'#C0C0C0',
                                       textShadowRadius:2,
                                       textShadowOffset:{width:2,height:2}}}>please login with username and password{"\n"}</Text>
                        <TextInput
                            style={{padding:0, paddingLeft:10, width:width-100, borderRadius: 20, borderWidth: 1, height: 40, marginBottom: 20}}
                            placeholder="username"
                            borderColor='black'
                            onChangeText={(text) => this.setState({username:text})}
                        />
                        <TextInput
                            style={{padding:0, paddingLeft:10, width:width-100, borderRadius: 20, borderWidth: 1, height: 40, marginBottom: 20}}
                            placeholder="password"
                            borderColor='black'
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({password:text})}
                        />
                        <View style={{width: width-1000, flexDirection:'row'}}>
                        <Button title="login" onPress={() => {
                                                          this.props.navigation.navigate('Search', {
                                                            username: this.state.username,
                                                            password: this.state.password,
                                                          });
                                                        }}/>
                        <Text>     </Text>
                        <Button title="register"/>
                        </View>
                    </View>
                    <View backgroundColor='darkorange' style={{flex: 2, justifyContent: "center", alignItems: "center", flexDirection: 'column'}}>
                        <LoginButton/>
                        <GoogleSigninButton style={{ width: 192, height: 48 }}
                                                size={GoogleSigninButton.Size.Wide}
                                                color={GoogleSigninButton.Color.Dark}
                                                onPress={this._signIn}
                                                disabled={false} />
                    </View>
              </View>
        );
    }
}

const RootStack = createStackNavigator(
  {
    Home: HelloWorldApp,
    Search: Search,
  },
     {
       initialRouteName: 'Home',
       defaultNavigationOptions: {
        header: null
      },
     }
   );

const AppContainer = createAppContainer(RootStack);



export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}