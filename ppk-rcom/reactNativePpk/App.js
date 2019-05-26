import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      ppks: []
    }
  }
/*
  componentDidMount(){
    fetchPpkData();
  }

fetchPpkData(){
    fetch("http://194.187.110.62:15004/api/devices/state/",{
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": "Basic "+btoa("Yurii:123456")
      }
      })
      .then((ppks) => {
        console.log(ppks.data);
        this.setState({
          ppks: ppks.data.data
        });
      })
      .catch((err) => {
        console.log(err)
      })
  }
*/

  render() {

    let ppkData = Object.values(this.state.ppks);

    return (
      <View style={styles.container}>
           <Text style={styles.welcome}>Welcome to React Native! Hello!</Text>           
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }  
});
