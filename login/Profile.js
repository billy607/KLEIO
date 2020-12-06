import React, { Component,PureComponent } from 'react';
import { Text, View, TextInput, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { Input, Button, SocialIcon,Avatar,CheckBox,Icon  } from 'react-native-elements';
var {height, width} = Dimensions.get('window'); 
export default class RegisterPage extends Component {

    render() { 
        return (
            <ScrollView>
                <View style={{alignItems:'center',top:10,}}>
                    <Avatar size="xlarge" rounded icon={{ name: 'user', type: 'font-awesome'}} />
                    <Text style={{fontSize:25, fontWeight:'bold'}}>ZIQI LIU </Text>  
                </View>
                    <View style={{borderColor:'lightgrey',borderTopWidth:1,marginTop:20,marginHorizontal:10}}>
                        <Text style={{fontSize:15,}}/>
                        <Text style={{fontSize:15,}}>Country: US </Text> 
                        <Text style={{fontSize:15,}}>State: FL </Text>
                        <Text style={{fontSize:15,}}>Major of interest: CS </Text>
                    </View>
                    <View style={{borderColor:'lightgrey',borderTopWidth:1,marginTop:20,marginHorizontal:10}}>
                        <Text style={{fontSize:15,}}/>
                        <View style={{flexDirection:'row'}}>
                            <CheckBox title='Ranking' checked={true} containerStyle={{ paddingHorizontal:5}}/>
                            <CheckBox title='Sporting'containerStyle={{paddingHorizontal:5}}/>
                            <CheckBox title='Studying'containerStyle={{ paddingHorizontal:5}}/>
                        </View>
                    </View>
                    <View style={{borderColor:'lightgrey',borderTopWidth:1,marginTop:20,marginHorizontal:10}}>
                        <Text style={{fontSize:15,}}/>
                        <Text style={{fontSize:20,fontWeight:'bold',textDecorationLine:'underline'}}>Statistic:</Text>
                        <Text style={{fontSize:15}}>#1 like: University of Florida</Text>
                        <Text style={{fontSize:15}}>4 univeristy visited</Text>
                        <Text style={{fontSize:15}}>8 hours touring</Text>
                        
                    </View>
                    <View style={{borderColor:'lightgrey',borderTopWidth:1,marginTop:20,marginHorizontal:10}}>
                        <Text style={{fontSize:15,}}/>
                        <Text style={{fontSize:20,fontWeight:'bold',textDecorationLine:'underline'}}>Achevements:</Text>
                        <View style={{flexDirection:'row'}}>
                            <Icon name='trophy' type='font-awesome' color='gold'/>
                            <Text> Visit all university in FL </Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Icon name='trophy' type='font-awesome' color='silver'/>
                            <Text> Visit 4 university </Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Icon name='trophy' type='font-awesome' color='brown'/>
                            <Text> Visit UF </Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Icon name='trophy' type='font-awesome' color='brown'/>
                            <Text> Visit UCF </Text>
                        </View>
                        <Text>show all</Text>
                    </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    contentBody1:{
        fontSize: 50,
        marginVertical:10
    },
})