import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import { Base64 } from 'js-base64';

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      ppks: [],
	  isLoading: true,
	  users: []
    }
  }
 


componentDidMount(){
    fetch("http://194.187.110.62:15004/api/devices/state/",{
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": "Basic " + Base64.encode("Yurii:123456")
      }
      })
	  .then((response) => response.json())
	  .then((responseJSON) => {
		  console.log(responseJSON.data);
		  this.setState({
			isLoading: false,
			ppks: responseJSON.data
		})
	  })      
      .catch((err) => {
        console.log(err)
      })
  }


  render() {

    let ppkData = Object.values(this.state.ppks);
    let ppk = Object.keys(this.state.ppks);

    if (this.state.isLoading){
		return(
		  <View style={{flex: 1, padding: 40}}>
		    <Text style={styles.welcome}>Loading...</Text>
            <ActivityIndicator/>
          </View>
		)
	}

    return (
      <View style={{flex: 1, paddingTop:20}}>
           <Text style={styles.welcome}>Devices:</Text> 
		   <ScrollView>
		   
		   
        <FlatList 
            data={ppk}            
            renderItem={({item}) => <Text>PPK Number: {item}</Text>}
           keyExtractor={(index) => index}
          />
		    <FlatList
          
		       data={ppkData}
           numColumns={1}
			     renderItem={({item, index}) => <Text>PPK: {ppk[index]}, Model: {item.model} Online: {item.online}, Power: {item.power}, Door: {item.door}, Battery: {item.accum}</Text>}
           keyExtractor={({id}, index) => id}
		     />
         <Text>SectionList?</Text>
         
           </ScrollView> 		   
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
