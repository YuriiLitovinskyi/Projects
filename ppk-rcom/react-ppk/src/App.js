import React from 'react';
import axios from "axios";
import './App.css';


class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      ppks: []
    }

    this.loadPpkInfo = this.loadPpkInfo.bind(this);	
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

         //console.log(Object.keys(this.state.ppks.wsensors));
     
          
      })
      .catch((err) => {
        console.log(err);        
      }); 
      
  }

 zonesCurrentState(state){
	   switch(state){
		   case 88:
		     return "Norm";		     
		   case 80:
		     return "Breaked";
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
 render(){  

    let ppkData = Object.values(this.state.ppks);
    let ppk = Object.keys(this.state.ppks);
    
    let ppkAll = Object.entries(this.state.ppks);	
    
	//const {111: {wsensors: {11: {conn: С1}} } } = ppkAll;
	//const {111: {adapters: {1: {conn: С1}} } } = ppkAll;
  

   

   return (
    <div className="App">
     
 <button 
       className="btn btn-primary btn-front" 
       onClick={this.loadPpkInfo}
       type="submit">Show current info
     </button>

      <h2> My Devises:</h2>
      {ppk.map((item, index) => {
        return (
          
          <div key={index}>My device #{index+1}: {item}</div>    
        
          )
        
      })}
     

      <ul>Current info:
	  
      {ppkData.map((item, index) => {
        return (
          <div key={index + 1}>
		  <li style={{backgroundColor: '#dbb1b1', borderRadius: 17}}>PPK Number: {ppk[index]}</li>
          <li>PPK Model: {item.model === "8l" ? "Dunay-8L" : item.model === "4l" ? "Dunay-4L" : "Unknown device"}</li>
          <li style={{ backgroundColor: item.online === 0 ? "red" : "green" }}>Current Status: {item.online === 0 ? "offline" : item.online === 1 ? "online" : "No info"}</li>
          <li>220V: {this.ppkCurrentState(item.power)}</li>
          <li>AK Battery: {this.ppkCurrentState(item.accum)}</li>
          <li>Tamper: {item.door === 0 ? "Opened" : item.door === 1 ? "Closed" : "No info"}</li>
          
          <li>Group 1: {item.groups[1] === 0 ? "Disarmed" : item.groups[1] === 1 ? "Armed" : "No info"}</li>
          <li>Group 2: {item.groups[2] === 0 ? "Disarmed" : item.groups[2] === 1 ? "Armed" : "No info"}</li>
          <li>Group 3: {item.groups[3] === 0 ? "Disarmed" : item.groups[3] === 1 ? "Armed" : "No info"}</li>
          <li>Group 4: {item.groups[4] === 0 ? "Disarmed" : item.groups[4] === 1 ? "Armed" : "No info"}</li>
          
          <li>Zone 1: {this.zonesCurrentState(item.lines[1])}</li>
          <li>Zone 2: {this.zonesCurrentState(item.lines[2])}</li>
          <li>Zone 3: {this.zonesCurrentState(item.lines[3])}</li>
          <li>Zone 4: {this.zonesCurrentState(item.lines[4])}</li>
          <li>Zone 5: {this.zonesCurrentState(item.lines[5])}</li>
          <li>Zone 6: {this.zonesCurrentState(item.lines[6])}</li>
          <li>Zone 7: {this.zonesCurrentState(item.lines[7])}</li>
          <li>Zone 8: {this.zonesCurrentState(item.lines[8])}</li>
          <li>Zone 9: {this.zonesCurrentState(item.lines[9])}</li>
          <li>Zone 10: {this.zonesCurrentState(item.lines[10])}</li>
          <li>Zone 11: {this.zonesCurrentState(item.lines[11])}</li>
          <li>Zone 12: {this.zonesCurrentState(item.lines[12])}</li>
          <li>Zone 13: {this.zonesCurrentState(item.lines[13])}</li>
          <li>Zone 14: {this.zonesCurrentState(item.lines[14])}</li>
          <li>Zone 15: {this.zonesCurrentState(item.lines[15])}</li>
          <li>Zone 16: {this.zonesCurrentState(item.lines[16])}</li>

          <li>UK2: {this.ppkCurrentState(item.uk2)}</li>
          <li>UK3: {this.ppkCurrentState(item.uk3)}</li>
          <li>Relay: {this.ppkCurrentState(item.relay2)}</li>
          <br /> 






          
          </div>
          )
      })}
      </ul>
	  
	

            

    </div>
  );
}
 }
  

export default App;
