import React from 'react';
import axios from "axios";
import './App.css';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';


class App extends React.Component {

  constructor(props){
    super(props);

if (localStorage.getItem("formData")) {
  this.state = JSON.parse(localStorage.getItem("formData"));
} else {
  this.state = {
    ppks: [],
    alert: false,
    ipState: "",
    portState: "",
    userNameState: "",
    passwordState: "",
   // refreshButttonDisabled: true
}
    
    }

    this.loadPpkInfo = this.loadPpkInfo.bind(this);	
	this.zonesCurrentState = this.zonesCurrentState.bind(this);
	this.remotePpkControl = this.remotePpkControl.bind(this);
  }

    setinterv(e){   
       e.preventDefault();	
	   this.intervalId = setInterval(() => this.loadPpkInfo(), 50000);
	   this.loadPpkInfo();
    }
	
	componentWillUnmount(){
	   clearInterval(this.intervalId);
	}

  //Event Handlers
  ipHandler = (event) => {
	  this.setState({ipState: event.target.value}, () => {
      localStorage.setItem("formData", JSON.stringify(this.state));
    })
  }
  
  portHandler = (event) => {
	  this.setState({portState: event.target.value}, () => {
      localStorage.setItem("formData", JSON.stringify(this.state));
    })
  }
  
  userNameHandler = (event) => {
	  this.setState({userNameState: event.target.value}, () => {
      localStorage.setItem("formData", JSON.stringify(this.state));
    })
  }
  
  passwordHandler = (event) => {
	  this.setState({passwordState: event.target.value}, () => {
      localStorage.setItem("formData", JSON.stringify(this.state));
    })
  }

  loadPpkInfo(){
	  //e.preventDefault();
	  const ipAddress = this.state.ipState;
	  const port = this.state.portState;
	  const userName = this.state.userNameState;
	  const pass = this.state.passwordState;
	  
    axios.post("http://"+ipAddress+":"+port+"/api/devices/state/", {}, {
       headers: {
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Method": "POST",		
        "Content-Type": "application/json"                 
      },
      auth: {
        username: userName,
        password: pass
      }            
    })
      .then((ppks) => {
        console.log(ppks.data);
        this.setState({
          ppks: ppks.data.data
         // refreshButttonDisabled: false
        });
      //localStorage.clear();       		  
      })
      .catch((err) => {
        console.log(err); 
        alert("No connection to Server..."); 
        window.location.reload(); 		
      }); 
      
  }

	remotePpkControl(ppkNumber, command, entityName, entityNumber){
		//e.preventDefault();
		const ipAddress = this.state.ipState;
		const port = this.state.portState;
		const userName = this.state.userNameState;
		const pass = this.state.passwordState;		
		  
	    axios.post("http://"+ipAddress+":"+port+"/api/devices/"+ppkNumber+"/command/", {}, {
	       headers: {
	        "Access-Control-Allow-Origin": "*", 
	        "Access-Control-Allow-Method": "POST",		
	        "Content-Type": "application/json"                 
	      },
	      auth: {
	        username: userName,
	        password: pass
	      },
	      data: {
	      	"command": command,
	        "entity_name": entityName,
		    "entity_number": entityNumber,
		    "device_license_key": "169-235-006-120-007-196",  //4l => 169-235-006-120-007-196  8l => 037-246-006-048-003-030
		    "device_password": "123456"
	      }            
	    })
	    .then((res) => {
	    	console.log(res);
	    	//this.loadPpkInfo();
	    })
	    .catch((err) => {
	    	console.log(err);
	    })
		}
  
