import React, { Component } from 'react';
import { Text, View, TextInput, Dimensions, StyleSheet, Button, TouchableHighlight } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

var {height, width} = Dimensions.get('window');
export default class HelloWorldApp extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
     }
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

                        />
                        <TextInput
                            style={{padding:0, paddingLeft:10, width:width-100, borderRadius: 20, borderWidth: 1, height: 40, marginBottom: 20}}
                            placeholder="password"
                            borderColor='black'
                            secureTextEntry={true}
                        />
                        <View style={{width: width-1000, flexDirection:'row'}}>
                        <Button title="login"/>
                        <Text>     </Text>
                        <Button title="register"/>
                        </View>
                    </View>
                    <View backgroundColor='darkorange' style={{flex: 2, justifyContent: "center", alignItems: "center", flexDirection: 'column'}}>
                        <LoginButton/>
                        <GoogleSigninButton style={{width: 200, height: 40}}/>
                    </View>
              </View>
        );
    }
}
