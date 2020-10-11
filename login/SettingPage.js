import * as React from 'react';
import { 
  Button, 
  Text, 
  Image, 
  Dimensions,
  View } from 'react-native';


var {height, width} = Dimensions.get('window'); 
export default class SettingPage extends React.Component{
  constructor(props) {
    super(props);

    this.props.navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => this.addCount()} title="Update count" />
      )
    })

    this.state={
      count: 0,
    }

  }

  addCount() {
    this.setState({count: this.state.count + 1});
  }

  render(){
    
    return (
      <View style={{flex:1}}>
          <Text>Count: {this.state.count}</Text>
      </View>
    )
  } 
}
