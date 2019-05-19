import React from 'react';
import axios from "axios";
import logo from './logo.svg';
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
      this.loadPpkInfo();
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
        console.log(Object.values(this.state.ppks));
        let ppkData1 = Object.values(this.state.ppks);
        console.log(ppkData1[0]);
        console.log(ppkData1[1]);
         console.log(ppkData1[0].c);
          console.log(ppkData1[0].radio);
          console.log(ppkData1[0].adapters);
          console.log(ppkData1[0].wsensors);

           
    console.log("wsensor1 connection: " + ppkData1[0].wsensors[11].conn);
    console.log("wsensor1 door: " + ppkData1[0].wsensors[11].door);
     console.log("adapter1 power: " + ppkData1[0].adapters[1].power);

         //console.log(Object.keys(this.state.ppks.wsensors));
     
          
      })
      .catch((err) => {
        console.log(err);        
      }); 
      
  }

 render(){  

    let ppkData = Object.values(this.state.ppks);
    let ppk = Object.keys(this.state.ppks);

   

   

   return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
 <button 
       className="btn btn-primary btn-front" 
       onClick={this.loadPpkInfo}
       type="submit">Show ppk
     </button>

      <ul> My Devises:
      {ppk.map((item, index) => {
        return (
          
          <li key={index}>My devese #{index+1}: {item}</li>    
        
          )
        
      })}
      </ul>

      <ul>Current info:
      {ppkData.map((item, index) => {
        return (
          <div key={index}>
          <li>PPK Model: {item.model}</li>
          <li>Current Online Status: {item.online}</li>
          <li>220V: {item.power}</li>
          <li>AKK: {item.accum}</li>
          <li>Tamper: {item.door}</li>
          
          <li>Group 1: {item.groups[1]}</li>
          <li>Group 2: {item.groups[2]}</li>
          <li>Group 3: {item.groups[3]}</li>
          <li>Group 4: {item.groups[4]}</li>
          
          <li>Zone 1: {item.lines[1]}</li>
          <li>Zone 2: {item.lines[2]}</li>
          <li>Zone 3: {item.lines[3]}</li>
          <li>Zone 4: {item.lines[4]}</li>
          <li>Zone 5: {item.lines[5]}</li>
          <li>Zone 6: {item.lines[6]}</li>
          <li>Zone 7: {item.lines[7]}</li>
          <li>Zone 8: {item.lines[8]}</li>
          <li>Zone 9: {item.lines[9]}</li>
          <li>Zone 10: {item.lines[10]}</li>
          <li>Zone 11: {item.lines[11]}</li>
          <li>Zone 12: {item.lines[12]}</li>
          <li>Zone 13: {item.lines[13]}</li>
          <li>Zone 14: {item.lines[14]}</li>
          <li>Zone 15: {item.lines[15]}</li>
          <li>Zone 16: {item.lines[16]}</li>

          <li>UK2 8l: {item.uk2}</li>
          <li>UK3 8l: {item.uk3}</li>
          <li>Relay 8l: {item.relay2}</li>







          
          </div>
          )
      })}
      </ul>


            

    </div>
  );
}
 }
  

export default App;
