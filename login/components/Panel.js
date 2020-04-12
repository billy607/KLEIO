import React, {Component} from 'react';	
import propTypes from 'prop-types';	 	
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Button
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
        this.state = {
            show: false,
            view: styles.dropdown,
            title: styles.subTitle,
            test: true
        };
        this.Switch(this.props.level)
    }

    Switch(param){
        switch(param){
            case '1':
                console.log("case1");
                this.updateStateFunction(styles.dropdown,styles.subTitle);
                return;
            case '2':
                console.log("case2");
                this.updateStateFunction(styles.secondLevelDropDown,styles.secLvlSubTitle);
                return;
            default:
                console.log("error");
                return;
        }
    }

    updateStateFunction = (mview,mtitle) => {
        this.setState({
           view: mview,
           title: mtitle,
           test:false
        })
     }

    render(){
        console.log(this.state.test)
        return (
            <View>
                <View style={this.state.view}>
                    <Text style={this.state.title}>
                        {this.props.title}
                    </Text>
                    {this.state.show? 
                    <Icon name='chevron-up' type='font-awesome' color='gray' containerStyle={{position: 'absolute', top:15,right: width *.03}} onPress={()=>this.setState({show:false})}/>:
                    <Icon name='chevron-down' type='font-awesome' color='gray' containerStyle={{position: 'absolute', top:15,right: width *.03}} onPress={()=>this.setState({show:true})}/>}
                </View>
                {this.state.show?
                    <View>
                        <Text style={styles.body}>
                            {this.props.content}
                        </Text>
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
