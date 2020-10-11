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
import Test from './test'
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
          //headerShown:false
          headerTintColor:'white', 
          headerTitleAlign:'center', 
          headerTitle:'KLEIO', 
          headerStyle:{
            height:50,           
            backgroundColor:'darkorange',
          }
        })}/>
       <Stack.Screen 
        name="Test" 
        component={Test} 
        options={{headerShown:false}}/>
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
// import { Button, Text, Image } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// function LogoTitle() {
//   return (
//     <Image
//       //style={{ width: 50, height: 50 }}
//       source={require('./image/star.png')}
//     />
//   );
// }

// function HomeScreen({ navigation }) {
//   const [count, setCount] = React.useState(0);

//   React.useLayoutEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <Button onPress={() => setCount(c => c + 1)} title="Update count" />
//       ),
//     });
//   }, [navigation, setCount]);

//   return <Text>Count: {count}</Text>;
// }

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={({ navigation, route }) => ({
//             headerTitle: props => <LogoTitle {...props} />,
//           })}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;
