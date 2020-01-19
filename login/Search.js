import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions,ScrollView, Button, Image, SafeAreaView } from 'react-native';
import Menu, {
  MenuContext,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers,
  MenuProvider
} from 'react-native-popup-menu';
import SearchBar from 'react-native-search-bar';
import { List, ListItem } from 'react-native-elements'

const list = [
  {
    title: 'option 1'
  },
  {
    title: 'option 2'
  },
  {
    title: 'option 3'
  }
]
let unique = 0;
const { SlideInMenu } = renderers;
var {height, width} = Dimensions.get('window');

export default class Search extends Component {
    static navigationOptions = {
      //To hide the ActionBar/NavigationBar
      header: null,
    };
    constructor(props, ctx) {
        super(props, ctx);
        this.state = { log: [] };
      }

      selectNumber(value) {
        this.addLog(`selecting number: ${value}`);
      }

      selectOptionType(value) {
        const v = typeof value === 'object' ? JSON.stringify(value) : value;
        this.addLog(`selecting type: ${v}`);
        return value !== 'Do not close';
      }

      addLog(value) {
        this.setState({
          log: [...this.state.log, {
            value,
            id: ++unique
          }]
        });
      }

      toggleHighlight(id) {
        const log = this.state.log.map(l => {
          if (l.id === id) {
            return Object.assign({}, l, {highlighted: !l.highlighted});
          }
          return l;
        })
        this.setState({ log });
      }

      deleteLogItem(id) {
        const log = this.state.log.filter(l => l.id !== id);
        this.setState({ log });
      }

      render() {
        return (
          <MenuProvider style={{flex: 1}}>
            <View style={styles.container}>

              <View style={styles.topbar}>
                  <View style={{flex:3}}>
                  </View>
                  <View style={{flex:3}}>
                    <Text style={{color:'black',
                                  fontSize:20,
                                  fontWeight:'bold',
                                  textShadowColor:'#C0C0C0',
                                  textShadowRadius:2,
                                  textShadowOffset:{width:2,height:2}}}>KLEIO</Text>
                  </View>
                  <View style={{flex:1}}>
                    <Menu name="numbers" renderer={SlideInMenu} onSelect={value => this.selectNumber(value)}>
                    <MenuTrigger style={styles.trigger}>
                      <Text style={styles.triggerText}>menu</Text>
                    </MenuTrigger>
                    <MenuOptions>
                      <MenuOption value={1} text='Option one' />
                      <MenuOption value={2} text='Option two' />
                      <MenuOption value={3} text='Option three' />
                      <MenuOption value={4} text='Option four' />
                      { null /* conditional not rendered option */ }
                      <MenuOption value={5} text='Option five' />
                    </MenuOptions>
                    </Menu>
                  </View>

              </View>
              <View>
                <SearchBar
                  ref="searchBar"
                  placeholder="Search"
                />
              </View>
              <View style={{height:height*0.05}}/>
              <View style={{flexDirection:'row'}}>
                <Text style={{width:width*0.2, color:'transparent'}}></Text>
                <SafeAreaView style={{flex:1, height:height*0.6, width:width*0.6, backgroundColor:'lightgray'}}>
                    <ScrollView>
                    {
                        list.map((l, i) => (
                          <ListItem
                            key={i}
                            title={l.title}
                            icon={l.iocn}
                            bottomDivider
                          />
                        ))
                      }
                    </ScrollView>
                </SafeAreaView>
                <Text style={{width:width*0.2, color:'transparent'}}></Text>
              </View>

              <View style={{flexDirection:'row'}}>
                <Text style={{width:width*0.4, color:'transparent'}}></Text>
                <Button
                title="my position"
                color="#841584"
                />
                <Text style={{width:width*0.45, color:'transparent'}}></Text>
              </View>


            </View>
          </MenuProvider>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'orange',
      },
      topbar: {
        flexDirection: 'row',
        backgroundColor: 'darkorange',
        paddingTop : 15,
      },
      trigger: {
        padding: 5,
        margin: 5,
      },
      triggerText: {
        color:'black',
        fontSize:15,
        fontWeight:'bold',
        textShadowColor:'#C0C0C0',
        textShadowRadius:2,
        textShadowOffset:{width:2,height:2}
      },
      disabled: {
        color: '#ccc',
      },
      divider: {
        marginVertical: 5,
        marginHorizontal: 2,
        borderBottomWidth: 1,
        borderColor: '#ccc'
      },
      logView: {
        flex: 1,
        flexDirection: 'column',
      },
      logItem: {
        flexDirection: 'row',
        padding: 8,
      },
    });