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
                <View style={{flex:1, justifyContent:'center'}}><Text style={styles.text}>Create Account</Text></View>
                <View style={styles.mainpart}>
                <Input
                  placeholder=' your email address'
                  leftIcon={{ type: 'font-awesome', name: 'envelope',color:"white" }}
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
                  <View style={{flex:0.5}}/>
                  <View style={{flex:1}}>
                    <Button title="REGISTER" titleStyle={{fontSize:15}} containerStyle={{width:width*0.3}}
                    onPress={() => {
                      if(this.state.cPassword==this.state.password) this.props.navigation.goBack();
                      else alert("error")
                    }}/>
                  </View>
                  <View style={{flex:1, alignItems:'center'}}>
                    <Text style={{fontSize:20}}>or</Text>
                    <Text style={{fontSize:20}}>continue with</Text>
                  </View>
                  <View style={{flex:1,flexDirection: "row"}}>
                    <SocialIcon
                      type='facebook'
                    />
                    <View style={{width:width*0.3}}/>
                    <SocialIcon
                      type='google'
                    />
                  </View>
                  <View style={{flex:1}}></View>
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
    fontSize: 25,
  },
  mainpart:{
    flex:1,
    padding:20,
    width:width,
  },
  iconcontainer:{
    flex:2,
    alignItems: 'center',
    marginTop:20
  }
})



// export default class Register extends React.Component {
//   render() {
//     return <RegisterPage />;
//   }
// }