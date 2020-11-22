import React, {Component} from 'react';	
import { ViewPropTypes } from 'react-native';	
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { Rating, AirbnbRating } from 'react-native-elements';

var {height, width} = Dimensions.get('window'); 

export default class Panel extends Component {
    static propTypes = {
        title: Text.propTypes.style,
        degrees: Text.propTypes.style,		
        requirements: Text.propTypes.style,
        programs: Text.propTypes.style,
        impressions: Text.propTypes.style,
        stars: Text.propTypes.style,
    }; 

    constructor(props) {
        super(props);
        
        this.state = {
            show: this.props.show,
            rate: null,
        };    
    }

    componentDidMount() {
        this.getRating();
    }

    getRating = async () => {
        try {
          console.log('get1 title is ' + this.props.title)
          const value = await AsyncStorage.getItem(this.props.title)
          this.setState({rate: Number(value)})
        } catch(e) {
            console.log(e)
        }
    }

    ratingCompleted = async (rating) => {
        console.log("Rating is: " + rating)
        try {
          await AsyncStorage.setItem(this.props.title, rating.toString())
        } catch (e) {
          console.log(e)
        }
    }

    render(){
        console.log("rate is :"+this.state.rate + "\n")
        
        return (
            <View>
                <View>
                    <Text style={styles.Title}>
                        {this.props.title}
                    </Text>
                </View>

                {this.props.degrees&&
                    <View>
                        <Text style={styles.subTitle}>
                            <Text style={{fontWeight: "bold"}}>Degrees: </Text>{this.props.degrees}
                        </Text>
                    </View>
                }
                
                {this.props.requirements&&
                    <View>
                        <Text style={styles.subTitle}>
                            <Text style={{fontWeight: "bold"}}>Requirements: </Text>{this.props.requirements}
                        </Text>
                    </View>
                }

                {this.props.programs&&
                    <View>
                        <Text style={styles.subTitle}>
                            <Text style={{fontWeight: "bold"}}>Programs: </Text>{this.props.programs}
                        </Text>
                    </View>
                }

                {this.props.impressions&&
                    <View>
                        <Text style={styles.subTitle}>
                            <Text style={{fontWeight: "bold"}}>Impressions: </Text>{this.props.impressions}
                        </Text>
                    </View>
                }
                
                {/* {this.props.stars&&
                    <View>
                        <Text style={styles.subTitle}>
                            <Text style={{fontWeight: "bold"}}>Stars: </Text>{this.props.stars}
                        </Text>
                    </View>
                } */}
                <AirbnbRating onFinishRating={this.ratingCompleted} defaultRating={this.state.rate}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Title:{
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "left",
        textAlignVertical: "center",
        paddingLeft:15
    },
    subTitle: {
        fontSize: 17,
        textAlign: "left",
        textAlignVertical: "center",
        paddingLeft:15
    },
    body:{
        textAlign:"justify",
        fontSize: 16,
        paddingHorizontal:15,
        marginVertical:10
    },
    dropdown: {
        flexDirection:"row",
        borderTopWidth: .5,
        backgroundColor: "#d3d3d3",
        height: height*(1/15)
    },
})

Panel.defaultProps = {
    title:"null",
    titleStyle: styles.subTitle,
    containerStyle: styles.dropdown,
    show: false
}
