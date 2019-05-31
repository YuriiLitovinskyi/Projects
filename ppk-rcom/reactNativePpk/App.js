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
	SectionList,
  Alert
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
    //this.loadPpkInfo = this.loadPpkInfo.bind(this);
  }
/* 
componentDidMount(){
  this.intervalId = setInterval(() => this.loadPpkInfo(), 5000);
  loadPpkInfo();
}

componentWillUnmount(){
  // clearInterval(this.intervalId);
}
*/

componentDidMount(){
  // this.intervalId = setInterval(() => {
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

 //  }, 5000);
    
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
       case 2:
         return "Armed(Staying home)";
       default:
         return "No info";       
     }
   }

   zonesCurrentState(state){
     switch(state){
       case 88:
         return "Norm";        
       case 80:
        // this.alertHandler(); 
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

  /*
   alertHandler(){     
       Alert.alert(
        'ALERT!',
        'ZONE BREAK!',
      [
       {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
      ) 
   }
   */


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
                 <View style={styles.ppkCard8l} key={index + 1}>                 
                  <Text style={styles.ppkNumber}>PPK Number: {ppk[index]}</Text>
                  <Text style={styles.ppkModel}>Model: {this.ppkModel(item.model)}</Text>
                  <Text style={item.online === 0 ? styles.red : item.online === 1 ? styles.green : styles.grey}>Status: {this.ppkOnlineStatus(item.online)}</Text>
                  <Text style={item.power === 0 ? styles.red : item.power === 1 ? styles.green : styles.grey}>220V: {this.ppkCurrentState(item.power)}</Text>
                  <Text style={item.accum === 0 ? styles.red : item.accum === 1 ? styles.green : styles.grey}>Battery: {this.ppkCurrentState(item.accum)}</Text>
                  <Text style={item.door === 0 ? styles.red : item.door === 1 ? styles.green : styles.grey}>Tamper: {this.ppkAdapterTamperState(item.door)}</Text>
                  <Text style={item.groups[1] === 0 ? styles.green : item.groups[1] === 1 ? styles.blue : styles.grey}>Group 1: {this.ppkGroupState(item.groups[1])}</Text>
                  <Text style={item.groups[2] === 0 ? styles.green : item.groups[2] === 1 ? styles.blue : styles.grey}>Group 2: {this.ppkGroupState(item.groups[2])}</Text>
                  <Text style={item.groups[3] === 0 ? styles.green : item.groups[3] === 1 ? styles.blue : styles.grey}>Group 3: {this.ppkGroupState(item.groups[3])}</Text>
                  <Text style={item.groups[4] === 0 ? styles.green : item.groups[4] === 1 ? styles.blue : styles.grey}>Group 4: {this.ppkGroupState(item.groups[4])}</Text>
                  <Text style={item.groups[5] === 0 ? styles.green : item.groups[5] === 1 ? styles.blue : styles.grey}>Group 5: {this.ppkGroupState(item.groups[5])}</Text>
                  <Text style={item.groups[6] === 0 ? styles.green : item.groups[6] === 1 ? styles.blue : styles.grey}>Group 6: {this.ppkGroupState(item.groups[6])}</Text>
                  <Text style={item.groups[7] === 0 ? styles.green : item.groups[7] === 1 ? styles.blue : styles.grey}>Group 7: {this.ppkGroupState(item.groups[7])}</Text>
                  <Text style={item.groups[8] === 0 ? styles.green : item.groups[8] === 1 ? styles.blue : styles.grey}>Group 8: {this.ppkGroupState(item.groups[8])}</Text>
                  <Text style={item.lines[1] === 88 ? styles.normZone : item.lines[1] === 80 ? styles.breakedZone : item.lines[1] === 112 ? styles.shortedZone : item.lines[1] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 1: {this.zonesCurrentState(item.lines[1])}</Text>
                  <Text style={item.lines[2] === 88 ? styles.normZone : item.lines[2] === 80 ? styles.breakedZone : item.lines[2] === 112 ? styles.shortedZone : item.lines[2] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 2: {this.zonesCurrentState(item.lines[2])}</Text>
                  <Text style={item.lines[3] === 88 ? styles.normZone : item.lines[3] === 80 ? styles.breakedZone : item.lines[3] === 112 ? styles.shortedZone : item.lines[3] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 3: {this.zonesCurrentState(item.lines[3])}</Text>
                  <Text style={item.lines[4] === 88 ? styles.normZone : item.lines[4] === 80 ? styles.breakedZone : item.lines[4] === 112 ? styles.shortedZone : item.lines[4] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 4: {this.zonesCurrentState(item.lines[4])}</Text>
                  <Text style={item.lines[5] === 88 ? styles.normZone : item.lines[5] === 80 ? styles.breakedZone : item.lines[5] === 112 ? styles.shortedZone : item.lines[5] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 5: {this.zonesCurrentState(item.lines[5])}</Text>
                  <Text style={item.lines[6] === 88 ? styles.normZone : item.lines[6] === 80 ? styles.breakedZone : item.lines[6] === 112 ? styles.shortedZone : item.lines[6] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 6: {this.zonesCurrentState(item.lines[6])}</Text>
                  <Text style={item.lines[7] === 88 ? styles.normZone : item.lines[7] === 80 ? styles.breakedZone : item.lines[7] === 112 ? styles.shortedZone : item.lines[7] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 7: {this.zonesCurrentState(item.lines[7])}</Text>
                  <Text style={item.lines[8] === 88 ? styles.normZone : item.lines[8] === 80 ? styles.breakedZone : item.lines[8] === 112 ? styles.shortedZone : item.lines[8] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 8: {this.zonesCurrentState(item.lines[8])}</Text>
                  <Text style={item.relay2 === 0 ? styles.green : item.relay2 === 1 ? styles.blue : styles.grey}>Relay: {this.ppkCurrentState(item.relay2)}</Text>
                  <Text style={item.uk2 === 0 ? styles.green : item.uk2 === 1 ? styles.blue : styles.grey}>UK2: {this.ppkCurrentState(item.uk2)}</Text>
                  <Text style={item.uk3 === 0 ? styles.green : item.uk3 === 1 ? styles.blue : styles.grey}>UK3: {this.ppkCurrentState(item.uk3)}</Text>
                </View>
              )} else if (item.model === "4l" || "2l") {
                return (
                <View style={styles.ppkCard4l} key={index + 1}>
                  <Text style={styles.ppkNumber}>PPK Number: {ppk[index]}</Text>
                  <Text style={styles.ppkModel}>Model: {this.ppkModel(item.model)}</Text>
                  <Text style={item.online === 0 ? styles.red : item.online === 1 ? styles.green : styles.grey}>Status: {this.ppkOnlineStatus(item.online)}</Text>
                  <Text style={item.power === 0 ? styles.red : item.power === 1 ? styles.green : styles.grey}>220V: {this.ppkCurrentState(item.power)}</Text>
                  <Text style={item.accum === 0 ? styles.red : item.accum === 1 ? styles.green : styles.grey}>Battery: {this.ppkCurrentState(item.accum)}</Text>
                  <Text style={item.door === 0 ? styles.red : item.door === 1 ? styles.green : styles.grey}>Tamper: {this.ppkAdapterTamperState(item.door)}</Text>
                  <Text style={item.groups[1] === 0 ? styles.green : item.groups[1] === 1 ? styles.blue : styles.grey}>Group 1: {this.ppkGroupState(item.groups[1])}</Text>
                  <Text style={item.groups[2] === 0 ? styles.green : item.groups[2] === 1 ? styles.blue : styles.grey}>Group 2: {this.ppkGroupState(item.groups[2])}</Text>
                  <Text style={item.groups[3] === 0 ? styles.green : item.groups[3] === 1 ? styles.blue : styles.grey}>Group 3: {this.ppkGroupState(item.groups[3])}</Text>
                  <Text style={item.groups[4] === 0 ? styles.green : item.groups[4] === 1 ? styles.blue : styles.grey}>Group 4: {this.ppkGroupState(item.groups[4])}</Text>
                  <Text style={item.groups[5] === 0 ? styles.green : item.groups[5] === 1 ? styles.blue : styles.grey}>Group 5: {this.ppkGroupState(item.groups[5])}</Text>
                  <Text style={item.groups[6] === 0 ? styles.green : item.groups[6] === 1 ? styles.blue : styles.grey}>Group 6: {this.ppkGroupState(item.groups[6])}</Text>
                  <Text style={item.groups[7] === 0 ? styles.green : item.groups[7] === 1 ? styles.blue : styles.grey}>Group 7: {this.ppkGroupState(item.groups[7])}</Text>
                  <Text style={item.groups[8] === 0 ? styles.green : item.groups[8] === 1 ? styles.blue : styles.grey}>Group 8: {this.ppkGroupState(item.groups[8])}</Text>
                  <Text style={item.groups[9] === 0 ? styles.green : item.groups[9] === 1 ? styles.blue : styles.grey}>Group 9: {this.ppkGroupState(item.groups[9])}</Text>
                  <Text style={item.groups[10] === 0 ? styles.green : item.groups[10] === 1 ? styles.blue : styles.grey}>Group 10: {this.ppkGroupState(item.groups[10])}</Text>
                  <Text style={item.groups[11] === 0 ? styles.green : item.groups[11] === 1 ? styles.blue : styles.grey}>Group 11: {this.ppkGroupState(item.groups[11])}</Text>
                  <Text style={item.groups[12] === 0 ? styles.green : item.groups[12] === 1 ? styles.blue : styles.grey}>Group 12: {this.ppkGroupState(item.groups[12])}</Text>
                  <Text style={item.groups[13] === 0 ? styles.green : item.groups[13] === 1 ? styles.blue : styles.grey}>Group 13: {this.ppkGroupState(item.groups[13])}</Text>
                  <Text style={item.groups[14] === 0 ? styles.green : item.groups[14] === 1 ? styles.blue : styles.grey}>Group 14: {this.ppkGroupState(item.groups[14])}</Text>
                  <Text style={item.groups[15] === 0 ? styles.green : item.groups[15] === 1 ? styles.blue : styles.grey}>Group 15: {this.ppkGroupState(item.groups[15])}</Text>
                  <Text style={item.groups[16] === 0 ? styles.green : item.groups[16] === 1 ? styles.blue : styles.grey}>Group 16: {this.ppkGroupState(item.groups[16])}</Text>
                  <Text style={item.lines[1] === 88 ? styles.normZone : item.lines[1] === 80 ? styles.breakedZone : item.lines[1] === 112 ? styles.shortedZone : item.lines[1] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 1: {this.zonesCurrentState(item.lines[1])}</Text>
                  <Text style={item.lines[2] === 88 ? styles.normZone : item.lines[2] === 80 ? styles.breakedZone : item.lines[2] === 112 ? styles.shortedZone : item.lines[2] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 2: {this.zonesCurrentState(item.lines[2])}</Text>
                  <Text style={item.lines[3] === 88 ? styles.normZone : item.lines[3] === 80 ? styles.breakedZone : item.lines[3] === 112 ? styles.shortedZone : item.lines[3] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 3: {this.zonesCurrentState(item.lines[3])}</Text>
                  <Text style={item.lines[4] === 88 ? styles.normZone : item.lines[4] === 80 ? styles.breakedZone : item.lines[4] === 112 ? styles.shortedZone : item.lines[4] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 4: {this.zonesCurrentState(item.lines[4])}</Text>
                  <Text style={item.lines[5] === 88 ? styles.normZone : item.lines[5] === 80 ? styles.breakedZone : item.lines[5] === 112 ? styles.shortedZone : item.lines[5] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 5: {this.zonesCurrentState(item.lines[5])}</Text>
                  <Text style={item.lines[6] === 88 ? styles.normZone : item.lines[6] === 80 ? styles.breakedZone : item.lines[6] === 112 ? styles.shortedZone : item.lines[6] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 6: {this.zonesCurrentState(item.lines[6])}</Text>
                  <Text style={item.lines[7] === 88 ? styles.normZone : item.lines[7] === 80 ? styles.breakedZone : item.lines[7] === 112 ? styles.shortedZone : item.lines[7] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 7: {this.zonesCurrentState(item.lines[7])}</Text>
                  <Text style={item.lines[8] === 88 ? styles.normZone : item.lines[8] === 80 ? styles.breakedZone : item.lines[8] === 112 ? styles.shortedZone : item.lines[8] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 8: {this.zonesCurrentState(item.lines[8])}</Text>
                  <Text style={item.lines[9] === 88 ? styles.normZone : item.lines[9] === 80 ? styles.breakedZone : item.lines[9] === 112 ? styles.shortedZone : item.lines[9] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 9: {this.zonesCurrentState(item.lines[9])}</Text>
                  <Text style={item.lines[10] === 88 ? styles.normZone : item.lines[10] === 80 ? styles.breakedZone : item.lines[10] === 112 ? styles.shortedZone : item.lines[10] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 10: {this.zonesCurrentState(item.lines[10])}</Text>
                  <Text style={item.lines[11] === 88 ? styles.normZone : item.lines[11] === 80 ? styles.breakedZone : item.lines[11] === 112 ? styles.shortedZone : item.lines[11] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 11: {this.zonesCurrentState(item.lines[11])}</Text>
                  <Text style={item.lines[12] === 88 ? styles.normZone : item.lines[12] === 80 ? styles.breakedZone : item.lines[12] === 112 ? styles.shortedZone : item.lines[12] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 12: {this.zonesCurrentState(item.lines[12])}</Text>
                  <Text style={item.lines[13] === 88 ? styles.normZone : item.lines[13] === 80 ? styles.breakedZone : item.lines[13] === 112 ? styles.shortedZone : item.lines[13] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 13: {this.zonesCurrentState(item.lines[13])}</Text>
                  <Text style={item.lines[14] === 88 ? styles.normZone : item.lines[14] === 80 ? styles.breakedZone : item.lines[14] === 112 ? styles.shortedZone : item.lines[14] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 14: {this.zonesCurrentState(item.lines[14])}</Text>
                  <Text style={item.lines[15] === 88 ? styles.normZone : item.lines[15] === 80 ? styles.breakedZone : item.lines[15] === 112 ? styles.shortedZone : item.lines[15] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 15: {this.zonesCurrentState(item.lines[15])}</Text>
                  <Text style={item.lines[16] === 88 ? styles.normZone : item.lines[16] === 80 ? styles.breakedZone : item.lines[16] === 112 ? styles.shortedZone : item.lines[16] === 120 ? styles.faultedZone : styles.noInfoZone}>Zone 16: {this.zonesCurrentState(item.lines[16])}</Text>
                  <Text style={item.adapters[1].conn === 0 ? styles.red : item.adapters[1].conn === 1 ? styles.green : styles.grey}>Adapter 1 Status: {this.adapterConnectionStatus(item.adapters[1].conn)}</Text>
                  <Text style={item.adapters[1].door === 0 ? styles.red : item.adapters[1].door === 1 ? styles.green : styles.grey}>Adapter 1 Tamper: {this.ppkAdapterTamperState(item.adapters[1].door)}</Text>
                  <Text style={item.adapters[1].power === 0 ? styles.red : item.adapters[1].power === 1 ? styles.green : styles.grey}>Adapter 1 Power: {this.adapterPowerState(item.adapters[1].power)}</Text>
                  <Text style={item.adapters[2].conn === 0 ? styles.red : item.adapters[2].conn === 1 ? styles.green : styles.grey}>Adapter 2 Status: {this.adapterConnectionStatus(item.adapters[2].conn)}</Text>
                  <Text style={item.adapters[2].door === 0 ? styles.red : item.adapters[2].door === 1 ? styles.green : styles.grey}>Adapter 2 Tamper: {this.ppkAdapterTamperState(item.adapters[2].door)}</Text>
                  <Text style={item.adapters[2].power === 0 ? styles.red : item.adapters[2].power === 1 ? styles.green : styles.grey}>Adapter 2 Power: {this.adapterPowerState(item.adapters[2].power)}</Text>
                  <Text style={item.adapters[3].conn === 0 ? styles.red : item.adapters[3].conn === 1 ? styles.green : styles.grey}>Adapter 3 Status: {this.adapterConnectionStatus(item.adapters[3].conn)}</Text>
                  <Text style={item.adapters[3].door === 0 ? styles.red : item.adapters[3].door === 1 ? styles.green : styles.grey}>Adapter 3 Tamper: {this.ppkAdapterTamperState(item.adapters[3].door)}</Text>
                  <Text style={item.adapters[3].power === 0 ? styles.red : item.adapters[3].power === 1 ? styles.green : styles.grey}>Adapter 3 Power: {this.adapterPowerState(item.adapters[3].power)}</Text>
                  <Text style={item.adapters[4].conn === 0 ? styles.red : item.adapters[4].conn === 1 ? styles.green : styles.grey}>Adapter 4 Status: {this.adapterConnectionStatus(item.adapters[4].conn)}</Text>
                  <Text style={item.adapters[4].door === 0 ? styles.red : item.adapters[4].door === 1 ? styles.green : styles.grey}>Adapter 4 Tamper: {this.ppkAdapterTamperState(item.adapters[4].door)}</Text>
                  <Text style={item.adapters[4].power === 0 ? styles.red : item.adapters[4].power === 1 ? styles.green : styles.grey}>Adapter 4 Power: {this.adapterPowerState(item.adapters[4].power)}</Text>
                  <Text style={item.wsensors[11].conn === 0 ? styles.red : item.wsensors[11].conn === 1 ? styles.green : styles.grey}>Wireless Sensor 1 Status: {this.adapterConnectionStatus(item.wsensors[11].conn)}</Text>
                  <Text style={item.wsensors[11].door === 0 ? styles.red :  item.wsensors[11].door === 1 ? styles.green : styles.grey}>Wireless Sensor 1 Tamper: {this.ppkAdapterTamperState(item.wsensors[11].door)}</Text>
                  <Text style={item.wsensors[12].conn === 0 ? styles.red : item.wsensors[12].conn === 1 ? styles.green : styles.grey}>Wireless Sensor 2 Status: {this.adapterConnectionStatus(item.wsensors[12].conn)}</Text>
                  <Text style={item.wsensors[12].door === 0 ? styles.red :  item.wsensors[12].door === 1 ? styles.green : styles.grey}>Wireless Sensor 2 Tamper: {this.ppkAdapterTamperState(item.wsensors[12].door)}</Text>
                  <Text style={item.wsensors[13].conn === 0 ? styles.red : item.wsensors[13].conn === 1 ? styles.green : styles.grey}>Wireless Sensor 3 Status: {this.adapterConnectionStatus(item.wsensors[13].conn)}</Text>
                  <Text style={item.wsensors[13].door === 0 ? styles.red :  item.wsensors[13].door === 1 ? styles.green : styles.grey}>Wireless Sensor 3 Tamper: {this.ppkAdapterTamperState(item.wsensors[13].door)}</Text>
                  <Text style={item.c[0] === 0 ? styles.green : item.c[0] === 1 ? styles.blue : styles.grey}>Relay: {this.ppkCurrentState(item.c[0])}</Text>
                  <Text style={item.c[1] === 0 ? styles.green : item.c[1] === 1 ? styles.blue : styles.grey}>C1: {this.ppkCurrentState(item.c[1])}</Text>
                  <Text style={item.c[2] === 0 ? styles.green : item.c[2] === 1 ? styles.blue : styles.grey}>C2: {this.ppkCurrentState(item.c[2])}</Text>
                  <Text style={item.c[3] === 0 ? styles.green : item.c[3] === 1 ? styles.blue : styles.grey}>C3: {this.ppkCurrentState(item.c[3])}</Text>

                  
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
  normZone: {
  color: "green",
  },

  breakedZone: {
    color: "red", 
  },

  shortedZone: {
    color: "red",
  },

  faultedZone: {
    color: "#ead917",
  },

  noInfoZone: {
    color: "grey",
    /*visibility: "hidden",*/
  },
  ppkNumber: {
    backgroundColor: "#67809f",
    color: "white",
    fontWeight: "bold",
    borderRadius: 6,
    padding: 5,
    fontSize: 15,
  },
  ppkModel: {
    color: "#0d19a5",
    fontWeight: "bold",
  },
  ppkCard8l: {
    alignItems: "center",
    backgroundColor: "#d2d7d3",
    marginBottom: 10,
    padding: 10,    
    borderRadius: 20,
  },
  ppkCard4l: {
    alignItems: "center",
    backgroundColor: "#d2d7d3",
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
  },
  
});
