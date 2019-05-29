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

  ppkOnlineStatus(state){
     switch(state) {
       case 0:
         return "Offline";
       case 1:
         return "Online";
       default:
             return "No info";       
     }
   }

   ppkModel(model){
     switch(model) {
       case "8l":
         return "Dunay 8L";
       case "4l":
         return "Dunay 4L";
       case "2l":
         return "Dunay 2L";
       default:
         return "Unknown device";      
     }
   }

   ppkCurrentState(state) {
     switch(state) {
       case 0:
         return "Off";
       case 1:
             return "On";
           default:
         return "No info";
     }
   }

   ppkAdapterTamperState(state){
     switch(state) {
       case 0:
         return "Opened";
       case 1:
             return "Closed";
           default:
             return "No info";       
     }
   }

   ppkGroupState(state){
     switch(state) {
       case 0:
         return "Disarmed";
       case 1:
         return "Armed";
       default:
         return "No info";       
     }
   }

   zonesCurrentState(state){
     switch(state){
       case 88:
         return "Norm";        
       case 80:
         this.alertHandler(); 
       return "Break!";                
           case 112:
             return "Short";  
           case 120:
             return "Fault";       
       default:
         return "No info";       
     }     
   }

   adapterConnectionStatus(status){
     switch(status){
       case 0:
         return "No connection";
       case 1:
         return "Connected";
       default:
         return "No info";
     }
   }
   
   adapterPowerState(state){
     switch(state){
       case 0:
         return "Failure!";
       case 1: 
         return "Norm";
       default: 
         return "No info";
     }
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
		   		   
       
		  {/*}
		      <FlatList			
		       data={ppkData}
               numColumns={1}
			   renderItem={({item, index}) => {
			     if (item.model === "8l"){
					 return 
           <Text>
             PPK: {ppk[index]}, Model: {item.model}, Online: {item.online}, Power: {item.power}, Door: {item.door}, 
  					 Battery: {item.accum}, UK2: {item.uk2}, UK3: {item.uk3}, Rele: {item.relay2}, 
             Group 1: {item.groups[1]}, Group 2: {item.groups[2]}, Group 3: {item.groups[3]}, Group 4: {item.groups[4]}, Group 5: {item.groups[5]},
             Group 6: {item.groups[6]}, Group 7: {item.groups[7]}, Group 8: {item.groups[8]},
  					 Zone 1: {item.lines[1]}, Zone 2: {item.lines[2]}, Zone 3: {item.lines[3]}, Zone 4: {item.lines[4]}, Zone 5: {item.lines[5]},
             Zone 6: {item.lines[6]}, Zone 7: {item.lines[7]}, Zone 8: {item.lines[8]}
           </Text>
				 } else if (item.model === "4l") { 
					 return  <Text>PPK: {ppk[index]}, Model: {item.model} Online: {item.online}, Power: {item.power}, Door: {item.door}, Battery: {item.accum}, Zone 1: {item.lines[1]}</Text>
				 } else return <Text>Unknown device</Text>
			   }
			   }
               keyExtractor={(item, index) => index}
  /> */}
        
            {ppkData.map((item, index) => { 
              if (item.model === "8l") {
               return (
                 <View key={index + 1}>                 
                  <Text>PPK Number: {ppk[index]}</Text>
                  <Text>Model: {this.ppkModel(item.model)}</Text>
                  <Text style={item.online === 0 ? styles.red : item.online === 1 ? styles.green : styles.grey}>Status: {this.ppkOnlineStatus(item.online)}</Text>
                  <Text>220V: {this.ppkCurrentState(item.power)}</Text>
                  <Text>Battery: {this.ppkCurrentState(item.accum)}</Text>
                  <Text>Tamper: {this.ppkAdapterTamperState(item.door)}</Text>
                  <Text>Group 1: {this.ppkGroupState(item.groups[1])}</Text>
                  <Text>Group 2: {this.ppkGroupState(item.groups[2])}</Text>
                  <Text>Group 3: {this.ppkGroupState(item.groups[3])}</Text>
                  <Text>Group 4: {this.ppkGroupState(item.groups[4])}</Text>
                  <Text>Group 5: {this.ppkGroupState(item.groups[5])}</Text>
                  <Text>Group 6: {this.ppkGroupState(item.groups[6])}</Text>
                  <Text>Group 7: {this.ppkGroupState(item.groups[7])}</Text>
                  <Text>Group 8: {this.ppkGroupState(item.groups[8])}</Text>
                  <Text>Zone 1: {this.zonesCurrentState(item.lines[1])}</Text>
                  <Text>Zone 2: {this.zonesCurrentState(item.lines[2])}</Text>
                  <Text>Zone 3: {this.zonesCurrentState(item.lines[3])}</Text>
                  <Text>Zone 4: {this.zonesCurrentState(item.lines[4])}</Text>
                  <Text>Zone 5: {this.zonesCurrentState(item.lines[5])}</Text>
                  <Text>Zone 6: {this.zonesCurrentState(item.lines[6])}</Text>
                  <Text>Zone 7: {this.zonesCurrentState(item.lines[7])}</Text>
                  <Text>Zone 8: {this.zonesCurrentState(item.lines[8])}</Text>
                  <Text>Relay: {this.ppkCurrentState(item.relay2)}</Text>
                  <Text>UK2: {this.ppkCurrentState(item.uk2)}</Text>
                  <Text>UK3: {this.ppkCurrentState(item.uk3)}</Text>
                </View>
              )} else if (item.model === "4l" || "2l") {
                return (
                <View key={index + 1}>
                  <Text>PPK Number: {ppk[index]}</Text>
                  <Text>Model: {this.ppkModel(item.model)}</Text>
                  <Text>Status: {this.ppkOnlineStatus(item.online)}</Text>
                  <Text>220V: {this.ppkCurrentState(item.power)}</Text>
                  <Text>Battery: {this.ppkCurrentState(item.accum)}</Text>
                  <Text>Tamper: {this.ppkAdapterTamperState(item.door)}</Text>
                  <Text>Group 1: {this.ppkGroupState(item.groups[1])}</Text>
                  <Text>Group 2: {this.ppkGroupState(item.groups[2])}</Text>
                  <Text>Group 3: {this.ppkGroupState(item.groups[3])}</Text>
                  <Text>Group 4: {this.ppkGroupState(item.groups[4])}</Text>
                  <Text>Group 5: {this.ppkGroupState(item.groups[5])}</Text>
                  <Text>Group 6: {this.ppkGroupState(item.groups[6])}</Text>
                  <Text>Group 7: {this.ppkGroupState(item.groups[7])}</Text>
                  <Text>Group 8: {this.ppkGroupState(item.groups[8])}</Text>
                  <Text>Group 9: {this.ppkGroupState(item.groups[9])}</Text>
                  <Text>Group 10: {this.ppkGroupState(item.groups[10])}</Text>
                  <Text>Group 11: {this.ppkGroupState(item.groups[11])}</Text>
                  <Text>Group 12: {this.ppkGroupState(item.groups[12])}</Text>
                  <Text>Group 13: {this.ppkGroupState(item.groups[13])}</Text>
                  <Text>Group 14: {this.ppkGroupState(item.groups[14])}</Text>
                  <Text>Group 15: {this.ppkGroupState(item.groups[15])}</Text>
                  <Text>Group 16: {this.ppkGroupState(item.groups[16])}</Text>
                  <Text>Zone 1: {this.zonesCurrentState(item.lines[1])}</Text>
                  <Text>Zone 2: {this.zonesCurrentState(item.lines[2])}</Text>
                  <Text>Zone 3: {this.zonesCurrentState(item.lines[3])}</Text>
                  <Text>Zone 4: {this.zonesCurrentState(item.lines[4])}</Text>
                  <Text>Zone 5: {this.zonesCurrentState(item.lines[5])}</Text>
                  <Text>Zone 6: {this.zonesCurrentState(item.lines[6])}</Text>
                  <Text>Zone 7: {this.zonesCurrentState(item.lines[7])}</Text>
                  <Text>Zone 8: {this.zonesCurrentState(item.lines[8])}</Text>
                  <Text>Zone 9: {this.zonesCurrentState(item.lines[9])}</Text>
                  <Text>Zone 10: {this.zonesCurrentState(item.lines[10])}</Text>
                  <Text>Zone 11: {this.zonesCurrentState(item.lines[11])}</Text>
                  <Text>Zone 12: {this.zonesCurrentState(item.lines[12])}</Text>
                  <Text>Zone 13: {this.zonesCurrentState(item.lines[13])}</Text>
                  <Text>Zone 14: {this.zonesCurrentState(item.lines[14])}</Text>
                  <Text>Zone 15: {this.zonesCurrentState(item.lines[15])}</Text>
                  <Text>Zone 16: {this.zonesCurrentState(item.lines[16])}</Text>
                  <Text>Adapter 1 Status: {this.adapterConnectionStatus(item.adapters[1].conn)}</Text>
                  <Text>Adapter 1 Tamper: {this.ppkAdapterTamperState(item.adapters[1].door)}</Text>
                  <Text>Adapter 1 Power: {this.adapterPowerState(item.adapters[1].power)}</Text>
                  <Text>Adapter 2 Status: {this.adapterConnectionStatus(item.adapters[2].conn)}</Text>
                  <Text>Adapter 2 Tamper: {this.ppkAdapterTamperState(item.adapters[2].door)}</Text>
                  <Text>Adapter 2 Power: {this.adapterPowerState(item.adapters[2].power)}</Text>
                  <Text>Adapter 3 Status: {this.adapterConnectionStatus(item.adapters[3].conn)}</Text>
                  <Text>Adapter 3 Tamper: {this.ppkAdapterTamperState(item.adapters[3].door)}</Text>
                  <Text>Adapter 3 Power: {this.adapterPowerState(item.adapters[3].power)}</Text>
                  <Text>Adapter 4 Status: {this.adapterConnectionStatus(item.adapters[4].conn)}</Text>
                  <Text>Adapter 4 Tamper: {this.ppkAdapterTamperState(item.adapters[4].door)}</Text>
                  <Text>Adapter 4 Power: {this.adapterPowerState(item.adapters[4].power)}</Text>
                  <Text>Wireless Sensor 1 Status: {this.adapterConnectionStatus(item.wsensors[11].conn)}</Text>
                  <Text>Wireless Sensor 1 Tamper: {this.ppkAdapterTamperState(item.wsensors[11].door)}</Text>
                  <Text>Wireless Sensor 2 Status: {this.adapterConnectionStatus(item.wsensors[12].conn)}</Text>
                  <Text>Wireless Sensor 2 Tamper: {this.ppkAdapterTamperState(item.wsensors[12].door)}</Text>
                  <Text>Wireless Sensor 3 Status: {this.adapterConnectionStatus(item.wsensors[13].conn)}</Text>
                  <Text>Wireless Sensor 3 Tamper: {this.ppkAdapterTamperState(item.wsensors[13].door)}</Text>
                  <Text>Relay: {this.ppkCurrentState(item.c[0])}</Text>
                  <Text>C1: {this.ppkCurrentState(item.c[1])}</Text>
                  <Text>C2: {this.ppkCurrentState(item.c[2])}</Text>
                  <Text>C3: {this.ppkCurrentState(item.c[3])}</Text>

                  
                </View> 


               )} else {return (<Text>Unknown device</Text>)}
             })
              }
            
           </ScrollView> 
 {/*}
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
             		 
		 />	*/}	   
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
    margin: 5,
  },
  red: {
	  color: "red",
  },
  green: {
	  color: "green",	  
  },
  grey: {
	  color: "grey",
  },
  blue: {
	  color: "#0d19a5",
  },
  
});
