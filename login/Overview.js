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
  Linking,TouchableOpacity
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MapPage from './MapPage';
import { ScrollView } from 'react-native-gesture-handler';
import Panel from './components/Panel';
import { Table, Row, Rows } from 'react-native-table-component';
import { useNavigation } from '@react-navigation/native';

var {height, width} = Dimensions.get('window'); 
var tableData = [
    ['Application', 'November 1'],
    ['SSAR', 'December 1'],
    ['Test Scores', 'December 15']
  ];
var tableTitle = ['Requirement', 'Deadline'];

var table2Data = [
    ['In-State Tuition', '6,380$', '12,740$'],
    ['Out of State Tuition', '28,658$', '30,134$'],
    ['Housing (on-campus)', '5,990$', '7,130$']
  ];

var table2Title = ['','Requirement', 'Deadline'];
const bottomBlank=200;
var visited=[0,0,0,0,0,0]
export default class Overview extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const state = this.state;
        // {this.props.route.params?
        //     (v=Object.values(this.props.route.params)[0],
             
        //     )
        //     :null}
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
                <ImageBackground source={require('./image/stadium.png')} style={{resizeMode: "cover", justifyContent: "center"}} imageStyle={{opacity:0.4}}>
                    <Text style={styles.title}>University of Florida</Text>
                    <View style={styles.image}>
                    <TouchableOpacity  onPress={() => {this.props.navigation.navigate('MapPage', {visited:this.props.route.params?Object.values(this.props.route.params)[0]:[0,0,0,0,0,0]});}}>
                    <Image source={require('./image/gator.png')} style={{height: height*0.1}} resizeMode="contain"/>
                    </TouchableOpacity>
                </View>
                </ImageBackground>

                {/*Beginging of content display dropdowns*/}
                
                <Panel show={true} title="Description">
                        <Text style={styles.contentBody1}>The University of Florida was established in Gainesville in 1906. It is the third largest university in the state of Florida by student population, and the eighth largest single-campus university in the United States. 
                    The University of Florida strives to achieve academic excellence by offering a wide range of undergraduate and graduate programs to students. 
                    The University encompasses sixteen colleges and over 150 research centers and Institutes. UF has been designated by the Florida Board of Governors as one of the three “preeminent universities” among the twelve universities of the State University System of Florida. 
                    Let’s explore the University of Florida!</Text>
                </Panel>
                <Panel title="Ranking" >
                    <Text style={styles.contentBody1}>
                        #34 Nationally
                    </Text>
                </Panel>
                <Panel title="Acceptance">
                    <Panel title="Freshman" containerStyle={styles.secondLevelDropDown} titleStyle={styles.secLvlSubTitle}>
                        
                        <Text style={styles.contentBody1}>Freshman Applications open each year in August.</Text>
                        <View style = {{paddingHorizontal: 15}}>
                            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                <Row data={tableTitle} style={styles.head} textStyle={styles.text}/>
                                <Rows data={tableData} textStyle={styles.text}/>
                            </Table>
                        </View>
                        <Text style={styles.contentBody1}>SAT (Min Requirement):</Text>
                        <Text style={styles.contentBody2}> Reading = 24 </Text>
                        <Text style={styles.contentBody2}> Writing and Language = 25</Text>
                        <Text style={styles.contentBody2}> Math = 24</Text>
                        
                        <Text style={styles.contentBody1}>ACT (Min Requirement):</Text>
                        <Text style={styles.contentBody2}> Writing and Language = 25 </Text>
                        <Text style={styles.contentBody2}> Math = 24</Text>
                    </Panel>
                    <Panel title="Transfer Students" containerStyle={styles.secondLevelDropDown} titleStyle={styles.secLvlSubTitle}>
                        
                        <Text style={styles.contentBody1}>Requirement:</Text>
                        <Text style={styles.contentBody2}>Minimum of 60 transferable semester credit hours from a regionally accredited institution </Text>
                        <Text style={styles.contentBody2}>OR</Text>
                        <Text style={styles.contentBody2}>Associate of Arts Degree from a Florida Public Institution</Text>

                        <Text style={styles.contentBody1}>Foreign Language Proficiency: </Text>
                        <Text style={styles.contentBody2}>High school transcript showing that you completed two years of the same foreign language</Text>
                        <Text style={styles.contentBody2}>OR</Text>
                        <Text style={styles.contentBody2}>completing 8-10 semester hours of the same foreign language</Text>

                        <Text style={styles.contentBody1}>2.0 Overall GPA and a Minimum 2.0 GPA from last attended institution</Text>

                        <Text style={styles.contentBody1}>Completed or will complete specific requirements for your intended major before attending UF</Text>

                        <Text style={styles.contentBody1}>You are in good standing and eligible to return to any institution previously attended</Text>
                    </Panel>

                    <Panel title="Foreign Students" containerStyle={styles.secondLevelDropDown} titleStyle={styles.secLvlSubTitle}></Panel>
                </Panel>
                
                <Panel title="Colleges">
                    <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                        <Text style={styles.contentBody1}>
                            AGRICULTURAL AND LIFE SCIENCES
                        </Text>    
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} style={styles.dropdown} onPress={()=>this.props.navigation.push("CollegeDetails")}>
                        <Text style={styles.contentBody1}>
                            ARTS
                        </Text>    
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                        <Text style={styles.contentBody1}>
                            BUSINESS, WARRINGTON COLLEGE
                        </Text>    
                    </TouchableOpacity>
                    
                    <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                        <Text style={styles.contentBody1}>
                            DENTISTRY
                        </Text>    
                    </TouchableOpacity>
                    
                    <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                        <Text style={styles.contentBody1}>
                            DESIGN, CONSTRUCTION AND PLANNING
                        </Text>    
                    </TouchableOpacity>
                    
                    <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                        <Text style={styles.contentBody1}>
                            EDUCATION
                        </Text>    
                    </TouchableOpacity>
                    
                    <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                        <Text style={styles.contentBody1}>
                            ENGINEERING, HERBERT WERTHEIM COLLEGE
                        </Text>    
                    </TouchableOpacity>
                    
                    <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                        <Text style={styles.contentBody1}>
                            HEALTH AND HUMAN PERFORMANCE
                        </Text>    
                    </TouchableOpacity>
                    
                    <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                        <Text style={styles.contentBody1}>
                            JOURNALISM AND COMMUNICATIONS
                        </Text>    
                    </TouchableOpacity>
                    
                    <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                        <Text style={styles.contentBody1}>
                            LAW, LEVIN COLLEGE
                        </Text>    
                    </TouchableOpacity>
                    
                    <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                        <Text style={styles.contentBody1}>
                            LIBERAL ARTS AND SCIENCES
                        </Text>    
                    </TouchableOpacity>
                    
                    <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                        <Text style={styles.contentBody1}>
                            MEDICINE
                        </Text>    
                    </TouchableOpacity>
                    
                    <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                        <Text style={styles.contentBody1}>
                            NURSING
                        </Text>    
                    </TouchableOpacity>
                    
                    <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                        <Text style={styles.contentBody1}>
                            PHARMACY
                        </Text>    
                    </TouchableOpacity>
                    
                    <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                        <Text style={styles.contentBody1}>
                            PUBLIC HEALTH AND HEALTH PROFESSIONS
                        </Text>    
                    </TouchableOpacity>
                    
                    <TouchableOpacity activeOpacity={0.5} style={styles.dropdown}>
                        <Text style={styles.contentBody1}>
                            VETERINARY MEDICINE
                        </Text>    
                    </TouchableOpacity>
                </Panel>

                <Panel title="Tuition Cost">
                    <View style = {{paddingHorizontal: 15,marginVertical: 10}}>
                        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                            <Row data={table2Title} style={styles.head} textStyle={styles.text}/>
                            <Rows data={table2Data} textStyle={styles.text}/>
                        </Table>
                    </View>
                </Panel>

                <Panel title='Organizations'>
                    <Text style={styles.contentBody1}>Academic/Honor Organizations</Text>
                    <Text style={styles.contentBody1}>Fraternities {'&'} Cultural Organizations:</Text>
                    <Text style={styles.contentBody1}>Introductions to Clubs</Text>
                    <Text style={styles.contentBody2}>There are over 1000 Clubs and organizations at the University of Florida and we want to help you find the right one for you!</Text>
                    <Text style={styles.url} onPress={() => Linking.openURL('https://studentinvolvement.ufl.edu/')}>(https://studentinvolvement.ufl.edu/)</Text>
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
        textAlignVertical: "center",
        paddingLeft: 15
    },
    secLvlSubTitle: {
        fontSize: 20,
        textAlign: "left",
        textAlignVertical: "center",
        paddingLeft: 15,
        fontWeight: "bold",            
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
    url:{
        textAlign:"justify",
        fontSize: 16,
        paddingLeft: 30,
        paddingRight: 15,
        color:'blue'
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
        borderTopWidth: .5,
        backgroundColor: "aliceblue",
        height: height*(1/15)
    },
    secondLevelDropDown: {
        flexDirection:"row",
        height: height*(1/20)
        //borderWidth: .5,
        //backgroundColor: "#d3d3d3",
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
})

