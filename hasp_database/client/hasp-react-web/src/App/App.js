import React from 'react';
import logo from './logo.svg';
import './App.css';
import Hasp from "../hasp/hasp";
import HttpService from "../services/http-service";

const http = new HttpService();

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {hasps: []};


    this.loadData = this.loadData.bind(this);
    this.haspList = this.haspList.bind(this);

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
      <div className="col-sm-4" key={hasp._id}>
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
      <div className="App-main">
          {this.haspList()}
          {/*<Hasp serial="40150-16487" soft="PRO" />*/}
      </div>
    </div>
  );
}
}


export default App;
