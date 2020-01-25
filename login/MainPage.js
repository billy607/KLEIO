import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';

const image = require('./image/menu.png');
var {height, width} = Dimensions.get('window'); 

export default class MainPage extends Component {
    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        header: null,
    };
    constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
        isOpen: false,
        selectedItem: 'About',
        selectedIndex: 2
    };
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }

    toggle() {
    this.setState({
        isOpen: !this.state.isOpen,
    });
    }

    updateMenuState(isOpen) {
    this.setState({ isOpen });
    }

    onMenuItemSelected = item =>
    this.setState({
        isOpen: false,
        selectedItem: item,
    });
    
    updateSearch = search =>{
    this.setState({search: search});
    }

    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
        const buttons = ['Hello', 'World', 'Buttons']
        const { selectedIndex } = this.state
    
        return (
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={isOpen => this.updateMenuState(isOpen)}
            >
                <View style={styles.container}>
                    <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{height: 30}}
                    />
                </View>
                <TouchableOpacity
                    onPress={this.toggle}
                    style={styles.button}
                    >
                    <Image
                        source={image}
                        style={{ width: 32, height: 32 }}
                    />
                </TouchableOpacity>
            </SideMenu>
        )};
}
const styles = StyleSheet.create({
    button: {
      position: 'absolute',
      top: 20,
      padding: 10,
    },
    caption: {
      fontSize: 20,
      fontWeight: 'bold',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'darkorange',
    },
    searchbar: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'darkorange',
      padding: 0.1*width,
    },
    SafeAreaView: {
      flex: 6,
      justifyContent: 'center',
      backgroundColor: 'darkorange',
      padding: 0.1*width,
    },
    ScrollView: {
      borderRadius: 10,
      backgroundColor: 'white',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });
