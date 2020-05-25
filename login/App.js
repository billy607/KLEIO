import React, { Component,PureComponent } from 'react';
import {Text,} from 'react-native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SearchPage from './Search';
import RegisterPage from './Register'
import HelloWorldApp from './Login'
import MainPage from './MainPage'
import MenuPage from './Menu'
import {Icon} from 'react-native-elements'
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
        name="Search" 
        component={SearchPage} 
        options={({navigation}) => ({
          headerRight: () => (
            <Icon name='cog' type='font-awesome' color='white' containerStyle={{padding:10}} onPress={()=>navigation.navigate('Setting')}/>
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
        options={{headerShown:false}}/>
      <Stack.Screen 
        name="MainPage" 
        component={MainPage}
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
        name="Setting"
        component={MenuPage}
      />
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