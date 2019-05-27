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
/*
  componentDidMount(){
    return fetch("https://jsonplaceholder.typicode.com/users")
	.then((response) => response.json())
	.then((responseJSON) => {
		console.log(responseJSON)
		this.setState({
			isLoading: false,
			users: responseJSON
		})
	    }
		)
		.catch((err) => {
			console.log(err);
		})
  }
  */
  


componentDidMount(){
    fetch("http://194.187.110.62:15004/api/devices/state/",{
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //"Authorization": "Basic " + Base64.encode("Yurii:123456")
      }
      })
	  .then((response) => response.json())
	  .then((responseJSON) => {
		  console.log(responseJSON.data);
		  this.setState({
			isLoading: false,
			ppks: responseJSON.data.data
		})
	  })      
      .catch((err) => {
        console.log(err)
      })
  }


  render() {

    let ppkData = Object.values(this.state.ppks);

    if(this.state.isLoading){
		return(
		  <View style={{flex: 1, padding: 40}}>
		    <Text style={styles.welcome}>Loading...</Text>
            <ActivityIndicator/>
          </View>
		)
	}

    return (
      <View style={{flex: 1, paddingTop:20}}>
           <Text style={styles.welcome}>Welcome to React Native! Hello There!</Text> 
		   <ScrollView>
		   {/*<FlatList
		       data={this.state.users}
			   renderItem={({item}) => <Text>{item.name}, {item.email}</Text>}
               keyExtractor={({id}, index) => id}
		     />
		   */}
		   
		     <FlatList
		       data={ppkData}
			   renderItem={({item}) => <Text>{item.power}, {item.door}</Text>}
               keyExtractor={(index) =>index+1}
		     />
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
