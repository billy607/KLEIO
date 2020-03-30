import {StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
    render() {
        return (
            <NavigationContainer>
                <View style = {styles.testStyle}>
                    <Text style = {styles.font}>LMFAO</Text>
                </View>
                
            </NavigationContainer>
        );
    };
  
}

const styles = StyleSheet.create({
    testStyle: {
        flex: 1,
        justifyContent: 'center',
        alighItems: 'center',
        backgroundColor: 'white'
    },
    font: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,

    },


});