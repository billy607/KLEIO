import { lightBlue } from '@material-ui/core/colors';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { startClock } from 'react-native-reanimated';
import College from './components/College'

const titles = ['Reitz Union','Marston Library','Turlington Hall','Plaza of the Americas','Racquet','Ben Hill Griffin Stadium']

const Degrees = [
                  'A four-year undergraduate program and combination-degree program with joint award of bachelor’s and master’s degrees. Minors available as well.',
                  '\n\t\u2022 Bachelors\n\t\u2022 Masters\n\t\u2022 PHDs\n\t\u2022 Minors Combined Degrees',  
                ]

const Reqrmts = [
                  '\n\t\u2022 2.5  - 2.8 GPA is required in critical-tracking courses depending on major' +
                  '\n\t\u2022 2.0 GPA is required for all courses in the college' +
                  '\n\t\u2022 2.0 GPA is required in all courses in the department' +
                  '\n\t\u2022 2.0 GPA is required in all courses taken after being classified as an upper division student' +
                  '\n\t\u2022 2.0 cumulative GPA is required in all work attempted at the university',

                  '\nMiddle 50 Percent' +
                  '\n\t\u2022 GPA: 4.4 - 4.6' +
                  '\n\t\u2022 ACT: 30 - 33' +
                  '\n\t\u2022 SAT: 1320 - 1460' +
                  '\n\t\u2022 Application Deadline: November 1st'
                ]

const Programs = [
                  '\n\t\u2043 \tAerospace Engineering' +
                  '\n\t\u2043 \tMechanical Engineering',

                  '\n\t\u2043 \tAccounting' +
                  '\n\t\u2043 \tFinance'
                ]

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
     <ScrollView style={{flex:1, backgroundColor: '#f3f3f3'}}>
        {/* Rest of the app comes ABOVE the action button component !*/}
          <Text style = {styles.Title}>
            Your Tour Summary
          </Text>
          <Text style = {styles.subTitle}>
            <Text style = {{color: 'blue', textDecorationLine: "underline"}}>Achievements: </Text>
          </Text>
          <View style={{flex: 1, flexDirection: 'row', alignItems: "center", paddingHorizontal: 15}}>
            <Image source = {require('./image/star.png')} style = {{height:80, width:80, resizeMode: "contain"}}/>
            <Text style = {{fontSize: 15, fontWeight: "bold"}}> {'\u2605'} Master Explorer Award</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: "center", paddingHorizontal: 15}}>
            <Image source = {require('./image/gator_engineer.png')} style = {{height:80, width:80, resizeMode: "contain"}}/>
            <Text style = {{fontSize: 15, fontWeight: "bold"}}> {'\u2605'} Gator Engineer</Text>
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginHorizontal: 15,
              paddingVertical: 10
            }}
          />

        {titles.map((item,index)=>(
          this.state.visited[index]==1
            ?
              <View>
                <College 
                title = {titles[index]} 
                degrees = {Degrees[index]} 
                requirements = {Reqrmts[index]}
                programs = {Programs[index]}/>

                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginHorizontal: 15,
                    paddingVertical: 10
                  }}
                />
              </View>
            :null
        ))}
      </ScrollView>
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
    subTitle:{
      fontSize: 17,
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