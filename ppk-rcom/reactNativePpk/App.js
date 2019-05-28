import React, {Component} from 'react';
import { Base64 } from 'js-base64';
import {
	Platform, 
	StyleSheet, 
	Text, 
	View, 
	ScrollView, 
	FlatList, 
	ActivityIndicator,
	SectionList
  } from 'react-native';


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
		  
		  {/*	    <FlatList			
		       data={ppkData}
               numColumns={1}
			   renderItem={({item, index}) => {
			     if (item.model === "8l"){
					 return <Text>PPK: {ppk[index]}, Model: {item.model} Online: {item.online}, Power: {item.power}, Door: {item.door}, 
					 Battery: {item.accum}, UK2: {item.uk2}, UK3: {item.uk3}, Rele: {item.relay2}, 
					 Zone 1: {item.lines[1]}, Zone 2: {item.lines[2]}</Text>
				 } else if (item.model === "4l") { 
					 return  <Text>PPK: {ppk[index]}, Model: {item.model} Online: {item.online}, Power: {item.power}, Door: {item.door}, Battery: {item.accum}, Zone 1: {item.lines[1]}</Text>
				 } else return <Text>Unknown device</Text>
			   }
			   }
               keyExtractor={(item, index) => index}
  />*/}
         <Text>SectionList... try? or not...?</Text>
           </ScrollView> 
 
		 <SectionList
		    sections={[
				{title: "8l ppk", data: ppkData},
				{title: "4l ppk", data: ppkData}
			]}
			renderItem={({item, index}) => {
			     if (item.model === "8l"){
					 return <Text>PPK: {ppk[index]}, Model: {item.model} Online: {item.online}, Power: {item.power}, Door: {item.door}, 
					 Battery: {item.accum}, UK2: {item.uk2}, UK3: {item.uk3}, Rele: {item.relay2}, 
					 Zone 1: {item.lines[1]}, Zone 2: {item.lines[2]}</Text>
				 } else if (item.model === "4l") { 
					 return  <Text>PPK: {ppk[index]}, Model: {item.model} Online: {item.online}, Power: {item.power}, Door: {item.door}, Battery: {item.accum}, Zone 1: {item.lines[1]}</Text>
				 } else return <Text>Unknown device</Text>
			   }
			   }
			   renderSectionHeader={({section}) => <Text>{section.title}</Text>}
			   keyExtractor={(item) => item._id}
             		 
		 />		   
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
