import React, { Component,PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Dimensions,
  View,
  SafeAreaView,
  ImageBackground,
  Table,
  StatusBar
} from 'react-native';
import {Icon} from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import MapPage from './MapPage';
import { ScrollView } from 'react-native-gesture-handler';
import Panel from './components/Panel';
import Animated from 'react-native-reanimated';

var {height, width} = Dimensions.get('window'); 
const bottomBlank=200;
class Overview extends PureComponent {
    constructor(props) {
        super(props);
    
    }
    render() {
        return(
            <SafeAreaView style={styles.safeContainer}>
            <ScrollView 
                style={styles.container} 
                ref={ref => {this.scrollView = ref}} 
                onScrollEndDrag={(e)=>(e.nativeEvent.contentOffset.y)>(e.nativeEvent.contentSize.height-bottomBlank-(height-StatusBar.currentHeight-50))
                    ?this.scrollView.scrollTo({y:e.nativeEvent.contentSize.height-bottomBlank-(height-StatusBar.currentHeight-50),animated:true})
                    :null}>
                <ImageBackground source={require('./image/stadium.png')} style={{resizeMode: "cover", justifyContent: "center"}} imageStyle={{opacity:0.4}}>
                    <Text style={styles.title}>University of Florida</Text>
                    <View style={styles.image}>
                    <Image source={require('./image/gator.png')} style={{height: height*0.1}} resizeMode="contain"/>
                </View>
                </ImageBackground>

                {/*Beginging of content display dropdowns*/}
                <Panel show={true} title="Description">
                        <Text style={styles.body}>The University of Florida was established in Gainesville in 1906. It is the third largest university in the state of Florida by student population, and the eighth largest single-campus university in the United States. 
                    The University of Florida strives to achieve academic excellence by offering a wide range of undergraduate and graduate programs to students. 
                    The University encompasses sixteen colleges and over 150 research centers and Institutes. UF has been designated by the Florida Board of Governors as one of the three “preeminent universities” among the twelve universities of the State University System of Florida. 
                    Let’s explore the University of Florida!</Text>
                </Panel>
                <Panel title="Ranking" >
                    <Text style={styles.body}>
                        #34 Nationally
                    </Text>
                </Panel>
                <Panel title="Acceptance">
                    <Panel title="Freshman" containerStyle={styles.secondLevelDropDown} titleStyle={styles.secLvlSubTitle}>
                        <Text style={styles.secLvlBody}>
                            #34 Nationally
                        </Text>
                    </Panel>
                    <Panel title="Transfer Students" containerStyle={styles.secondLevelDropDown} titleStyle={styles.secLvlSubTitle}>
                        <Text style={styles.secLvlBody}>
                        #34 Nationally
                        </Text>
                    </Panel>
                </Panel>
                <View style={{height:bottomBlank}}/>
                
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
    secLvlSubTitle: {
        fontSize: 20,
        textAlign: "left",
        lineHeight: 40,
        paddingLeft: 30,
        fontWeight: "bold",            
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
        paddingHorizontal: 15,
        marginVertical:10
    },
    secLvlBody:{
        textAlign:"justify",
        fontSize: 16,
        paddingHorizontal: 15,
        paddingLeft: 45,
        marginVertical:10
    },
    dropdown: {
        flexDirection:"row",
        borderWidth: .5,
        backgroundColor: "#c0c0c0",
    },
    secondLevelDropDown: {
        flexDirection:"row",
        //borderWidth: .5,
        //backgroundColor: "#d3d3d3",
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