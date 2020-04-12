import React, {Component} from 'react';	
import propTypes from 'prop-types';	 	
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Button,
    TouchableOpacity
} from 'react-native';
import {Icon} from 'react-native-elements';
var {height, width} = Dimensions.get('window'); 

export default class Panel extends Component {
    static propTypes = {
        title: propTypes.string,
        content: propTypes.string,
        level: propTypes.string						
    }; 

    constructor(props) {
        super(props);
        switch(this.props.level){
            case '1':
                console.log("case1");
                this.state = {
                    show: false,
                    view: styles.dropdown,
                    title: styles.subTitle,
                    test: true
                };
                return;
            case '2':
                console.log("case2");
                this.state = {
                    show: false,
                    view: styles.secondLevelDropDown,
                    title: styles.secLvlSubTitle,
                    test: true
                };
                return;
            default:
                console.log("error");
                return;
        }
    }

    render(){
        console.log(this.state.test)
        
        return (
            <View>
                <TouchableOpacity activeOpacity={1} style={this.state.view} onPress={()=>this.setState({show: !this.state.show})}>
                    <Text style={this.state.title}>
                        {this.props.title}
                    </Text>
                    {this.state.show? 
                    <Icon name='chevron-up' type='font-awesome' color='gray' containerStyle={{position: 'absolute', top:15,right: width *.03}} />:
                    <Icon name='chevron-down' type='font-awesome' color='gray' containerStyle={{position: 'absolute', top:15,right: width *.03}} />}
                </TouchableOpacity>
                {this.state.show?
                    <View>
                        {this.props.content!=null&&
                        <Text style={styles.body}>
                            {this.props.content}
                        </Text>}
                        {this.props.children}
                    </View>
                :null }
            </View>
        )
    }
}

Panel.defaultProps = {
    level: '1',
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
    secLvlSubTitle: {
        fontSize: 20,
        textAlign: "left",
        lineHeight: 40,
        paddingLeft: 35, 
        fontWeight: "bold",            
    },
})
