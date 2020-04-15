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
        titleStyle: Text.propTypes.style,
        containerStyle: ViewPropTypes.style			
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
                <TouchableOpacity activeOpacity={1} style={this.props.containerStyle} onPress={()=>this.setState({show: !this.state.show})}>
                    <Text style={this.props.titleStyle}>
                        {this.props.title}
                    </Text>
                    {this.state.show? 
                    <Icon name='chevron-up' type='font-awesome' color='gray' containerStyle={{position: 'absolute', top:15,right: width *.03}} />:
                    <Icon name='chevron-down' type='font-awesome' color='gray' containerStyle={{position: 'absolute', top:15,right: width *.03}} />}
                </TouchableOpacity>
                {this.state.show?
                    <View>
                        <View>
                            {this.props.children}
                        </View>
                    </View>
                :null }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    subTitle: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "left",
        lineHeight: 50,
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
    },
    secondLevelDropDown: {
        flexDirection:"row"
        // borderWidth: .5,
        // backgroundColor: "#d3d3d3",
    },
    secLvlSubTitle: {
        fontSize: 20,
        textAlign: "left",
        lineHeight: 40,
        paddingLeft:15,
        fontWeight: "bold",            
    },
})

Panel.defaultProps = {
    titleStyle: styles.subTitle,
    containerStyle: styles.dropdown,
    show: false
}
