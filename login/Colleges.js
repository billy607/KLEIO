import React, { Component,PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Dimensions,
  View,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MapPage from './MapPage';
import { ScrollView } from 'react-native-gesture-handler';

var {height, width} = Dimensions.get('window'); 
const bottomBlank=100;

class Overview extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const state = this.state;
        return(
            <SafeAreaView style={styles.safeContainer}>
            <ScrollView 
                style={styles.container} 
                showsVerticalScrollIndicator={null}
                ref={ref => {this.scrollView = ref}} 
                onMomentumScrollEnd={(e)=>(e.nativeEvent.contentOffset.y)>(e.nativeEvent.contentSize.height-bottomBlank-(height-StatusBar.currentHeight-50))
                    ?this.scrollView.scrollTo({y:e.nativeEvent.contentSize.height-bottomBlank-(height-StatusBar.currentHeight-50),animated:true})
                    :null}
                >

                {/*Beginging of content display dropdowns*/}
                
                <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                    <Text style={styles.title}>
                        AGRICULTURAL AND LIFE SCIENCES
                    </Text>    
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                    <Text style={styles.title}>
                        ARTS
                    </Text>    
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                    <Text style={styles.title}>
                        BUSINESS, WARRINGTON COLLEGE
                    </Text>    
                </TouchableOpacity>
                
                <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                    <Text style={styles.title}>
                        DENTISTRY
                    </Text>    
                </TouchableOpacity>
                
                <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                    <Text style={styles.title}>
                        DESIGN, CONSTRUCTION AND PLANNING
                    </Text>    
                </TouchableOpacity>
                
                <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                    <Text style={styles.title}>
                        EDUCATION
                    </Text>    
                </TouchableOpacity>
                
                <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                    <Text style={styles.title}>
                        ENGINEERING, HERBERT WERTHEIM COLLEGE
                    </Text>    
                </TouchableOpacity>
                
                <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                    <Text style={styles.title}>
                        HEALTH AND HUMAN PERFORMANCE
                    </Text>    
                </TouchableOpacity>
                
                <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                    <Text style={styles.title}>
                        JOURNALISM AND COMMUNICATIONS
                    </Text>    
                </TouchableOpacity>
                
                <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                    <Text style={styles.title}>
                        LAW, LEVIN COLLEGE
                    </Text>    
                </TouchableOpacity>
                
                <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                    <Text style={styles.title}>
                        LIBERAL ARTS AND SCIENCES
                    </Text>    
                </TouchableOpacity>
                
                <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                    <Text style={styles.title}>
                        MEDICINE
                    </Text>    
                </TouchableOpacity>
                
                <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                    <Text style={styles.title}>
                        NURSING
                    </Text>    
                </TouchableOpacity>
                
                <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                    <Text style={styles.title}>
                        PHARMACY
                    </Text>    
                </TouchableOpacity>
                
                <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                    <Text style={styles.title}>
                        PUBLIC HEALTH AND HEALTH PROFESSIONS
                    </Text>    
                </TouchableOpacity>
                
                <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                    <Text style={styles.title}>
                        VETERINARY MEDICINE
                    </Text>    
                </TouchableOpacity>

                <View style={{height:bottomBlank}}/>
                
            </ScrollView>
            </SafeAreaView>
        ) 
    };
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        marginBottom:25,
        
    },
    dropdown: {
        flexDirection:"row",
        borderTopWidth: .5,
        backgroundColor: "#d3d3d3",
    },
    container:{
        flex:1,
        backgroundColor:'white', 
        height:height,
        
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "left",
        paddingLeft:15,
        lineHeight: 50,
    },
    image: {
        flex:1,
        alignItems:"center",
        paddingBottom: 20
    },
    contentheader: {
        fontSize: 20,
        textAlign: "left",
        lineHeight: 40,
        paddingLeft: 35, 
        fontWeight: "bold",            
    },

    contentBody1:{
        textAlign:"justify",
        fontSize: 16,
        paddingHorizontal: 15,
        marginVertical:10
    },
    contentBody2:{
        textAlign:"justify",
        fontSize: 16,
        paddingLeft: 30,
        paddingRight: 15,
        marginVertical:5
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
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