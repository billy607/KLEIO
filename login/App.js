import React, { Component,PureComponent } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SearchPage from './Search';
import RegisterPage from './Register'
import HelloWorldApp from './Login'
import MainPage from './MainPage'
import MenuPage from './Menu'
import Overview from './Overview'
/////////////// navigation logic
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Home' headerMode='none'>
      <Stack.Screen name="Home" component={HelloWorldApp} />
      <Stack.Screen name="Search" component={SearchPage} />
      <Stack.Screen name='Register' component={RegisterPage} />
      <Stack.Screen name="MainPage" component={MainPage} />
      {/* <Stack.Screen name='OverView' component={Overview}/> */}
    </Stack.Navigator>
  );
}
const Drawer = createDrawerNavigator();
function DrawerMenu() {
  return (
    <Drawer.Navigator >
      <Drawer.Screen name="Search" component={MyStack}/>
      <Drawer.Screen name="Setting" component={MenuPage} />
    </Drawer.Navigator>
  );
}
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
      <DrawerMenu/>
      </NavigationContainer>
      )
  }
}