   alertHandler(){	   
	   Alert.error('ALARM! ZONE BREAK!', {		    
            position: 'top-left',
            effect: 'stackslide',
			beep: false,
            //timeout: 5000
        }); 
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

   zonesCssClass(data){
	   	switch(data){
	   		case 88:
	   		 return "norm-zone";
	   		case 80:
	   		 return "breaked-zone";
	   		case 112:
	   		 return "shorted-zone";
	   		case 120:
	   		 return "faulted-zone";
	   		default:
	   		 return "hide";
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
		   case 2:
             return "Armed (Staying home mode)";
		   default:
		     return "No info";		   
	   }
   }

   ppkGroupClass(data){
	   	switch(data) {	   		
		    case 0:
		     return "green";
		    case 1:
		    case 2:
		     return "blue";
		    default:
		     return "hide";
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

   ppkCRCStatus(state){
	   	switch(state) {
	   		case 0:
		     return "Disabled";
		    case 1:
		     return "Enabled";
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
           case "2l":
             return "Dunay 2L";
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

   baseCssClass(data){
	   	switch(data){
	   		case 0:
	   		 return "red";
	   		case 1:
	   		 return "green";
	   		default:
	   		 return "grey";
	   	}
   }

   outputRelayCssClass(data){ 
	   	switch(data){
	   		case 0:
	   		 return "green";
	   		case 1:
	   		 return "blue";
	   		default:
	   		 return "grey";
	   	}
   }

   disabledButtonControl(online){       // , enabled
   	if (online === 0){                 // || enabled === 0
   		return true;
   	} else {
   		return false;
   	}
   }
      
 render(){  

    let ppkData = Object.values(this.state.ppks);    
    let ppk = Object.keys(this.state.ppks);
    
   return (
    <div className="App">   
      <form className="formInput" onSubmit={this.setinterv.bind(this)}>
  <div className="form-row">
    <div className="col">
	  <label htmlFor="ip">IP Address</label>
      <input type="text" 
	         minLength="7" 
			 maxLength="15" 
			 className="form-control form-control-sm" 
			 placeholder="xxx.xxx.xxx.xxx" 
			 required 
			 pattern="^([0-9]{1,3}\.){3}[0-9]{1,3}$" 
			 value={this.state.ipState} 
			 onChange={this.ipHandler.bind(this)}/>
    </div>
    <div className="col">
	  <label htmlFor="port">Port</label>
      <input type="number" 
	         className="form-control form-control-sm" 
			 placeholder="Port" 
			 required  
			 error={this.state.numberOfKeys > 65535 ? 'Enter a number less than 65535' : ''}
             max={65535} 
			 value={this.state.portState} 
			 onChange={this.portHandler.bind(this)} />
    </div>
    <div className="col">
	  <label htmlFor="login">Login</label>
      <input type="text" 
	         className="form-control form-control-sm" 
			 placeholder="Username" 
			 maxLength="20" 
			 required 
			 value={this.state.userNameState} 
			 onChange={this.userNameHandler.bind(this)} />
    </div>
	<div className="col">
	  <label htmlFor="password">Password</label>
      <input type="password" 
	         className="form-control form-control-sm" 
			 placeholder="Password" 
			 maxLength="20" 
			 required 
			 autoComplete="password" 
			 value={this.state.passwordState} 
			 onChange={this.passwordHandler.bind(this)} />
    </div>
  </div>
  <div className="col-auto my-1">
      <button type="submit" className="btn btn-dark">Apply</button>
    </div>
</form>
      {/*
      <button 
       className="btn btn-primary btn-front" 
       disabled={this.state.refreshButttonDisabled} 
       onClick={this.loadPpkInfo}
       type="submit">Show current info
     </button>
      */}
      <h2> My Devices:</h2>           
		
      <ul>
      {ppkData.map((item, index) => {	
       if (item.model === "8l")	{  
        return (
          <div className="ppkCard" key={index + 1}>
		  <li className="ppkNumber">PPK Number: {ppk[index]}</li>
          <li style={{ color: "#0d19a5", fontWeight: "bold"}}>
		    <i className="fas fa-shield-alt"></i> PPK Model: {this.ppkModel(item.model)}
		  </li>
          <li className={ this.baseCssClass(item.online)}>
			Current Status: {this.ppkOnlineStatus(item.online)}
		  </li>
		  <li className={ this.baseCssClass(item.enabled)}>
			Centralized Remote Control Status: {this.ppkCRCStatus(item.enabled)}
		  </li>		  
          <li className={ this.baseCssClass(item.power)}>
			220V: {this.ppkCurrentState(item.power)}
		  </li>
          <li className={ this.baseCssClass(item.accum)}>
			Accumulator Battery: {this.ppkCurrentState(item.accum)}
		  </li>
          <li className={ this.baseCssClass(item.door)}>
			Tamper: {this.ppkAdapterTamperState(item.door)}
		  </li>
		  
		  {/*Groups*/}	  

          <li className={this.ppkGroupClass(item.groups[1])}>
			Group 1: {this.ppsGroupState(item.groups[1])}
			<button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_on", "group", 1) }}>Arm Group</button> 
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_off", "group", 1) }}>Disarm Group</button>
		  </li>
          <li className={this.ppkGroupClass(item.groups[2])}>
			Group 2: {this.ppsGroupState(item.groups[2])}
		  </li>
          <li className={this.ppkGroupClass(item.groups[3])}>
			Group 3: {this.ppsGroupState(item.groups[3])}
		  </li>
          <li className={this.ppkGroupClass(item.groups[4])}>
			Group 4: {this.ppsGroupState(item.groups[4])}
		  </li>
		  <li className={this.ppkGroupClass(item.groups[5])}>
			Group 5: {this.ppsGroupState(item.groups[5])}
		  </li>
		  <li className={this.ppkGroupClass(item.groups[6])}>
			Group 6: {this.ppsGroupState(item.groups[6])}
		  </li>
		  <li className={this.ppkGroupClass(item.groups[7])}>
			Group 7: {this.ppsGroupState(item.groups[7])}
		  </li>
		  <li className={this.ppkGroupClass(item.groups[8])}>
			Group 8: {this.ppsGroupState(item.groups[8])}
		  </li>
		            
		  {/*Zones*/}
          <li className={ this.zonesCssClass(item.lines[1]) }>
			Zone 1: { this.zonesCurrentState(item.lines[1]) }
		  </li>
          <li className={ this.zonesCssClass(item.lines[2]) }>
			Zone 2: { this.zonesCurrentState(item.lines[2]) }
		  </li>
          <li className={ this.zonesCssClass(item.lines[3]) }>
		    Zone 3: { this.zonesCurrentState(item.lines[3]) }
		  </li>
          <li className={ this.zonesCssClass(item.lines[4]) }>
		    Zone 4: {this.zonesCurrentState(item.lines[4])}
		  </li>
          <li className={ this.zonesCssClass(item.lines[5]) }>
			Zone 5: { this.zonesCurrentState(item.lines[5]) }
		  </li>
          <li className={ this.zonesCssClass(item.lines[6]) }>
			Zone 6: { this.zonesCurrentState(item.lines[6]) }
		  </li>
          <li className={ this.zonesCssClass(item.lines[7]) }>
			Zone 7: { this.zonesCurrentState(item.lines[7]) }
	      </li>
          <li className={ this.zonesCssClass(item.lines[8]) }>
			Zone 8: { this.zonesCurrentState(item.lines[8]) }
		  </li>          
          
          {/*Outputs and Relay*/} 		  
          <li className={ this.outputRelayCssClass(item.uk2) }>
		    UK2: {this.ppkCurrentState(item.uk2)}
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_on", "uk", 2) }}>Turn Uk2 ON</button> 
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_off", "uk", 2) }}>Turn Uk2 OFF</button>
		  </li>		  
          <li className={ this.outputRelayCssClass(item.uk3) }>
		    UK3: {this.ppkCurrentState(item.uk3)}
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_on", "uk", 3) }}>Turn Uk2 ON</button> 
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_off", "uk", 3) }}>Turn Uk2 OFF</button>
		  </li>
          <li className={ this.outputRelayCssClass(item.relay2) }>
		    Relay: {this.ppkCurrentState(item.relay2)}
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_on", "relay", 2) }}>Turn Uk2 ON</button> 
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_off", "relay", 2) }}>Turn Uk2 OFF</button>
		  </li>
          <br /> 
          </div>
		  
     ) } else if (item.model === "4l" || "2l") {
	 return (
          <div className="ppkCard" key={index + 1}>
		  <li className="ppkNumber">PPK Number: {ppk[index]}</li>
          <li style={{ color: "#0d19a5", fontWeight: "bold"}}>
		    <i className="fas fa-shield-alt"></i> PPK Model: {this.ppkModel(item.model)}
		    </li>
          <li className={ this.baseCssClass(item.online) }>
			Current Status: {this.ppkOnlineStatus(item.online) }
		  </li>
		  <li className={ this.baseCssClass(item.enabled) }>
			Centralized Remote Control Status: {this.ppkCRCStatus(item.enabled)}
		  </li>
          <li className={ this.baseCssClass(item.power) }>
		    220V: {this.ppkCurrentState(item.power)}
		  </li>
          <li className={ this.baseCssClass(item.accum) }>
		    Accumulator Battery: {this.ppkCurrentState(item.accum)}
		  </li>
          <li className={ this.baseCssClass(item.door) }>
		    Tamper: {this.ppkAdapterTamperState(item.door)}
		  </li>
          
		  {/*Groups*/}
          <li className={this.ppkGroupClass(item.groups[1])}>
		    Group 1: {this.ppsGroupState(item.groups[1])}
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_on", "group", 1) }}>Arm Group</button> 
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_off", "group", 1) }}>Disarm Group</button>
		  </li>
          <li className={this.ppkGroupClass(item.groups[2])}>
		    Group 2: {this.ppsGroupState(item.groups[2])}
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_on", "group", 2) }}>Arm Group</button> 
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_off", "group", 2) }}>Disarm Group</button>
		  </li>
          <li className={this.ppkGroupClass(item.groups[3])}>
		    Group 3: {this.ppsGroupState(item.groups[3])}
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_on", "group", 3) }}>Arm Group</button> 
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_off", "group", 3) }}>Disarm Group</button>
		  </li>
          <li className={this.ppkGroupClass(item.groups[4])}>
		    Group 4: {this.ppsGroupState(item.groups[4])}
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_on", "group", 4) }}>Arm Group</button> 
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_off", "group", 4) }}>Disarm Group</button>
		  </li>
		  <li className={this.ppkGroupClass(item.groups[5])}>
		    Group 5: {this.ppsGroupState(item.groups[5])}
		  </li>
		  <li className={this.ppkGroupClass(item.groups[6])}>
		    Group 6: {this.ppsGroupState(item.groups[6])}
		  </li>
		  <li className={this.ppkGroupClass(item.groups[7])}>
		    Group 7: {this.ppsGroupState(item.groups[7])}
		  </li>
		  <li className={this.ppkGroupClass(item.groups[8])}>
		    Group 8: {this.ppsGroupState(item.groups[8])}
		  </li>
		  <li className={this.ppkGroupClass(item.groups[9])}>
		    Group 9: {this.ppsGroupState(item.groups[9])}
		  </li>
		  <li className={this.ppkGroupClass(item.groups[10])}>
		    Group 10: {this.ppsGroupState(item.groups[10])}
		  </li>
		  <li className={this.ppkGroupClass(item.groups[11])}>
		    Group 11: {this.ppsGroupState(item.groups[11])}
		  </li>
		  <li className={this.ppkGroupClass(item.groups[12])}>
		    Group 12: {this.ppsGroupState(item.groups[12])}
		  </li>
		  <li className={this.ppkGroupClass(item.groups[13])}>
		    Group 13: {this.ppsGroupState(item.groups[13])}
		  </li>
		  <li className={this.ppkGroupClass(item.groups[14])}>
		    Group 14: {this.ppsGroupState(item.groups[14])}
		  </li>
		  <li className={this.ppkGroupClass(item.groups[15])}>
		    Group 15: {this.ppsGroupState(item.groups[15])}
		  </li>
		  <li className={this.ppkGroupClass(item.groups[16])}>
		    Group 16: {this.ppsGroupState(item.groups[16])}
		  </li>
          
		  {/*Zones*/}
          <li className={ this.zonesCssClass(item.lines[1]) }>
			Zone 1: { this.zonesCurrentState(item.lines[1]) }
		  </li>
          <li className={ this.zonesCssClass(item.lines[2]) }>
			Zone 2: { this.zonesCurrentState(item.lines[2]) }
		  </li>
          <li className={ this.zonesCssClass(item.lines[3]) }>
			Zone 3: { this.zonesCurrentState(item.lines[3]) }
		  </li>
          <li className={ this.zonesCssClass(item.lines[4]) }>
			Zone 4: { this.zonesCurrentState(item.lines[4]) }
		  </li>
          <li className={ this.zonesCssClass(item.lines[5]) }>
			Zone 5: { this.zonesCurrentState(item.lines[5]) }
		  </li>
          <li className={ this.zonesCssClass(item.lines[6]) }>
			Zone 6: { this.zonesCurrentState(item.lines[6]) }
		  </li>
          <li className={ this.zonesCssClass(item.lines[7]) }>
			Zone 7: { this.zonesCurrentState(item.lines[7]) }
		  </li>
          <li className={ this.zonesCssClass(item.lines[8]) }>
			Zone 8: { this.zonesCurrentState(item.lines[8]) }
		  </li>
          <li className={ this.zonesCssClass(item.lines[9]) }>
			Zone 9: { this.zonesCurrentState(item.lines[9]) }
		  </li>
          <li className={ this.zonesCssClass(item.lines[10]) }>
			Zone 10: { this.zonesCurrentState(item.lines[10]) }
		  </li>
          <li className={ this.zonesCssClass(item.lines[11]) }>
			Zone 11: { this.zonesCurrentState(item.lines[11]) }
		  </li>
          <li className={ this.zonesCssClass(item.lines[12]) }>
			Zone 12: { this.zonesCurrentState(item.lines[12]) }
		  </li>
          <li className={ this.zonesCssClass(item.lines[13]) }>
			Zone 13: { this.zonesCurrentState(item.lines[13]) }
		  </li>
          <li className={ this.zonesCssClass(item.lines[14]) }>
			Zone 14: { this.zonesCurrentState(item.lines[14]) }
		  </li>
          <li className={ this.zonesCssClass(item.lines[15]) }>
			Zone 15: { this.zonesCurrentState(item.lines[15]) }
		  </li>
          <li className={ this.zonesCssClass(item.lines[16]) }>
			Zone 16: { this.zonesCurrentState(item.lines[16]) }
		  </li>

          {/*Adapters*/}

          <li className={item.adapters[1] === undefined ? "hide" : this.baseCssClass(item.adapters[1].conn)}>
		    Adapter 1 Status: {item.adapters[1] === undefined ? "" : this.adapterConnectionStatus(item.adapters[1].conn)}
		  </li>
		  <li className={item.adapters[1] === undefined ? "hide" : this.baseCssClass(item.adapters[1].door)}>
		    Adapter 1 Tamper: {item.adapters[1] === undefined ? "" : this.ppkAdapterTamperState(item.adapters[1].door)}
		  </li>
		  <li className={item.adapters[1] === undefined ? "hide" : this.baseCssClass(item.adapters[1].power)}>
		    Adapter 1 Power: {item.adapters[1] === undefined ? "" : this.adapterPowerState(item.adapters[1].power)}
		  </li>

		  <li className={item.adapters[2] === undefined ? "hide" : this.baseCssClass(item.adapters[2].conn)}>
		    Adapter 2 Status: {item.adapters[2] === undefined ? "" : this.adapterConnectionStatus(item.adapters[2].conn)}
		  </li>
		  <li className={item.adapters[2] === undefined ? "hide" : this.baseCssClass(item.adapters[2].door)}>
		    Adapter 2 Tamper: {item.adapters[2] === undefined ? "" : this.ppkAdapterTamperState(item.adapters[2].door)}
		  </li>
		  <li className={item.adapters[2] === undefined ? "hide" : this.baseCssClass(item.adapters[2].power)}>
		    Adapter 2 Power: {item.adapters[2] === undefined ? "" : this.adapterPowerState(item.adapters[2].power)}
		  </li>

		  <li className={item.adapters[3] === undefined ? "hide" : this.baseCssClass(item.adapters[3].conn)}>
		    Adapter 3 Status: {item.adapters[3] === undefined ? "" : this.adapterConnectionStatus(item.adapters[3].conn)}
		  </li>
		  <li className={item.adapters[3] === undefined ? "hide" : this.baseCssClass(item.adapters[3].door)}>
		    Adapter 3 Tamper: {item.adapters[3] === undefined ? "" : this.ppkAdapterTamperState(item.adapters[3].door)}
		  </li>
		  <li className={item.adapters[3] === undefined ? "hide" : this.baseCssClass(item.adapters[3].power)}>
		    Adapter 3 Power: {item.adapters[3] === undefined ? "" : this.adapterPowerState(item.adapters[3].power)}
		  </li>

		  <li className={item.adapters[4] === undefined ? "hide" : this.baseCssClass(item.adapters[4].conn)}>
		    Adapter 4 Status: {item.adapters[4] === undefined ? "" : this.adapterConnectionStatus(item.adapters[4].conn)}
		  </li>
		  <li className={item.adapters[4] === undefined ? "hide" : this.baseCssClass(item.adapters[4].door)}>
		    Adapter 4 Tamper: {item.adapters[4] === undefined ? "" : this.ppkAdapterTamperState(item.adapters[4].door)}
		  </li>
		  <li className={item.adapters[4] === undefined ? "hide" : this.baseCssClass(item.adapters[4].power)}>
		    Adapter 4 Power: {item.adapters[4] === undefined ? "" : this.adapterPowerState(item.adapters[4].power)}
		  </li>
        
		  
		  {/*Wireless Sensors*/}

		   <li className={item.wsensors[1] === undefined ? "hide" : this.baseCssClass(item.wsensors[1].conn)}>
			Wireless Sensor 1 Status: {item.wsensors[1] === undefined ? "" : this.adapterConnectionStatus(item.wsensors[1].conn)}
		  </li>
		  <li className={item.wsensors[1] === undefined ? "hide" : this.baseCssClass(item.wsensors[1].door)}>
			Wireless Sensor 1 Tamper: {item.wsensors[1] === undefined ? "" : this.ppkAdapterTamperState(item.wsensors[1].door)}
		  </li>
		  <li className={item.wsensors[1] === undefined ? "hide" : this.baseCssClass(item.wsensors[1].power)}>
		    Wireless Sensor 1 Power: {item.wsensors[1] === undefined ? "" : this.adapterPowerState(item.wsensors[1].power)}
		  </li>

		   <li className={item.wsensors[2] === undefined ? "hide" : this.baseCssClass(item.wsensors[2].conn)}>
			Wireless Sensor 2 Status: {item.wsensors[2] === undefined ? "" : this.adapterConnectionStatus(item.wsensors[2].conn)}
		  </li>
		  <li className={item.wsensors[2] === undefined ? "hide" : this.baseCssClass(item.wsensors[2].door)}>
			Wireless Sensor 2 Tamper: {item.wsensors[2] === undefined ? "" : this.ppkAdapterTamperState(item.wsensors[2].door)}
		  </li>
		  <li className={item.wsensors[2] === undefined ? "hide" : this.baseCssClass(item.wsensors[2].power)}>
		    Wireless Sensor 2 Power: {item.wsensors[2] === undefined ? "" : this.adapterPowerState(item.wsensors[2].power)}
		  </li>

		   <li className={item.wsensors[3] === undefined ? "hide" : this.baseCssClass(item.wsensors[3].conn)}>
			Wireless Sensor 3 Status: {item.wsensors[3] === undefined ? "" : this.adapterConnectionStatus(item.wsensors[3].conn)}
		  </li>
		  <li className={item.wsensors[3] === undefined ? "hide" : this.baseCssClass(item.wsensors[3].door)}>
			Wireless Sensor 3 Tamper: {item.wsensors[3] === undefined ? "" : this.ppkAdapterTamperState(item.wsensors[3].door)}
		  </li>
		  <li className={item.wsensors[3] === undefined ? "hide" : this.baseCssClass(item.wsensors[3].power)}>
		    Wireless Sensor 3 Power: {item.wsensors[3] === undefined ? "" : this.adapterPowerState(item.wsensors[3].power)}
		  </li>

		   <li className={item.wsensors[4] === undefined ? "hide" : this.baseCssClass(item.wsensors[4].conn)}>
			Wireless Sensor 4 Status: {item.wsensors[4] === undefined ? "" : this.adapterConnectionStatus(item.wsensors[4].conn)}
		  </li>
		  <li className={item.wsensors[4] === undefined ? "hide" : this.baseCssClass(item.wsensors[4].door)}>
			Wireless Sensor 4 Tamper: {item.wsensors[4] === undefined ? "" : this.ppkAdapterTamperState(item.wsensors[4].door)}
		  </li>
		  <li className={item.wsensors[4] === undefined ? "hide" : this.baseCssClass(item.wsensors[4].power)}>
		    Wireless Sensor 4 Power: {item.wsensors[4] === undefined ? "" : this.adapterPowerState(item.wsensors[4].power)}
		  </li>

		   <li className={item.wsensors[5] === undefined ? "hide" : this.baseCssClass(item.wsensors[5].conn)}>
			Wireless Sensor 5 Status: {item.wsensors[5] === undefined ? "" : this.adapterConnectionStatus(item.wsensors[5].conn)}
		  </li>
		  <li className={item.wsensors[5] === undefined ? "hide" : this.baseCssClass(item.wsensors[5].door)}>
			Wireless Sensor 5 Tamper: {item.wsensors[5] === undefined ? "" : this.ppkAdapterTamperState(item.wsensors[5].door)}
		  </li>
		  <li className={item.wsensors[5] === undefined ? "hide" : this.baseCssClass(item.wsensors[5].power)}>
		    Wireless Sensor 5 Power: {item.wsensors[5] === undefined ? "" : this.adapterPowerState(item.wsensors[5].power)}
		  </li>

		  <li className={item.wsensors[6] === undefined ? "hide" : this.baseCssClass(item.wsensors[6].conn)}>
			Wireless Sensor 6 Status: {item.wsensors[6] === undefined ? "" : this.adapterConnectionStatus(item.wsensors[6].conn)}
		  </li>
		  <li className={item.wsensors[6] === undefined ? "hide" : this.baseCssClass(item.wsensors[6].door)}>
			Wireless Sensor 6 Tamper: {item.wsensors[6] === undefined ? "" : this.ppkAdapterTamperState(item.wsensors[6].door)}
		  </li>
		  <li className={item.wsensors[6] === undefined ? "hide" : this.baseCssClass(item.wsensors[6].power)}>
		    Wireless Sensor 6 Power: {item.wsensors[6] === undefined ? "" : this.adapterPowerState(item.wsensors[6].power)}
		  </li>

		  <li className={item.wsensors[7] === undefined ? "hide" : this.baseCssClass(item.wsensors[7].conn)}>
			Wireless Sensor 7 Status: {item.wsensors[7] === undefined ? "" : this.adapterConnectionStatus(item.wsensors[7].conn)}
		  </li>
		  <li className={item.wsensors[7] === undefined ? "hide" : this.baseCssClass(item.wsensors[7].door)}>
			Wireless Sensor 7 Tamper: {item.wsensors[7] === undefined ? "" : this.ppkAdapterTamperState(item.wsensors[7].door)}
		  </li>
		  <li className={item.wsensors[7] === undefined ? "hide" : this.baseCssClass(item.wsensors[7].power)}>
		    Wireless Sensor 7 Power: {item.wsensors[7] === undefined ? "" : this.adapterPowerState(item.wsensors[7].power)}
		  </li>

		  <li className={item.wsensors[8] === undefined ? "hide" : this.baseCssClass(item.wsensors[8].conn)}>
			Wireless Sensor 8 Status: {item.wsensors[8] === undefined ? "" : this.adapterConnectionStatus(item.wsensors[8].conn)}
		  </li>
		  <li className={item.wsensors[8] === undefined ? "hide" : this.baseCssClass(item.wsensors[8].door)}>
			Wireless Sensor 8 Tamper: {item.wsensors[8] === undefined ? "" : this.ppkAdapterTamperState(item.wsensors[8].door)}
		  </li>
		  <li className={item.wsensors[8] === undefined ? "hide" : this.baseCssClass(item.wsensors[8].power)}>
		    Wireless Sensor 8 Power: {item.wsensors[8] === undefined ? "" : this.adapterPowerState(item.wsensors[8].power)}
		  </li>

		  <li className={item.wsensors[9] === undefined ? "hide" : this.baseCssClass(item.wsensors[9].conn)}>
			Wireless Sensor 9 Status: {item.wsensors[9] === undefined ? "" : this.adapterConnectionStatus(item.wsensors[9].conn)}
		  </li>
		  <li className={item.wsensors[9] === undefined ? "hide" : this.baseCssClass(item.wsensors[9].door)}>
			Wireless Sensor 9 Tamper: {item.wsensors[9] === undefined ? "" : this.ppkAdapterTamperState(item.wsensors[9].door)}
		  </li>
		  <li className={item.wsensors[9] === undefined ? "hide" : this.baseCssClass(item.wsensors[9].power)}>
		    Wireless Sensor 9 Power: {item.wsensors[9] === undefined ? "" : this.adapterPowerState(item.wsensors[9].power)}
		  </li>

		  <li className={item.wsensors[10] === undefined ? "hide" : this.baseCssClass(item.wsensors[10].conn)}>
			Wireless Sensor 10 Status: {item.wsensors[10] === undefined ? "" : this.adapterConnectionStatus(item.wsensors[10].conn)}
		  </li>
		  <li className={item.wsensors[10] === undefined ? "hide" : this.baseCssClass(item.wsensors[10].door)}>
			Wireless Sensor 10 Tamper: {item.wsensors[10] === undefined ? "" : this.ppkAdapterTamperState(item.wsensors[10].door)}
		  </li>
		  <li className={item.wsensors[10] === undefined ? "hide" : this.baseCssClass(item.wsensors[10].power)}>
		    Wireless Sensor 10 Power: {item.wsensors[10] === undefined ? "" : this.adapterPowerState(item.wsensors[10].power)}
		  </li>

		  <li className={item.wsensors[11] === undefined ? "hide" : this.baseCssClass(item.wsensors[11].conn)}>
			Wireless Sensor 11 Status: {item.wsensors[11] === undefined ? "" : this.adapterConnectionStatus(item.wsensors[11].conn)}
		  </li>
		  <li className={item.wsensors[11] === undefined ? "hide" : this.baseCssClass(item.wsensors[11].door)}>
			Wireless Sensor 11 Tamper: {item.wsensors[11] === undefined ? "" : this.ppkAdapterTamperState(item.wsensors[11].door)}
		  </li>
		  <li className={item.wsensors[11] === undefined ? "hide" : this.baseCssClass(item.wsensors[11].power)}>
		    Wireless Sensor 11 Power: {item.wsensors[11] === undefined ? "" : this.adapterPowerState(item.wsensors[11].power)}
		  </li>

		  <li className={item.wsensors[12] === undefined ? "hide" : this.baseCssClass(item.wsensors[12].conn)}>
			Wireless Sensor 12 Status: {item.wsensors[12] === undefined ? "" : this.adapterConnectionStatus(item.wsensors[12].conn)}
		  </li>
		  <li className={item.wsensors[12] === undefined ? "hide" : this.baseCssClass(item.wsensors[12].door)}>
			Wireless Sensor 12 Tamper: {item.wsensors[12] === undefined ? "" : this.ppkAdapterTamperState(item.wsensors[12].door)}
		  </li>
		  <li className={item.wsensors[12] === undefined ? "hide" : this.baseCssClass(item.wsensors[12].power)}>
		    Wireless Sensor 12 Power: {item.wsensors[12] === undefined ? "" : this.adapterPowerState(item.wsensors[12].power)}
		  </li>

		  <li className={item.wsensors[13] === undefined ? "hide" : this.baseCssClass(item.wsensors[13].conn)}>
			Wireless Sensor 13 Status: {item.wsensors[13] === undefined ? "" : this.adapterConnectionStatus(item.wsensors[13].conn)}
		  </li>
		  <li className={item.wsensors[13] === undefined ? "hide" : this.baseCssClass(item.wsensors[13].door)}>
			Wireless Sensor 13 Tamper: {item.wsensors[13] === undefined ? "" : this.ppkAdapterTamperState(item.wsensors[13].door)}
		  </li>
		  <li className={item.wsensors[13] === undefined ? "hide" : this.baseCssClass(item.wsensors[13].power)}>
		    Wireless Sensor 13 Power: {item.wsensors[13] === undefined ? "" : this.adapterPowerState(item.wsensors[13].power)}
		  </li>

		  <li className={item.wsensors[14] === undefined ? "hide" : this.baseCssClass(item.wsensors[14].conn)}>
			Wireless Sensor 14 Status: {item.wsensors[14] === undefined ? "" : this.adapterConnectionStatus(item.wsensors[14].conn)}
		  </li>
		  <li className={item.wsensors[14] === undefined ? "hide" : this.baseCssClass(item.wsensors[14].door)}>
			Wireless Sensor 14 Tamper: {item.wsensors[14] === undefined ? "" : this.ppkAdapterTamperState(item.wsensors[14].door)}
		  </li>
		  <li className={item.wsensors[14] === undefined ? "hide" : this.baseCssClass(item.wsensors[14].power)}>
		    Wireless Sensor 14 Power: {item.wsensors[14] === undefined ? "" : this.adapterPowerState(item.wsensors[14].power)}
		  </li>

		  <li className={item.wsensors[15] === undefined ? "hide" : this.baseCssClass(item.wsensors[15].conn)}>
			Wireless Sensor 15 Status: {item.wsensors[15] === undefined ? "" : this.adapterConnectionStatus(item.wsensors[15].conn)}
		  </li>
		  <li className={item.wsensors[15] === undefined ? "hide" : this.baseCssClass(item.wsensors[15].door)}>
			Wireless Sensor 15 Tamper: {item.wsensors[15] === undefined ? "" : this.ppkAdapterTamperState(item.wsensors[15].door)}
		  </li>
		  <li className={item.wsensors[15] === undefined ? "hide" : this.baseCssClass(item.wsensors[15].power)}>
		    Wireless Sensor 15 Power: {item.wsensors[15] === undefined ? "" : this.adapterPowerState(item.wsensors[15].power)}
		  </li>

		  <li className={item.wsensors[16] === undefined ? "hide" : this.baseCssClass(item.wsensors[16].conn)}>
			Wireless Sensor 16 Status: {item.wsensors[16] === undefined ? "" : this.adapterConnectionStatus(item.wsensors[16].conn)}
		  </li>
		  <li className={item.wsensors[16] === undefined ? "hide" : this.baseCssClass(item.wsensors[16].door)}>
			Wireless Sensor 16 Tamper: {item.wsensors[16] === undefined ? "" : this.ppkAdapterTamperState(item.wsensors[16].door)}
		  </li>
		  <li className={item.wsensors[16] === undefined ? "hide" : this.baseCssClass(item.wsensors[16].power)}>
		    Wireless Sensor 16 Power: {item.wsensors[16] === undefined ? "" : this.adapterPowerState(item.wsensors[16].power)}
		  </li>
		 
		  
		  {/*Outputs and Relay*/} 	
          <li className={ this.outputRelayCssClass(item.c[0]) }>
		    Relay: {this.ppkCurrentState(item.c[0])}
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_on", "relay", 0) }}>Turn Uk2 ON</button> 
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_off", "relay", 0) }}>Turn Uk2 OFF</button>
		  </li>
		  <li className={ this.outputRelayCssClass(item.c[1])}>
		    C1: {this.ppkCurrentState(item.c[1])}
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_on", "c", 1) }}>Turn Uk2 ON</button> 
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_off", "c", 1) }}>Turn Uk2 OFF</button>
		  </li>
		  <li className={ this.outputRelayCssClass(item.c[2]) }>
		    C2: {this.ppkCurrentState(item.c[2])}
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_on", "c", 2) }}>Turn Uk2 ON</button> 
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_off", "c", 2) }}>Turn Uk2 OFF</button>
		  </li>
		  <li className={ this.outputRelayCssClass(item.c[3]) }>
		    C3: {this.ppkCurrentState(item.c[3])}
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_on", "c", 3) }}>Turn Uk2 ON</button> 
		    <button disabled={ this.disabledButtonControl(item.online) } type="button" onClick={() => { this.remotePpkControl(ppk[index], "turn_off", "c", 3) }}>Turn Uk2 OFF</button>
		  </li>	  
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
         <Alert stack={{limit: 3}} beep={{error: './alert-sound/1.mp3'}} />
    </div>
  );
 }
 }
  

export default App;
