import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const data=['visit reitz union','visit marston lib','visit turlington','visit plaza','visit racquet','visit griffin']
export default class App extends React.Component {
  constructor(props) {
    super(props);
    const {visited}=this.props.route.params
    this.state = {
      visited: visited
    };
  }
  render() {
    return (
     <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
        {/* Rest of the app comes ABOVE the action button component !*/}
        {data.map((item,index)=>(
          this.state.visited[index]==1?<Text>{data[index]}</Text>:null
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  });