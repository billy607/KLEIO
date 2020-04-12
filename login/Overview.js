import React, { Component,PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Dimensions,
  View,
  SafeAreaView,
  ImageBackground,
  Table
} from 'react-native';
import {Icon} from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import MapPage from './MapPage';
import { ScrollView } from 'react-native-gesture-handler';
import Panel from './components/Panel';

var {height, width} = Dimensions.get('window'); 
class Overview extends PureComponent {
    constructor(props) {
        super(props);
    
    }
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

                {/*Beginging of content display dropdowns*/}
                <Panel show={true} title="Description" level="1" content="The University of Florida was established in Gainesville in 1906. It is the third largest university in the state of Florida by student population, and the eighth largest single-campus university in the United States. 
                    The University of Florida strives to achieve academic excellence by offering a wide range of undergraduate and graduate programs to students. 
                    The University encompasses sixteen colleges and over 150 research centers and Institutes. UF has been designated by the Florida Board of Governors as one of the three “preeminent universities” among the twelve universities of the State University System of Florida. 
                    Let’s explore the University of Florida!"/>
                <Panel title="Ranking" level="1" content="#34 Nationally"/>
                <Panel title="Acceptance" level="1" content="abc">
                    <Panel title="Freshman" level="2" content="#34 Nationally"/>
                    <Panel title="Transfer Students" level="2" content="#34 Nationally"/>
                </Panel>
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
        paddingLeft:15
    },
    contentheader: {
        fontSize: 20,
        textAlign: "left",
        lineHeight: 40,
        paddingLeft: 35, 
        fontWeight: "bold",            
    },

    body:{
        textAlign:"justify",
        fontSize: 16,
        paddingHorizontal:15,
        
    },
    dropdown: {
        flexDirection:"row",
        borderWidth: .5,
        backgroundColor: "#c0c0c0",
    },
    secondLevelDropDown: {
        flexDirection:"row",
        borderWidth: .5,
        backgroundColor: "#d3d3d3",
    },

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