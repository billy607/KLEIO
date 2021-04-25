import React, {Component} from 'react';
import { 
  Button, 
  Dimensions,
  View } from 'react-native';
  import { ListItem } from 'react-native-elements'

  const list = [
    {
      title: 'Profile',
      icon: 'account-circle',
      type: 'MaterialIcons',
    },
    {
      title: 'General',
      icon: 'gear',
      type: 'font-awesome'
    },
    {
      title: 'Test',
      icon: 'book',
      type: 'font-awesome'
    },
  ]

var {height, width} = Dimensions.get('window'); 
export default class SettingPage extends Component{


  render(){
    
    return (
<View>
  {
    list.map((item, i) => (
      <ListItem
        key={i}
        title={item.title}
        leftIcon={{ name: item.icon, type: item.type }}
        bottomDivider
        chevron
        onPress={() => {
          this.props.navigation.navigate(item.title);}}
      />
    ))
  }
</View>
    )
  } 
}
