import React, {Component} from 'react';
import { 
  Dimensions,
  View,
  Text } from 'react-native';
import { Button, CheckBox } from 'react-native-elements'

var interest=[
    {name:"sports",value:false},
    {name:"basketball",value:false},
    {name:"singing",value:false},
    {name:"CS",value:false},]
export default class RegisterQuestions extends Component{
    constructor(props) {
        super(props);
        this.state = {
          interest:[
            {name:"sports",value:false},
            {name:"basketball",value:false},
            {name:"singing",value:false},
            {name:"CS",value:false},]
        };
       }
    checkBox(index){
        var list=this.state.interest
        list[index].value=!list[index].value
        this.setState({interest:list})

    }
    render(){
      
      return (
        <View>
            <Text>Your interest</Text>
            {this.state.interest.map((content,index)=>(
                <CheckBox
                title={content.name}
                checked={content.value}
                onPress={() => this.checkBox(index)}
                />
            )) 
            }
            <Button title='NEXT' buttonStyle={{width:100}} containerStyle={{alignItems:'flex-end',marginEnd:10}} onPress={()=>this.props.navigation.navigate('Home')}></Button>
        </View>
      )
    } 
  }
  