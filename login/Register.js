import React, { Component,PureComponent } from 'react';
import { Text, View, TextInput, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { Input, Button, SocialIcon } from 'react-native-elements';


var {height, width} = Dimensions.get('window');

export default class RegisterPage extends Component {
    constructor(props) {
     super(props);
     this.state = {
       username: null,
       password: null,
       userInfo: null,
       gettingLoginStatus: true,
       password: null,
       cPassword: null,
     };
    }
    setPassword=(text)=>{
      this.setState({password:text})
    }
    setcPassword=(text)=>{
      this.setState({cPassword:text})
    }
    render() { 
        return (
              <ScrollView style={styles.container} contentContainerStyle={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                <View style={{flex:1, justifyContent:'center'}}><Text style={styles.text}>Register</Text></View>
                <View style={styles.mainpart}>
                <Input
                  placeholder=' your email address'
                  leftIcon={{ type: 'font-awesome', name: 'envelope',color:"white" }}
                  inputStyle={{color:"white"}}
                />
                <Input
                  placeholder=' user name'
                  leftIcon={{ type: 'font-awesome', name: 'user',color:"white" }}
                  inputStyle={{color:"white"}}
                />
                <Input 
                  placeholder=' your password'
                  leftIcon={{ type: 'font-awesome', name: 'key',color:"white" }}
                  inputStyle={{color:"white"}}
                  onChangeText={text => this.setPassword(text)}
                />
                <Input 
                  placeholder=' confirm your password'
                  leftIcon={{ type: 'font-awesome', name: 'key',color:"white" }}
                  inputStyle={{color:"white"}}
                  onChangeText={text => this.setcPassword(text)}
                />
                </View>
                <View style={styles.iconcontainer}>
                  <Button title="register" containerStyle={{width:width*0.2}}
                   onPress={() => {
                    if(this.state.cPassword==this.state.password) this.props.navigation.goBack();
                    else alert("error")
                   }}/>
                  <Text style={{width: width*0.2}}/>
                  <Button title="cancel" containerStyle={{width:width*0.2}}
                    onPress={() => {
                      this.props.navigation.goBack();
                    }}/>
                </View>
                
              </ScrollView>
              
        );
    }
}

const styles = StyleSheet.create({
  container:{
    // position:'absolute',
    // top:0,
    // height:height,
    // width:width,
    backgroundColor: 'darkorange',
    // padding: 20
  },
  text:{
    textAlign: 'center',
    color: "white",
    fontSize: 20,
  },
  mainpart:{
    flex:1,
    padding:20,
    width:width,
  },
  iconcontainer:{
    flex:1,
    // justifyContent:'center',
    flexDirection: "row",
  }
})



// export default class Register extends React.Component {
//   render() {
//     return <RegisterPage />;
//   }
// }

