import React, { Component,PureComponent } from 'react';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SearchPage from './Search';
import RegisterPage from './Register'
import HelloWorldApp from './Login'
import MainPage from './MainPage'
import MapPage from './MapPage'
import MenuPage from './Menu'
import CollegeDetails from './CollegesDetail'
import FullMusicPlayer from './FullMusicPlayer'
import {Icon} from 'react-native-elements'
import { HeaderBackButton } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
// import ActionButton from 'react-native-action-button';

/////////////// navigation logic
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
        name="MainPage" 
        component={MainPage}
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
        name="Setting"
        component={MenuPage}
        options={() => ({
          headerTintColor:'white', 
          headerTitleAlign:'center', 
          headerTitle:'KLEIO', 
          headerStyle:{
            height:50,           
            backgroundColor:'darkorange',
          }})}/>
      <Stack.Screen
        name="FullMusicPlayer"
        component={FullMusicPlayer}
        options={{headerShown:false}}
       />
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