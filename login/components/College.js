import React, {Component} from 'react';	
import { ViewPropTypes } from 'react-native';	
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {Icon} from 'react-native-elements';
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
        };
    }

    render(){
        console.log("style is :"+this.state.conte)
        
        return (
            <View>
                <View>
                    <Text style={styles.Title}>
                        {this.props.title}
                    </Text>
                </View>
                <View>
                    <Text style={styles.subTitle}>
                        Degrees: {this.props.degrees}
                    </Text>
                </View>
                <View>
                    <Text style={styles.subTitle}>
                        Requirements: {this.props.requirements}
                    </Text>
                </View>
                <View>
                    <Text style={styles.subTitle}>
                        Programs: {this.props.programs}
                    </Text>
                </View>
                <View>
                    <Text style={styles.subTitle}>
                        Impressions: {this.props.impressions}
                    </Text>
                </View>
                <View>
                    <Text style={styles.subTitle}>
                        Stars: {this.props.stars}
                    </Text>
                </View>
            </View>
        )
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
    subTitle: {
        fontSize: 25,
        fontWeight: "bold",
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
