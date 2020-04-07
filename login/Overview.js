import React, { Component,PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Dimensions,
  View,
  SafeAreaView,
  ImageBackground
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MapPage from './MapPage';
import { ScrollView } from 'react-native-gesture-handler';

var {height, width} = Dimensions.get('window'); 
class Overview extends PureComponent {
    render() {
        return(
            <SafeAreaView style={styles.safeContainer}>
            <ScrollView style={styles.container}>
                <ImageBackground source={require('./image/stadium.png')} style={{resizeMode: "cover", justifyContent: "center"}} imageStyle={{opacity:0.4}}>
                    <Text style={styles.title}>University of Florida</Text>
                    <View style={styles.image}>
                    <Image source={require('./image/gator.png')} style={{height: height*0.1}} resizeMode="contain"/>
                </View>
                </ImageBackground>
                <Text style={styles.subTitle}>
                    Description
                </Text>
                <Text style={styles.body}>The University of Florida (commonly referred to as Florida or UF) is a public land-grant, sea-grant, and
space-grant research university in Gainesville, Florida. It is a senior member of the State University
System of Florida. The university traces its origins to 1853 and has operated continuously on its
Gainesville campus since September 1906.{'\n'}{'\n'}
The University of Florida is one of sixty-two elected member institutions of the Association of American
Universities (AAU), the association of preeminent North American research universities, and the only
AAU member university in Florida. The university is classified as a Research University with Very High
Research by the Carnegie Foundation for the Advancement of Teaching. After the Florida state
legislature&#39;s creation of performance standards in 2013, the Florida Board of Governors designated the
University of Florida as one of the three &quot;preeminent universities&quot; among the twelve universities of the
State University System of Florida. For 2019, U.S. News &amp; World Report ranked Florida as the eighth
(tied) best public university in the United States.{'\n'}{'\n'}
The university is accredited by the Southern Association of Colleges and Schools (SACS). It is the third
largest Florida university by student population and is the eighth largest single-campus university in the
United States with 54,906 students enrolled for the fall 2018 semester. The University of Florida is home
to sixteen academic colleges and more than 150 research centers and institutes. It offers multiple graduate
professional programs—including business administration, engineering, law, dentistry, medicine, and
veterinary medicine—on one contiguous campus, and administers 123 master&#39;s degree programs and
seventy-six doctoral degree programs in eighty-seven schools and departments. The university&#39;s seal is
also the seal of the state of Florida which is on the state flag.{'\n'}{'\n'}
The University of Florida&#39;s intercollegiate sports teams, commonly known by their &quot;Florida Gators&quot;
nickname, compete in National Collegiate Athletic Association (NCAA) Division I and the Southeastern
Conference (SEC). In their 111-year history, the university&#39;s varsity sports teams have won 40 national
team championships, 35 of which are NCAA titles, and Florida athletes have won 275 individual national
championships. In addition, University of Florida students and alumni have won 126 Olympic medals
including 60 gold medals.{'\n'}</Text>
            </ScrollView>
            </SafeAreaView>
        ) 
    };
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        marginBottom:20,
        
    },
    container:{
        flex:1,
        backgroundColor:'white', 
        height:height,
        
    },
    title: {
        fontSize: 35, 
        fontWeight: "bold",
        textAlign: 'center',
        lineHeight:100,
        fontFamily: 'sans-serif-medium'
    },
    image: {
        flex:1,
        alignItems:"center",
        paddingBottom: 20
    },
    subTitle: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "left",
        lineHeight: 50,
        paddingHorizontal:15
    },
    body:{
        textAlign:"justify",
        fontSize: 16,
        paddingHorizontal:15
    }
})

const Stack = createStackNavigator();
function MyStack() {
    return (
      <Stack.Navigator initialRouteName='Overview' headerMode='none'>
        <Stack.Screen name="Home" component={Overview} />
        <Stack.Screen name="MapPage" component={MapPage} />
      </Stack.Navigator>
    );
  }

export default class App extends React.Component {
render() {
    return (
    <MyStack/>
    )
}
}