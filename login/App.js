import React, { Component,PureComponent } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SearchPage from './Search';
import RegisterPage from './Register'
import HelloWorldApp from './Login'
import MainPage from './MainPage'
import MenuPage from './Menu'
/////////////// navigation logic
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Home' headerMode='none'>
      <Stack.Screen name="Home" component={HelloWorldApp} />
      <Stack.Screen name="Search" component={SDrawer} />
      <Stack.Screen name='Register' component={RegisterPage} />
      <Stack.Screen name="MainPage" component={MDrawer} />
    </Stack.Navigator>
  );
}
const Drawer = createDrawerNavigator();
function SDrawer() {
  return (
    <Drawer.Navigator >
      <Drawer.Screen name="Search" component={SearchPage}/>
      <Drawer.Screen name="Setting" component={MenuPage} />
    </Drawer.Navigator>
  );
}
function MDrawer() {
  return (
    <Drawer.Navigator >
      <Drawer.Screen name="MainPage" component={MainPage}/>
      <Drawer.Screen name="Setting" component={MenuPage} />
    </Drawer.Navigator>
  );
}
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
      <MyStack/>
      </NavigationContainer>
      )
  }
}