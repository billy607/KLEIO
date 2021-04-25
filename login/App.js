import React, { Component,PureComponent } from 'react';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SearchPage from './Search';
import RegisterPage from './Register'
import HelloWorldApp from './Login'
import Overview from './Overview'
import MapPage from './MapPage'
import MenuPage from './SettingPage'
import CollegeDetails from './CollegesDetail'
import Report from './Report'
import {Icon} from 'react-native-elements'
import { HeaderBackButton } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import Profile from './Profile'
import Test from './test'
import RegisterQuestions from './RegisterQuestions'

import ActionButton from 'react-native-action-button';

///////////// navigation logic
const Stack = createStackNavigator();
function MyStack({navigation}) {
  return (
    // headerMode='none'
    <Stack.Navigator initialRouteName='Home' headerMode='screen'>
      <Stack.Screen 
        name="Home" 
        component={HelloWorldApp} 
        options={{headerShown:false}}/>
      <Stack.Screen 
        name="CollegeDetails" 
        component={CollegeDetails}
        options={({navigation}) => ({
          headerRight: () => (
            <Icon name='cog' type='font-awesome' color='white' containerStyle={{padding:10}} onPress={()=>navigation.navigate('Setting')}/>
          ),
          headerTintColor:'white', 
          headerTitleAlign:'center', 
          headerTitle:'KLEIO', 
          headerStyle:{
            height:50,           
            backgroundColor:'darkorange',
          }})}/>
      <Stack.Screen 
        name="Search" 
        component={SearchPage} 
        options={({navigation}) => ({
          headerRight: () => (
            <Icon name='cog' type='font-awesome' color='white' underlayColor='darkorange' containerStyle={{padding:10}} onPress={()=>navigation.navigate('Setting')}/>
          ),
          headerLeft: null,
          headerTintColor:'white', 
          headerTitleAlign:'center', 
          headerTitle:'KLEIO', 
          headerStyle:{
            height:50,           
            backgroundColor:'darkorange',
          }})}/>
      <Stack.Screen  
        name='Register' 
        component={RegisterPage}
        options={() => ({
          headerTintColor:'white', 
          headerTitleAlign:'center', 
          headerTitle:'KLEIO', 
          headerStyle:{
            height:50,           
            backgroundColor:'darkorange',
          }})} />
      <Stack.Screen 
        name="Overview" 
        component={Overview}
        options={({navigation}) => ({
          headerRight: () => (
            <Icon name='cog' type='font-awesome' color='white' underlayColor='darkorange' containerStyle={{padding:10}} onPress={()=>navigation.navigate('Setting')}/>
          ),
          headerTintColor:'white', 
          headerTitleAlign:'center', 
          headerTitle:'KLEIO', 
          headerStyle:{
            height:50,           
            backgroundColor:'darkorange',
          }})}/>
      <Stack.Screen 
        name="MapPage" 
        component={MapPage}
        options={({navigation}) => ({
          
          headerTintColor:'white', 
          headerTitleAlign:'center', 
          headerTitle:'KLEIO', 
          headerStyle:{
            height:50,           
            backgroundColor:'darkorange',
          }})}/>
      <Stack.Screen
        name="Setting"
        component={MenuPage}
        options={() => ({
          //headerShown:false
          headerTintColor:'white', 
          headerTitleAlign:'center', 
          headerTitle:'Setting', 
          headerStyle:{
            height:50,           
            backgroundColor:'darkorange',
          }
        })}/>
        <Stack.Screen
        name="Profile"
        component={Profile}
        options={() => ({
          //headerShown:false
          headerRight: (navigation) => (
            <Icon name='edit' type='antdesign' color='white' underlayColor='darkorange' containerStyle={{padding:10}}/>
          ),
          headerTintColor:'white', 
          headerTitleAlign:'center', 
          headerTitle:'Profile', 
          headerStyle:{
            height:50,           
            backgroundColor:'darkorange',
          }
        })}/>
        <Stack.Screen
        name="Test"
        component={Test}
        options={() => ({
          //headerShown:false
          headerRight: (navigation) => (
            <Icon name='edit' type='antdesign' color='white' underlayColor='darkorange' containerStyle={{padding:10}}/>
          ),
          headerTintColor:'white', 
          headerTitleAlign:'center', 
          headerTitle:'Test', 
          headerStyle:{
            height:50,           
            backgroundColor:'darkorange',
          }
        })}/>
       <Stack.Screen 
        name="Report" 
        component={Report} 
        options={{headerShown:false}}/>
        <Stack.Screen
        name="Question"
        component={RegisterQuestions}
        options={() => ({
          //headerShown:false
          headerTintColor:'white', 
          headerTitleAlign:'center', 
          headerTitle:'Setting', 
          headerStyle:{
            height:50,           
            backgroundColor:'darkorange',
          }
        })}/>
    {/* <Stack.Navigator initialRouteName='CollegesDetail' headerMode='none'>
      <Stack.Screen name="CollegesDetail" component={CollegesDetail} />
      <Stack.Screen name="Home" component={HelloWorldApp} />
      <Stack.Screen name="Search" component={SDrawer} />
      <Stack.Screen name='Register' component={RegisterPage} />
      <Stack.Screen name="MainPage" component={MDrawer} /> */}
    </Stack.Navigator>
  );
}
// const Drawer = createDrawerNavigator();
// function DrawerMenu() {
//   return (
//     <Drawer.Navigator >
//       <Drawer.Screen name="Search" component={MyStack}/>
//       <Drawer.Screen name="Setting" component={MenuPage} />
//     </Drawer.Navigator>
//   );
// }
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
      <MyStack/>
      </NavigationContainer>
      )
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

// import * as React from 'react';
// import { Button, Text, Image, View } from 'react-native';
// import { Rating, AirbnbRating } from 'react-native-elements';


// function ratingCompleted(rating) {
//   console.log("Rating is: " + rating);
// }

// function App() {
//   const WATER_IMAGE = require('./image/gator.png')
//   return (
//     <View>
    
//     <AirbnbRating />
    
//     <AirbnbRating
//       count={11}
//       reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
//       defaultRating={11}
//       size={20}
//     />
    
//     <Rating
//       showRating
//       onFinishRating={ratingCompleted}
//       style={{ paddingVertical: 10 }}
//     />
    
//     <Rating
//       type='heart'
//       ratingCount={3}
//       imageSize={60}
//       showRating
//       onFinishRating={ratingCompleted}
//     />
    
    
    
//     <Rating
//       type='custom'
//       ratingImage={WATER_IMAGE}
//       ratingColor='#3498db'
//       ratingBackgroundColor='#c8c7c8'
//       ratingCount={10}
//       imageSize={30}
//       onFinishRating={ratingCompleted}
//       style={{ paddingVertical: 10 }}
//     />
//     </View>
//   );
// }

// export default App;
