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
  Linking
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MapPage from './MapPage';
import { ScrollView } from 'react-native-gesture-handler';
import Panel from './components/Panel';
import { Table, Row, Rows } from 'react-native-table-component';

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
const bottomBlank=100;
const fill=10;
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
                <ImageBackground source={require('./image/college_of_the_arts.jpg')} style={{resizeMode: "cover", justifyContent: "center"}} imageStyle={{opacity:0.4}}>
                    <Text style={styles.title}>College of Arts</Text>
                    <View style={styles.image}>
                    <Image source={require('./image/gator.png')} style={{height: height*0.1}} resizeMode="contain"/>
                </View>
                </ImageBackground>

                {/*Beginging of content display dropdowns*/}
                
                <Panel show={true} title="Mission">
                        <Text style={styles.contentBody1}>The College of the Arts fosters creative activity, 
                        scholarly and artistic excellence and innovation across disciplines.  
                        We achieve the university’s mission by training professionals and educating 
                        students as artists and scholars, while developing their critical thinking and 
                        inspiring a culture of curiosity and imagination.
                        </Text>
                </Panel>
                <Panel title="Overview" >
                    <Text style={styles.contentBody1}>
                    Previously named the College of Fine Arts, the college's name was changed on May 12, 2014, citing Dean Lucinda Lavelli's statement: "We have been considering this transition for several years and believe that the College of the Arts is more encompassing of the extensive activities and offerings of our college. We have vibrant visual and performing arts programs, and the term 'Fine' no longer holds the same currency that it did when our college was established."
                    {'\n\n'}The College of the Arts is one of 16 colleges and more than 150 research centers and institutes at the University of Florida. The College of the Arts offers bachelor's, master's and Ph.D. degree programs in its three fully accredited schools — the School of Art and Art History, School of Music, and School of Theatre and Dance. The college is also home to the Center for Arts in Medicine, Center for World Arts, Digital Worlds Institute, University Galleries and the New World School of the Arts in Miami.
                    {'\n\n'}More than 100 faculty members and more than 1,220 students work together daily to engage, inspire and create. The college hosts more than 300 performances, exhibitions and events each year. Faculty and students also exhibit and perform at other local, national and international venues.
                    {'\n\n'}The College offers in person and online alternative for students interested in pursuing a degree in the College of Arts
                    </Text>
                </Panel>
                <Panel title="Programs" >
                    <Panel title="Undergraduate" containerStyle={styles.secondLevelDropDown} titleStyle={styles.secLvlSubTitle}>
                        <Panel title="Art History" containerStyle={styles.thirdLevelDropDown} titleStyle={styles.thirdLvlSubTitle}>
                            <Text style={styles.contentBody2}>Course Listings: </Text>
                            <Text style={styles.url} onPress={()=>Linking.openURL("https://arts.ufl.edu/academics/art-and-art-history/programs/art-history/course-listing-s17/")}>https://arts.ufl.edu/academics/art-and-art-history/programs/art-history/course-listing-s17/</Text>
                        </Panel>

                        <View style={{height:fill}}></View>

                        <Panel title="Graphic Design/Design and Visual Communication" containerStyle={styles.thirdLevelDropDown} titleStyle={styles.thirdLvlSubTitle}>
                            <Text style={styles.contentBody2}>*{'\t'}BFA in Graphic Design:</Text>
                            
                            <Text style={styles.contentBody3}>*{'\t'}Overview: {'\n'}The BFA in Graphic Design prepares students for careers in areas, such as experience, branding, UX/UI and other areas of design.</Text>
                            <Text style={styles.contentBody3}>*{'\t'}Applications: {'\n'}Made during Sophomore year</Text>
                            <Text style={styles.urlInBody3} onPress={()=>Linking.openURL("https://arts.ufl.edu/academics/art-and-art-history/programs/design-and-visual-communications/admissions-information/undergraduate/#transfer-students")}>*{'\t'}Requirements: </Text>
                            
                            <Text style={styles.contentBody4}>*{'\t\t'}No more than 60 credit hours can be transferred</Text>
                            <Text style={styles.contentBody4}>*{'\t\t'}GPA: 3.0 required in the following courses:</Text>
                            
                            <Text style={styles.contentBody5}>*{'\t\t'}2-Dimensional Design</Text>
                            <Text style={styles.contentBody5}>*{'\t\t'}3-Dimensional Design</Text>
                            <Text style={styles.contentBody5}>*{'\t\t'}Drawing 1</Text>
                            <Text style={styles.contentBody5}>*{'\t\t'}Drawing 2</Text>
                            <Text style={styles.contentBody5}>*{'\t\t'}Art History 1 (Survey of western art from ancient to renaissance)</Text>
                            <Text style={styles.contentBody5}>*{'\t\t'}Art History 2 (Survey of western art from renaissance through modern)</Text>
                            <Text style={styles.contentBody5}>*{'\t\t'}An additional studio course in graphic design, preferably focusing on design theories, methods, and processes</Text>
                            <Text style={styles.contentBody5}>*{'\t\t'}An additional studio course in graphic design, preferably focusing on typography</Text>


                            <Text style={styles.urlInBody2} onPress={()=>Linking.openURL("https://catalog.ufl.edu/UGRD/colleges-schools/UGART/ART_UCT07/")}>*{'\t'}Graphic Design Certificate:</Text>

                            <Text style={styles.contentBody3}>The curriculum helps students gain a better understanding of graphic design thinking, processes, methods, and practices in order to create effective graphic and communication design works. The courses in the curriculum are considered essential by faculty to achieve this goal.</Text>
                        
                            <Text style={styles.contentBody4}>*{'\t\t'}Studio art related majors (art, art education, design and visual communications and visual art studies) have priority access to 2000-level certificate courses. Students must work with the SA+AH advisor to gain access to these courses.</Text>
                            <Text style={styles.contentBody4}>*{'\t\t'}12 of the 15 total credits and all 3000-level coursework must be taken at UF.</Text>
                        </Panel>

                        <View style={{height:fill}}></View>

                        <Panel title="Studio Art" containerStyle={styles.thirdLevelDropDown} titleStyle={styles.thirdLvlSubTitle}>
                            <Text style={styles.urlInBody2} onPress={()=>Linking.openURL("https://arts.ufl.edu/academics/art-and-art-history/programs/studio-art/art-technology/overview/")}>*{'\t'}Art + Technology:</Text>
                            
                            <Text style={styles.contentBody3}>"The Art + Technology program prepares students to become artists by facilitating the conceptual, technical, and creative development of an informed and critical practice. The program approaches forms and technologies located at the "cutting-edge" of science and commerce as sites of potential creative discourse, simultaneously realizing alternative possibilities and connections with the continuing dialogue of art."</Text>
                            <Text style={styles.urlInBody2} onPress={()=>Linking.openURL("https://arts.ufl.edu/academics/art-and-art-history/programs/studio-art/ceramics/overview/")}>*{'\t'}Ceramics: </Text>
                            
                            <Text style={styles.contentBody3}>"The program promotes growth in aesthetics, technical knowledge, and conceptual approaches. The program uses Individual tutorials, group seminars, and critiques to provide a variety of settings for development and exchange of ideas relevant to the arts in general, and ceramics in particular."</Text>

                            <Text style={styles.urlInBody2} onPress={()=>Linking.openURL("https://arts.ufl.edu/academics/art-and-art-history/programs/studio-art/creative-photography/overview/")}>*{'\t'}Creative Photography:</Text>
                            <Text style={styles.contentBody3}>"The program aims to educate students in the fields of photographic processes, visual inquiry, critical theory, relational art, video, sculpture and performance. "</Text>
                        
                            <Text style={styles.urlInBody2} onPress={()=>Linking.openURL("https://arts.ufl.edu/academics/art-and-art-history/programs/studio-art/drawing/overview/")}>*{'\t'}Drawing:</Text>
                            <Text style={styles.contentBody3}>"Students are taught how to create strong statements of personal expression by use of drawing. Through a range of drawing courses students hone their individual voice and vision and construct their visual language."</Text>

                            <Text style={styles.urlInBody2} onPress={()=>Linking.openURL("https://arts.ufl.edu/academics/art-and-art-history/programs/studio-art/painting/overview/")}>*{'\t'}Painting:</Text>
                            <Text style={styles.contentBody3}>The BFA curriculum in painting takes students through an artistic journey that begins with mastery of fundamental (2000 level) theory and practice courses and culminates in an advanced course (4000 level) that places students into the dedicated senior painting studios to develop the critical and conceptual skills needed to realize a personal painterly vision. Throughout the curriculum students will learn the skills necessary to explore careers in graphic design, project managers to artists, and artist assistants.</Text>

                            <Text style={styles.urlInBody2} onPress={()=>Linking.openURL("https://arts.ufl.edu/academics/art-and-art-history/programs/studio-art/printmaking/overview/")}>*{'\t'}Printmaking:</Text>
                            <Text style={styles.contentBody3}>The program aims to is to introduce students to the basic nature of printmaking, in a historical and conceptual aspect, and to examine the purpose, function and aesthetics of this art form within the larger scheme of the art world. Upon completion of the program Students will understand the process and concepts which will enable them to compete for the best jobs and graduate programs available.</Text>

                            <Text style={styles.urlInBody2} onPress={()=>Linking.openURL("https://arts.ufl.edu/academics/art-and-art-history/programs/studio-art/sculpture/overview/")}>*{'\t'}Sculpture:</Text>
                            <Text style={styles.contentBody3}>"The Bachelor of Fine Arts degree program in sculpture is designed to promote a serious investigation into all facets of contemporary sculpture including history, theory, technical processes, conceptual strategies and formal issues specific to the study of sculpture. Students are taught the requirements of a professional career and guided in the building of a professional portfolio including resume, artist statement, professional quality slides, publicity materials, and reviews."</Text>

                        </Panel>
                    </Panel>
                    <Panel title="Graduate" containerStyle={styles.secondLevelDropDown} titleStyle={styles.secLvlSubTitle}>
                        <Panel title="Art History" containerStyle={styles.thirdLevelDropDown} titleStyle={styles.thirdLvlSubTitle}></Panel>

                        <View style={{height:fill}}></View>

                        <Panel title="Graphic Design/ Design and Visual Communications." containerStyle={styles.thirdLevelDropDown} titleStyle={styles.thirdLvlSubTitle}>
                            <Text style={styles.contentBody2}>*{'\t'}MFA in Design and Visual Communications-the MxD:</Text>
                            
                            <Text style={styles.contentBody3}>*{'\t'}60 credits over 3 years (2-year option available)</Text>
                            <Text style={styles.contentBody3}>*{'\t'}Admission is only offered for the fall semester.</Text>
                            <Text style={styles.contentBody3}>*{'\t'}Application Deadline: February 1st</Text>
                        </Panel>
                        <View style={{height:fill}}></View>
                        <Panel title="Studio Art" containerStyle={styles.thirdLevelDropDown} titleStyle={styles.thirdLvlSubTitle}>
                            <Text style={styles.urlInBody2} onPress={()=>Linking.openURL("https://arts.ufl.edu/academics/art-and-art-history/programs/studio-art/art-technology/overview/")}>*{'\t'}Art + Technology:</Text>
                            <Text style={styles.contentBody3}>"The Art + Technology program prepares students to become artists by facilitating the conceptual, technical, and creative development of an informed and critical practice. The program approaches forms and technologies located at the "cutting-edge" of science and commerce as sites of potential creative discourse, simultaneously realizing alternative possibilities and connections with the continuing dialogue of art."</Text>
                            
                            <Text style={styles.urlInBody2} onPress={()=>Linking.openURL("https://arts.ufl.edu/academics/art-and-art-history/programs/studio-art/ceramics/overview/")}>*{'\t'}Ceramics:</Text>
                            <Text style={styles.contentBody3}>"The program promotes growth in aesthetics, technical knowledge, and conceptual approaches. The program uses Individual tutorials, group seminars, and critiques to provide a variety of settings for development and exchange of ideas relevant to the arts in general, and ceramics in particular."</Text>
                            
                            <Text style={styles.urlInBody2} onPress={()=>Linking.openURL("https://arts.ufl.edu/academics/art-and-art-history/programs/studio-art/creative-photography/overview/")}>*{'\t'}Creative Photography:</Text>
                            <Text style={styles.contentBody3}>"The program aims to educate students in the fields of photographic processes, visual inquiry, critical theory, relational art, video, sculpture and performance. "</Text>
                            
                            <Text style={styles.urlInBody2} onPress={()=>Linking.openURL("https://arts.ufl.edu/academics/art-and-art-history/programs/studio-art/drawing/overview/")}>*{'\t'}Drawing:</Text>
                            <Text style={styles.contentBody3}>"Students are taught how to create strong statements of personal expression by use of drawing. Through a range of drawing courses students hone their individual voice and vision and construct their visual language."</Text>
                            
                            <Text style={styles.urlInBody2} onPress={()=>Linking.openURL("https://arts.ufl.edu/academics/art-and-art-history/programs/studio-art/painting/overview/")}>*{'\t'}Painting:</Text>
                            <Text style={styles.contentBody3}>The MFA program expands on the learning of the BFA program and dives deeper into conceptual, aesthetic and technical skills to further develop the student’s understanding of Art. Students have opportunities to participate in the Annual NYC gallery and museum tour, Art Basel Trip and International Study Abroad Programs as well as collaborative opportunities and funding support through programs such as the UF Genetics Institute, SAC (Science and Art Collaboration Program) and Creativity in the Arts and Sciences Program.</Text>
                        
                            <Text style={styles.urlInBody2} onPress={()=>Linking.openURL("https://arts.ufl.edu/academics/art-and-art-history/programs/studio-art/printmaking/overview/")}>*{'\t'}Printmaking:</Text>
                            <Text style={styles.contentBody3}>The Program aims to further student's aesthetic thinking, skills, and career goals. Students participate, both individually and in groups,  in Workshops and critiques of matters of concern to printmakers. The emphasis of the program are in the fields of intaglio and lithography. However, students can pursue path’s in relief printing, screen printing, photoprint processes, vitreography (prints from glass plates), book arts, mixed mediums and other experimental processes</Text>
                        
                            <Text style={styles.urlInBody2} onPress={()=>Linking.openURL("https://arts.ufl.edu/academics/art-and-art-history/programs/studio-art/sculpture/overview/")}>*{'\t'}Sculpture:</Text>
                            <Text style={styles.contentBody3}>"The graduate sculpture program is a professional studio program designed to further the conceptual development, aesthetic presentation, technical skills, and career goals of the M.F.A. candidates in sculpture. The main objective of the program is directed toward the creation of works of art culminating in a significant body of work."</Text>
                        
                            <Text style={styles.urlInBody2} onPress={()=>Linking.openURL("https://arts.ufl.edu/academics/art-and-art-history/programs/studio-art/sculpture/overview/")}>*{'\t'}Sculpture:</Text>
                            <Text style={styles.contentBody3}>"The graduate sculpture program is a professional studio program designed to further the conceptual development, aesthetic presentation, technical skills, and career goals of the M.F.A. candidates in sculpture. The main objective of the program is directed toward the creation of works of art culminating in a significant body of work."</Text>
                        </Panel>
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
        // marginBottom:25,
        
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
    thirdLvlSubTitle: {
        flex:9,
        fontSize: 17,
        textAlign: "left",
        textAlignVertical: "center",
        lineHeight: 20,
        paddingLeft: 20,
        flexWrap: "wrap"
        // fontWeight: "bold",            
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
        fontSize: 15,
        paddingHorizontal: 15,
        marginVertical:10
    },
    contentBody2:{
        textAlign:"justify",
        fontSize: 17,
        paddingLeft: 30,
        paddingRight: 15,
        marginVertical:5
    },
    contentBody3:{
        textAlign:"justify",
        fontSize: 17,
        paddingLeft: 40,
        paddingRight: 15,
        marginVertical:2,
    },
    contentBody4:{
        textAlign:"justify",
        fontSize: 17,
        paddingLeft: 50,
        paddingRight: 15,
        marginVertical:2
    },
    contentBody5:{
        textAlign:"justify",
        fontSize: 17,
        paddingLeft: 60,
        paddingRight: 15,
        marginVertical:2
    },

    url:{
        textAlign:"justify",
        fontSize: 17,
        paddingLeft: 30,
        paddingRight: 15,
        marginVertical:5,
        color:'blue'
    },
    urlInBody2:{
        textAlign:"justify",
        fontSize: 17,
        paddingLeft: 30,
        paddingRight: 15,
        marginVertical:5,
        color:'blue'
    },
    urlInBody3:{
        textAlign:"justify",
        fontSize: 17,
        paddingLeft: 40,
        paddingRight: 15,
        marginVertical:2,
        color:'blue'
    },

    secLvlBody:{
        textAlign:"justify",
        fontSize: 17,
        paddingHorizontal: 15,
        paddingLeft: 45,
        marginVertical:10
    },
    dropdown: {
        flexDirection:"row",
        borderTopWidth: .5,
        backgroundColor: "#d3d3d3",
        height: height*(1/15)
    },
    secondLevelDropDown: {
        flexDirection:"row",
        height: height*(1/20),
        //borderWidth: .5,
        //backgroundColor: "#d3d3d3",
    },
    thirdLevelDropDown: {
        flexDirection:"row",
        alignSelf:"flex-start"
        //borderWidth: .5,
        //backgroundColor: "#d3d3d3",
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