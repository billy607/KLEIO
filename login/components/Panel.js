import React, {Component} from 'react';	
import propTypes from 'prop-types';	 	
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import {Icon} from 'react-native-elements';

export default class Panel extends Component {
    static propTypes = {
        title: propTypes.string,
        content: propTypes.string						
    }; 

    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    render(){
        return (
            <View>
                <View style={{flexDirection:"row"}}>
                    <Text style={styles.subTitle}>
                        {this.props.title}
                    </Text>
                    {this.state.show? 
                    <Icon name='chevron-up' type='font-awesome' color='gray' containerStyle={{top:15}} onPress={()=>this.setState({show:false})}/>:
                    <Icon name='chevron-down' type='font-awesome' color='gray' containerStyle={{top:15}} onPress={()=>this.setState({show:true})}/>}
                </View>
                {this.state.show&&<Text style={styles.body}>
                    {this.props.content}
                    </Text> }
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
    }
})
