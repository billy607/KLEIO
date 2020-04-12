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
                this.state = {
                    show: this.props.show,
                    view: styles.dropdown,
                    title: styles.subTitle,
                    test: true
                };
                return;
            case '2':
                this.state = {
                    show: this.props.show,
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
        //console.log("test is :"+this.state.test)
        
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
                        <View style={{paddingLeft: 15,}}>
                            {this.props.children}
                        </View>
                    </View>
                :null }
            </View>
        )
    }
}

Panel.defaultProps = {
    level: '1',
    show: false
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
