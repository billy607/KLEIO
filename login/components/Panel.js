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
                <TouchableOpacity activeOpacity={0.5} style={this.props.containerStyle} onPress={()=>this.setState({show: !this.state.show})}>
                    <Text style={this.props.titleStyle}>
                        {this.props.title}
                    </Text>
                    {this.state.show? 
                    <Icon name='chevron-up' size = {12} type='font-awesome' color='gray' containerStyle={{flex: 1,justifyContent:'center', alignItems:'flex-end', paddingRight:width*0.03}} />:
                    <Icon name='chevron-down' size = {12} type='font-awesome' color='gray' containerStyle={{flex: 1,justifyContent:'center', alignItems:'flex-end', paddingRight:width*0.03}} />}
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
