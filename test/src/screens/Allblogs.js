import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props { }
interface State { }

export default class AllBlogs extends React.Component <Props, State> {
    render(){
        return(
            <View style={StyleSheet.container}>
                <Text style = {StyleSheet.welcome}>LMAO</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FSFCFF',
    },
    welcome: {
        fontSize:20,
        textAlign:'center',
        margin: 10,
    }
});