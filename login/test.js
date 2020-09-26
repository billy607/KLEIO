import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import College from './components/College'

const data=['Reitz Union','Marston Library','Turlington Hall','Plaza of the Americas','Racquet','Ben Hill Griffin Stadium']
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
          <Text style={styles.Title}>
            Your Tour Summary
          </Text>
        {data.map((item,index)=>(
          this.state.visited[index]==1?
            <College title={data[index]}/>
            :
          null
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    Title:{
      fontSize: 30,
      fontWeight: "bold",
      textAlign: "left",
      textAlignVertical: "center",
      paddingLeft:15
    },
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  });