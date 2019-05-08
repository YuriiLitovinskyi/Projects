import React from 'react';
import logo from './logo.svg';
import axios from "axios";
import './App.css';
import Hasp from "../hasp/hasp";
import HttpService from "../services/http-service";

const http = new HttpService();


let newId=0;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasps: []
    };


    this.loadData = this.loadData.bind(this);
    this.haspList = this.haspList.bind(this);
    this.addHaspInfo = this.addHaspInfo.bind(this);

    this.loadData();
    
   }

   loadData = () => {
    let self = this;
     http.getHasps().then(data => {
       self.setState({hasps: data})
       console.log(data);
     }, err => {

      });
   }

   haspList = () => {
    const list = this.state.hasps.map((hasp) => 
      <div className="row" key={hasp._id}>
        <Hasp 
        serial={hasp.serial} 
        soft={hasp.soft} 
        numberOfKeys={hasp.numberOfKeys}
        dateCreated={hasp.dateCreated}  
        name={hasp.company.name} 
        city={hasp.company.city} 
        phone={hasp.company.phone}
        />
      </div>
    );
    return (list);
   }

 

   addHaspInfo = (e) => {
    e.preventDefault();
      axios.post("/hasp", {
        company: {
            name: e.target[3].value,
            city: e.target[4].value,
            phone: e.target[5].value
            },
            numberOfKeys: e.target[2].value,
            _id: newId++,            
            serial: e.target[0].value,
            soft: e.target[1].value,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      



   /* this.setState({
        
        hasps: [...this.state.hasps, 
          {
            company: {
            name: e.target[3].value,
            city: e.target[4].value,
            phone: e.target[5].value
            },
            numberOfKeys: e.target[2].value,
            _id: newId++,
            dateCreated: "2019-06-03T16:01:58.700Z",
            serial: e.target[0].value,
            soft: e.target[1].value,
            __v: 0
          }
        ]     
      });   */    
   }

render(){
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
      <form className="haspAddForm" onSubmit={this.addHaspInfo}>
          <label>Serial:</label>
          <input type="text"  value={this.state.serial} placeholder="00000-00000" required /><br />
          <label>Soft:</label>
          <input type="text"  value={this.state.soft} placeholder="XXI or PRO" required /><br />
           <label>Number of keys:</label>
          <input type="number"  value={this.state.numberOfKeys} placeholder="Enter number" required /><br />
           <label>Company name:</label>
          <input type="text" value={this.state.name} placeholder="Enter name" required /><br />
           <label>City:</label>
          <input type="text" value={this.state.city} placeholder="Enter city name" required /><br />
           <label>Phone:</label>
          <input type="text" value={this.state.phone} placeholder="Enter contact number" /><br />       
          <button className="btn btn-primary" type="submit" >Add new hasp info</button>   
      </form>

      <div className="container-fluid App-main">
          {this.haspList()}
          {/*<Hasp serial="40150-16487" soft="PRO" />*/}
      </div>
    </div>
  );
}
}


export default App;
