import React from 'react';
import axios from "axios";
import './App.css';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';


class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      ppks: [],
      alert: false
    }

    this.loadPpkInfo = this.loadPpkInfo.bind(this);	
	this.zonesCurrentState = this.zonesCurrentState.bind(this);
  }

    componentDidMount(){     
	  //this.intervalId = setInterval(() => this.loadPpkInfo(), 5000);
	   this.loadPpkInfo();
    }
	
	componentWillUnmount(){
		//clearInterval(this.intervalId);
	}

  loadPpkInfo(){
    axios.post("http://194.187.110.62:15004/api/devices/state/", {}, {
       headers: {
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Method": "POST",		
        "Content-Type": "application/json"                 
      },
      auth: {
        username: "Yurii",
        password: 123456
      }            
    })
      .then((ppks) => {
        console.log(ppks.data);
        this.setState({
          ppks: ppks.data.data
        });
        console.log(this.state.ppks);
        console.log(Object.keys(this.state.ppks));
        console.log(Object.entries(this.state.ppks));
        console.log(Object.values(this.state.ppks));        
        let ppkData1 = Object.values(this.state.ppks);
        console.log(ppkData1[0]);
        console.log(ppkData1[1]);
         console.log(ppkData1[1].c);
          console.log(ppkData1[1].radio);
          console.log(ppkData1[1].adapters);
          console.log(ppkData1[1].wsensors);

           
    console.log("wsensor1 connection: " + ppkData1[1].wsensors[11].conn);
    console.log("wsensor1 door: " + ppkData1[1].wsensors[11].door);
     console.log("adapter1 power: " + ppkData1[1].adapters[1].power);

         		  
		
      })
      .catch((err) => {
        console.log(err);        
      }); 
      
  }
  
   alertHandler(){	   
	   Alert.error('ALARM!', {
		        //preserveContext: true,
            position: 'top-left',
            effect: 'stackslide',
			      beep: false,
            timeout: 2000
        }); 
   }

 zonesCurrentState(state){
	   switch(state){
		   case 88:
		     return "Norm";		     
		   case 80:
		     this.alertHandler(); 
			 return "Breaked!";            		 
           case 112:
             return "Shorted";	
           case 120:
             return "Faulted";		   
		   default:
		     return "No info";			 
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
   
   ppsGroupState(state){
	   switch(state) {
		   case 0:
		     return "Disarmed";
		   case 1:
		     return "Armed";
		   default:
		     return "No info";		   
	   }
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
   
   ppkModel(model){
	   switch(model) {
		   case "8l":
		     return "Dunay 8L";
		   case "4l":
             return "Dunay 4L";
           default:
             return "Unknown device";		   
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
   
  
   
   
 render(){  

    let ppkData = Object.values(this.state.ppks);
    let ppk = Object.keys(this.state.ppks);
    
    //let ppkAll = Object.entries(this.state.ppks);	
    
	  

   

   return (
    <div className="App">     
     
 <button 
       className="btn btn-primary btn-front" 
       onClick={this.loadPpkInfo}
       type="submit">Show current info
     </button>

      <h2> My Devices:</h2>     
     

      <ul>Current info:
	  
      {ppkData.map((item, index) => {	
       if (item.model === "8l")	{  
        return (
          <div className="ppkCard" key={index + 1}>
		  <li style={{backgroundColor: "#dbb1b1", borderRadius: 17, fontWeight: "bold"}}>PPK Number: {ppk[index]}</li>
          <li style={{ color: "#0d19a5"}}><i className="fas fa-shield-alt"></i> PPK Model: {this.ppkModel(item.model)}</li>
          <li className={ item.online === 0 ? "red" : item.online === 1 ? "green" : "grey" }>Current Status: {this.ppkOnlineStatus(item.online)}</li>
          <li className={ item.power === 0 ? "red" : item.power === 1 ? "green" : "grey" }>220V: {this.ppkCurrentState(item.power)}</li>
          <li className={ item.accum === 0 ? "red" : item.accum === 1 ? "green" : "grey" }>Accumulator Battery: {this.ppkCurrentState(item.accum)}</li>
          <li className={ item.door === 0 ? "red" : item.door === 1 ? "green" : "grey" }>Tamper: {this.ppkAdapterTamperState(item.door)}</li>
		  
		  {/*Groups*/}
          <li className={item.groups[1] === 0 ? "green" : item.groups[1] === 1 ? "red" : "grey" }>Group 1: {this.ppsGroupState(item.groups[1])}</li>
          <li className={item.groups[2] === 0 ? "green" : item.groups[2] === 1 ? "red" : "grey" }>Group 2: {this.ppsGroupState(item.groups[2])}</li>
          <li className={item.groups[3] === 0 ? "green" : item.groups[3] === 1 ? "red" : "grey" }>Group 3: {this.ppsGroupState(item.groups[3])}</li>
          <li className={item.groups[4] === 0 ? "green" : item.groups[4] === 1 ? "red" : "grey" }>Group 4: {this.ppsGroupState(item.groups[4])}</li>
		  <li className={item.groups[5] === 0 ? "green" : item.groups[5] === 1 ? "red" : "grey" }>Group 5: {this.ppsGroupState(item.groups[5])}</li>
		  <li className={item.groups[6] === 0 ? "green" : item.groups[6] === 1 ? "red" : "grey" }>Group 6: {this.ppsGroupState(item.groups[6])}</li>
		  <li className={item.groups[7] === 0 ? "green" : item.groups[7] === 1 ? "red" : "grey" }>Group 7: {this.ppsGroupState(item.groups[7])}</li>
		  <li className={item.groups[8] === 0 ? "green" : item.groups[8] === 1 ? "red" : "grey" }>Group 8: {this.ppsGroupState(item.groups[8])}</li>
		            
		  {/*Zones*/}
          <li className={item.lines[1] === 88 ? "norm-zone" : 
		    item.lines[1] === 80 ? "breaked-zone" : 
			item.lines[1] === 112 ? "shorted-zone" : 
			item.lines[1] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 1: {this.zonesCurrentState(item.lines[1])}
		  </li>
          <li className={item.lines[2] === 88 ? "norm-zone" : 
		    item.lines[2] === 80 ? "breaked-zone" : 
			item.lines[2] === 112 ? "shorted-zone" : 
			item.lines[2] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 2: {this.zonesCurrentState(item.lines[2])}
		  </li>
          <li className={item.lines[3] === 88 ? "norm-zone" : 
		    item.lines[3] === 80 ? "breaked-zone" : 
			item.lines[3] === 112 ? "shorted-zone" : 
			item.lines[3] === 120 ? "faulted-zone" : "no-info-zone"}>
		    Zone 3: {this.zonesCurrentState(item.lines[3])}
		  </li>
          <li className={item.lines[4] === 88 ? "norm-zone" : 
		    item.lines[4] === 80 ? "breaked-zone" : 
			item.lines[4] === 112 ? "shorted-zone" : 
			item.lines[4] === 120 ? "faulted-zone" : "no-info-zone"}>
		    Zone 4: {this.zonesCurrentState(item.lines[4])}
		  </li>
          <li className={item.lines[5] === 88 ? "norm-zone" : 
		    item.lines[5] === 80 ? "breaked-zone" : 
			item.lines[5] === 112 ? "shorted-zone" : 
			item.lines[5] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 5: {this.zonesCurrentState(item.lines[5])}
		  </li>
          <li className={item.lines[6] === 88 ? "norm-zone" : 
		    item.lines[6] === 80 ? "breaked-zone" : 
			item.lines[6] === 112 ? "shorted-zone" : 
			item.lines[6] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 6: {this.zonesCurrentState(item.lines[6])}
		  </li>
          <li className={item.lines[7] === 88 ? "norm-zone" : 
		    item.lines[7] === 80 ? "breaked-zone" : 
			item.lines[7] === 112 ? "shorted-zone" : 
			item.lines[7] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 7: {this.zonesCurrentState(item.lines[7])}
	      </li>
          <li className={item.lines[8] === 88 ? "norm-zone" : 
		    item.lines[8] === 80 ? "breaked-zone" : 
			item.lines[8] === 112 ? "shorted-zone" : 
			item.lines[8] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 8: {this.zonesCurrentState(item.lines[8])}
		  </li>          
          
          {/*Outputs and Relay*/} 		  
          <li className={item.uk2 === 0 ? "green" : item.uk2 === 1 ? "blue" : "grey"}>UK2: {this.ppkCurrentState(item.uk2)}</li>
          <li className={item.uk3 === 0 ? "green" : item.uk3 === 1 ? "blue" : "grey"}>UK3: {this.ppkCurrentState(item.uk3)}</li>
          <li className={item.relay2 === 0 ? "green" : item.relay2 === 1 ? "blue" : "grey"}>Relay: {this.ppkCurrentState(item.relay2)}</li>
          <br /> 






          
          </div>
     ) } else if (item.model === "4l") {
	 return (
          <div key={index + 1}>
		  <li style={{backgroundColor: "#dbb1b1", borderRadius: 17, fontWeight: "bold"}}>PPK Number: {ppk[index]}</li>
          <li style={{ color: "#0d19a5"}}>PPK Model: {this.ppkModel(item.model)}</li>
          <li className={ item.online === 0 ? "red" : item.online === 1 ? "green" : "grey" }>Current Status: {this.ppkOnlineStatus(item.online)}</li>
          <li className={ item.power === 0 ? "red" : item.power === 1 ? "green" : "grey" }>220V: {this.ppkCurrentState(item.power)}</li>
          <li className={ item.accum === 0 ? "red" : item.accum === 1 ? "green" : "grey" }>Accumulator Battery: {this.ppkCurrentState(item.accum)}</li>
          <li className={ item.door === 0 ? "red" : item.door === 1 ? "green" : "grey" }>Tamper: {this.ppkAdapterTamperState(item.door)}</li>
          
		  {/*Groups*/}
      <li className={item.groups[1] === 0 ? "green" : item.groups[1] === 1 ? "red" : "grey" }>Group 1: {this.ppsGroupState(item.groups[1])}</li>
      <li className={item.groups[2] === 0 ? "green" : item.groups[2] === 1 ? "red" : "grey" }>Group 2: {this.ppsGroupState(item.groups[2])}</li>
      <li className={item.groups[3] === 0 ? "green" : item.groups[3] === 1 ? "red" : "grey" }>Group 3: {this.ppsGroupState(item.groups[3])}</li>
      <li className={item.groups[4] === 0 ? "green" : item.groups[4] === 1 ? "red" : "grey" }>Group 4: {this.ppsGroupState(item.groups[4])}</li>
		  <li className={item.groups[5] === 0 ? "green" : item.groups[5] === 1 ? "red" : "grey" }>Group 5: {this.ppsGroupState(item.groups[5])}</li>
		  <li className={item.groups[6] === 0 ? "green" : item.groups[6] === 1 ? "red" : "grey" }>Group 6: {this.ppsGroupState(item.groups[6])}</li>
		  <li className={item.groups[7] === 0 ? "green" : item.groups[7] === 1 ? "red" : "grey" }>Group 7: {this.ppsGroupState(item.groups[7])}</li>
		  <li className={item.groups[8] === 0 ? "green" : item.groups[8] === 1 ? "red" : "grey" }>Group 8: {this.ppsGroupState(item.groups[8])}</li>
		  <li className={item.groups[9] === 0 ? "green" : item.groups[9] === 1 ? "red" : "grey" }>Group 9: {this.ppsGroupState(item.groups[9])}</li>
		  <li className={item.groups[10] === 0 ? "green" : item.groups[10] === 1 ? "red" : "grey" }>Group 10: {this.ppsGroupState(item.groups[10])}</li>
		  <li className={item.groups[11] === 0 ? "green" : item.groups[11] === 1 ? "red" : "grey" }>Group 11: {this.ppsGroupState(item.groups[11])}</li>
		  <li className={item.groups[12] === 0 ? "green" : item.groups[12] === 1 ? "red" : "grey" }>Group 12: {this.ppsGroupState(item.groups[12])}</li>
		  <li className={item.groups[13] === 0 ? "green" : item.groups[13] === 1 ? "red" : "grey" }>Group 13: {this.ppsGroupState(item.groups[13])}</li>
		  <li className={item.groups[14] === 0 ? "green" : item.groups[14] === 1 ? "red" : "grey" }>Group 14: {this.ppsGroupState(item.groups[14])}</li>
		  <li className={item.groups[15] === 0 ? "green" : item.groups[15] === 1 ? "red" : "grey" }>Group 15: {this.ppsGroupState(item.groups[15])}</li>
		  <li className={item.groups[16] === 0 ? "green" : item.groups[16] === 1 ? "red" : "grey" }>Group 16: {this.ppsGroupState(item.groups[16])}</li>
          
		  {/*Zones*/}
          <li className={item.lines[1] === 88 ? "norm-zone" : 
		    item.lines[1] === 80 ? "breaked-zone" : 
			item.lines[1] === 112 ? "shorted-zone" : 
			item.lines[1] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 1: {this.zonesCurrentState(item.lines[1])}
		  </li>
          <li className={item.lines[2] === 88 ? "norm-zone" : 
		    item.lines[2] === 80 ? "breaked-zone" : 
			item.lines[2] === 112 ? "shorted-zone" : 
			item.lines[2] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 2: {this.zonesCurrentState(item.lines[2])}
		  </li>
          <li className={item.lines[3] === 88 ? "norm-zone" : 
		    item.lines[3] === 80 ? "breaked-zone" : 
			item.lines[3] === 112 ? "shorted-zone" : 
			item.lines[3] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 3: {this.zonesCurrentState(item.lines[3])}
		  </li>
          <li className={item.lines[4] === 88 ? "norm-zone" : 
		    item.lines[4] === 80 ? "breaked-zone" : 
			item.lines[4] === 112 ? "shorted-zone" : 
			item.lines[4] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 4: {this.zonesCurrentState(item.lines[4])}
		  </li>
          <li className={item.lines[5] === 88 ? "norm-zone" : 
		    item.lines[5] === 80 ? "breaked-zone" : 
			item.lines[5] === 112 ? "shorted-zone" : 
			item.lines[5] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 5: {this.zonesCurrentState(item.lines[5])}
		  </li>
          <li className={item.lines[6] === 88 ? "norm-zone" : 
		    item.lines[6] === 80 ? "breaked-zone" : 
			item.lines[6] === 112 ? "shorted-zone" : 
			item.lines[6] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 6: {this.zonesCurrentState(item.lines[6])}
		  </li>
          <li className={item.lines[7] === 88 ? "norm-zone" : 
		    item.lines[7] === 80 ? "breaked-zone" : 
			item.lines[7] === 112 ? "shorted-zone" : 
			item.lines[7] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 7: {this.zonesCurrentState(item.lines[7])}
		  </li>
          <li className={item.lines[8] === 88 ? "norm-zone" : 
		    item.lines[8] === 80 ? "breaked-zone" : 
			item.lines[8] === 112 ? "shorted-zone" : 
			item.lines[8] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 8: {this.zonesCurrentState(item.lines[8])}
		  </li>
          <li className={item.lines[9] === 88 ? "norm-zone" : 
		    item.lines[9] === 80 ? "breaked-zone" : 
			item.lines[9] === 112 ? "shorted-zone" : 
			item.lines[9] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 9: {this.zonesCurrentState(item.lines[9])}
		  </li>
          <li className={item.lines[10] === 88 ? "norm-zone" : 
		    item.lines[10] === 80 ? "breaked-zone" : 
			item.lines[10] === 112 ? "shorted-zone" : 
			item.lines[10] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 10: {this.zonesCurrentState(item.lines[10])}
		  </li>
          <li className={item.lines[11] === 88 ? "norm-zone" : 
		    item.lines[11] === 80 ? "breaked-zone" : 
			item.lines[11] === 112 ? "shorted-zone" : 
			item.lines[11] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 11: {this.zonesCurrentState(item.lines[11])}
		  </li>
          <li className={item.lines[12] === 88 ? "norm-zone" : 
		    item.lines[12] === 80 ? "breaked-zone" : 
			item.lines[12] === 112 ? "shorted-zone" : 
			item.lines[12] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 12: {this.zonesCurrentState(item.lines[12])}
		  </li>
          <li className={item.lines[13] === 88 ? "norm-zone" : 
		    item.lines[13] === 80 ? "breaked-zone" : 
			item.lines[13] === 112 ? "shorted-zone" : 
			item.lines[13] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 13: {this.zonesCurrentState(item.lines[13])}
		  </li>
          <li className={item.lines[14] === 88 ? "norm-zone" : 
		    item.lines[14] === 80 ? "breaked-zone" : 
			item.lines[14] === 112 ? "shorted-zone" : 
			item.lines[14] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 14: {this.zonesCurrentState(item.lines[14])}
		  </li>
          <li className={item.lines[15] === 88 ? "norm-zone" : 
		    item.lines[15] === 80 ? "breaked-zone" : 
			item.lines[15] === 112 ? "shorted-zone" : 
			item.lines[15] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 15: {this.zonesCurrentState(item.lines[15])}
		  </li>
          <li className={item.lines[16] === 88 ? "norm-zone" : 
		    item.lines[16] === 80 ? "breaked-zone" : 
			item.lines[16] === 112 ? "shorted-zone" : 
			item.lines[16] === 120 ? "faulted-zone" : "no-info-zone"}>
			Zone 16: {this.zonesCurrentState(item.lines[16])}
		  </li>

          {/*Adapters*/}
		  <li className={item.adapters[1].conn === 0 ? "red" : 
		    item.adapters[1].conn === 1 ? "green" : "grey"}>
		    Adapter 1 Status: {this.adapterConnectionStatus(item.adapters[1].conn)}
		  </li>
		  <li className={item.adapters[1].door === 0 ? "red" : 
		    item.adapters[1].door === 1 ? "green" : "grey"}>
		    Adapter 1 Tamper: {this.ppkAdapterTamperState(item.adapters[1].door)}
		  </li>
		  <li className={item.adapters[1].power === 0 ? "red" : 
		    item.adapters[1].power === 1 ? "green" : "grey"}>
		    Adapter 1 Power: {this.adapterPowerState(item.adapters[1].power)}
		  </li>
		  
		  <li className={item.adapters[2].conn === 0 ? "red" : 
		    item.adapters[2].conn === 1 ? "green" : "grey"}>
		    Adapter 2 Status: {this.adapterConnectionStatus(item.adapters[2].conn)}
		  </li>
		  <li className={item.adapters[2].door === 0 ? "red" : 
		    item.adapters[2].door === 1 ? "green" : "grey"}>
		    Adapter 2 Tamper: {this.ppkAdapterTamperState(item.adapters[2].door)}
		  </li>
		  <li className={item.adapters[2].power === 0 ? "red" : 
		    item.adapters[2].power === 1 ? "green" : "grey"}>
		    Adapter 2 Power: {this.adapterPowerState(item.adapters[2].power)}
		  </li>
		  
		  <li className={item.adapters[3].conn === 0 ? "red" : 
		    item.adapters[3].conn === 1 ? "green" : "grey"}>
		    Adapter 3 Status: {this.adapterConnectionStatus(item.adapters[3].conn)}
		  </li>
		  <li className={item.adapters[3].door === 0 ? "red" : 
		    item.adapters[3].door === 1 ? "green" : "grey"}>
		    Adapter 3 Tamper: {this.ppkAdapterTamperState(item.adapters[3].door)}
		  </li>
		  <li className={item.adapters[3].power === 0 ? "red" : 
		    item.adapters[3].power === 1 ? "green" : "grey"}>
		    Adapter 3 Power: {this.adapterPowerState(item.adapters[3].power)}
		  </li>
		  
		  <li className={item.adapters[4].conn === 0 ? "red" : 
		    item.adapters[4].conn === 1 ? "green" : "grey"}>
		    Adapter 4 Status: {this.adapterConnectionStatus(item.adapters[4].conn)}
		  </li>
		  <li className={item.adapters[4].door === 0 ? "red" : 
		    item.adapters[4].door === 1 ? "green" : "grey"}>
		    Adapter 4 Tamper: {this.ppkAdapterTamperState(item.adapters[4].door)}
		  </li>
		  <li className={item.adapters[4].power === 0 ? "red" : 
		    item.adapters[4].power === 1 ? "green" : "grey"}>
		    Adapter 4 Power: {this.adapterPowerState(item.adapters[4].power)}
		  </li>
		  
		  {/*Wireless Sensors*/}
		  <li className={item.wsensors[11].conn === 0 ? "red" : 
		    item.wsensors[11].conn === 1 ? "green" : "grey"}>
			Wireless Sensor 1 Status: {this.adapterConnectionStatus(item.wsensors[11].conn)}
		  </li>
		  <li className={item.wsensors[11].door === 0 ? "red" : 
		    item.wsensors[11].door === 1 ? "green" : "grey"}>
			Wireless Sensor 1 Tamper: {this.ppkAdapterTamperState(item.wsensors[11].door)}
		  </li>
		  
		  <li className={item.wsensors[12].conn === 0 ? "red" : 
		    item.wsensors[12].conn === 1 ? "green" : "grey"}>
			Wireless Sensor 2 Status: {this.adapterConnectionStatus(item.wsensors[12].conn)}
		  </li>
		  <li className={item.wsensors[12].door === 0 ? "red" : 
		    item.wsensors[12].door === 1 ? "green" : "grey"}>
			Wireless Sensor 2 Tamper: {this.ppkAdapterTamperState(item.wsensors[12].door)}
		  </li>
		  
		  <li className={item.wsensors[13].conn === 0 ? "red" : 
		    item.wsensors[13].conn === 1 ? "green" : "grey"}>
			Wireless Sensor 3 Status: {this.adapterConnectionStatus(item.wsensors[13].conn)}
		  </li>
		  <li className={item.wsensors[13].door === 0 ? "red" : 
		    item.wsensors[13].door === 1 ? "green" : "grey"}>
			Wireless Sensor 3 Tamper: {this.ppkAdapterTamperState(item.wsensors[13].door)}
		  </li>
		  
		  {/*Outputs and Relay*/} 	
          <li className={item.c[0] === 0 ? "green" : item.c[0] === 1 ? "blue" : "grey"}>Relay: {this.ppkCurrentState(item.c[0])}</li>
		  <li className={item.c[1] === 0 ? "green" : item.c[1] === 1 ? "blue" : "grey"}>C1: {this.ppkCurrentState(item.c[1])}</li>
		  <li className={item.c[2] === 0 ? "green" : item.c[2] === 1 ? "blue" : "grey"}>C2: {this.ppkCurrentState(item.c[2])}</li>
		  <li className={item.c[3] === 0 ? "green" : item.c[3] === 1 ? "blue" : "grey"}>C3: {this.ppkCurrentState(item.c[3])}</li>
		  
		  <br /> 

   




          
          </div>
          )
} else {
	return (
	<div>Unknown device</div>
	)
}




      })}
	  
	  
	
      </ul>
	  
	<table className="table table-borderless table-sm">
  <thead>
    <tr>      
      <th scope="col">Name</th>
      <th scope="col">Event</th>      
    </tr>
  </thead>
  <tbody>
    <tr>      
      <td>Mark</td>
      <td>Otto</td>      
    </tr>   
  </tbody>
</table>

            
<Alert stack={{limit: 3}} beep='./alert-sound/1.mp3' />
    </div>
  );
}
 }
  

export default App;
