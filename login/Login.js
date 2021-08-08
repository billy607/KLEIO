import React, { Component,PureComponent } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableHighlight,BackHandler,Alert } from 'react-native';
import { Input, SocialIcon, Button} from 'react-native-elements';
/*import { Button } from "@material-ui/core";*/


var {height, width} = Dimensions.get('window');
export default class HelloWorldApp extends PureComponent {
    constructor(props) {
     super(props);
     this.state = {
       userName: null,
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

    async login() {
      try {
        const response = await fetch('http://ec2-54-174-141-206.compute-1.amazonaws.com/api/v1/user/login', {
          method: 'POST',
          body: {
            "userName": this.state.userName,
            "secondParam": this.state.password
          }
        });
        const json = await response.json();
        return response;
      } catch (error) {
        console.error(error);
      }
    }

    render() {
        return (
            <View style={styles.container}>
              <Text style={styles.text}>WELCOME TO KLEIO</Text>
              <Input
                placeholder=' Email'
                leftIcon={{ type: 'font-awesome', name: 'envelope',color:"white" }}
                inputStyle={{color:"white"}}
                onChangeText = {value => this.setState({userName: value})}
              />
              <Input 
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'key',color:"white" }}
                inputStyle={{color:"white"}}
                onChangeText = {value => this.setState({password: value})}
              />
              <Text>    </Text>
              <View style={{flexDirection: "row"}}>
                <Button title="Login" containerStyle={{width:width*0.25}}
                  onPress={() => {
                    if (this.login()) {
                      this.props.navigation.navigate('Search');
                    }
                  }}/>
                <Text style={{width: width*0.15}}/>
                <Button title="Register" containerStyle={{width:width*0.25}}
                onPress={() => {
                  this.backHandler.remove();
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
    backgroundColor: 'hsl(28,110%,54%)',
    padding: 20
  },
  text:{
    color: "white",
    fontSize: 35,
    position: "absolute",
    top:100,
    fontWeight: 'bold',
  },
  iconcontainer:{
    flexDirection: "row",
    position: 'absolute',
    bottom: 50
  }
})
