import React from 'react';
import logo from './logo.svg';
import axios from "axios";
import './App.css';
import TableHasp from "./tableHasp/tableHasp";

class App extends React.Component {

 constructor(props) {
    super(props);
    this.state = {
      hasps: []
    };

    this.loadHaspInfo = this.loadHaspInfo.bind(this);
    this.addHaspInfo = this.addHaspInfo.bind(this);
    this.deleteAllHaspInfo = this.deleteAllHaspInfo.bind(this);
    this.deleteCurrentHaspInfo = this.deleteCurrentHaspInfo.bind(this);
    this.modifyCurrentHaspInfo = this.modifyCurrentHaspInfo.bind(this);
  }

  loadHaspInfo = (e) => {
    e.preventDefault();
    axios.get("/hasp")
      .then((haspData) => {
        console.log(haspData.data);
        this.setState({
          hasps: haspData.data
        });
      });
  }

  addHaspInfo = (e) => {    
    axios.post("/hasp", {
      company: {
            name: e.target[3].value,
            city: e.target[4].value,
            phone: e.target[5].value
            },
            numberOfKeys: e.target[2].value,                      
            serial: e.target[0].value,
            soft: e.target[1].value,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      }) 
  }

   deleteAllHaspInfo = (e) => {     
     if (confirm("Do you really want to clear database?") === true){  //eslint-disable-line
        if (prompt("Enter password:") === "123456") {
          axios.delete("/hasp/deleteAll", {
            data: {}
           })
           .then((res) => {
            console.log(res.data);
           })
           .catch((err) => {
            console.log(err);
         })
         } else {
          alert("Wrong password!");
         }          
   } else {
     //alert("Delete Canceled!");
   }       
   }

   deleteCurrentHaspInfo = (e) => {  
   console.log(this.state.hasps[6]._id);      
     if (confirm("Do you really want to delete this item from database?") === true){  //eslint-disable-line       
         if (prompt("Enter password:") === "123456") {
           axios.delete("/hasp/delete", {
            data: {
              _id: this.state.crr
            }
           })
           .then((res) => {
            console.log(res.data);
           })
           .catch((err) => {
            console.log(err);
         })
         } else {
          alert("Wrong password!");
         }       
   } else {
     //alert("Delete Canceled!");
   }       
   }

   modifyCurrentHaspInfo = (e) => { 
      if (prompt("Enter password:") === "123456") {
        axios.put("/hasp/change", 
            {
              _id: "5cd402760cca9313d039e538",
              serial: "xxxxx-99000",
              soft: "test-put2"
            }            
         )
        .then((res) => {
          console.log(res.data);      
        })
        .catch((err) => {
          console.log(err);
        })
      } else {
        alert("Wrong password!");
      }         
   }




 render(){  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />        
        <h1 className="App-link"><i className="fab fa-usb"></i> Hasp Database</h1>
        <h4>NVF Venbest-ltd</h4>
      </header>
       <div className="container-fluid App-main">
        <form id="formId" className="form-group haspAddForm" onSubmit={this.addHaspInfo}>
            <div className="form-group row">
                 <label className="col-sm-2 col-form-label"><b>Serial:</b></label>
                 <div className="col-sm-10">
                   <input type="text" className="form-control" value={this.state.serial} placeholder="00000-00000" required /><br />
                 </div>
            </div>
            <div className="form-group row">
                 <label className="col-sm-2 col-form-label"><b>Soft:</b></label>
                 <div className="col-sm-10">
                   <input type="text" className="form-control" value={this.state.soft} placeholder="XXI or PRO" required /><br />
                 </div>
            </div>
            <div className="form-group row">
                  <label className="col-sm-2 col-form-label"><b># of keys:</b></label>
                 <div className="col-sm-10">
                   <input type="number" className="form-control" value={this.state.numberOfKeys} placeholder="Enter number of keys" required /><br />
                 </div>
            </div> 
            <div className="form-group row">
                 <label className="col-sm-2 col-form-label"><b>Company:</b></label>
                 <div className="col-sm-10">
                   <input type="text" className="form-control" value={this.state.name} placeholder="Enter company name" required /><br />
                 </div>
            </div>
            <div className="form-group row">
                 <label className="col-sm-2 col-form-label"><b>City:</b></label>
                 <div className="col-sm-10">
                   <input type="text" className="form-control" value={this.state.city} placeholder="Enter city name" required /><br />
                 </div>
            </div>
            <div className="form-group row">
                 <label className="col-sm-2 col-form-label"><b>Phone:</b></label>
                 <div className="col-sm-10">
                   <input type="text" className="form-control" value={this.state.phone} placeholder="Enter contact number" /><br />
                 </div>
            </div>
            <div className="form-group row">
                 <label className="col-sm-2 col-form-label"></label>
                 <div className="col-sm-10">
                   <button className="btn btn-primary" type="submit"  style={{marginBottom:'40px'}}>Add new hasp info</button> 
                 </div>
            </div>                     
        </form>
        <button className="btn btn-success" style={{margin:'10px'}}
          onClick={this.loadHaspInfo}>Show hasp keys stored in database</button> 
        <button className="btn btn-danger" 
          onClick={this.deleteAllHaspInfo}>Delete all hasp info from database</button> 
        <button className="btn btn-warning" style={{marginLeft:'10px'}} onClick={this.modifyCurrentHaspInfo}>Modify hasp info</button>
        
                
      </div>  
       
       <div className="container">
        <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">id</th>
            <th scope="col">Serial Number</th>
            <th scope="col">Soft</th>
            <th scope="col">Number of Keys</th>
            <th scope="col">Company</th>
            <th scope="col">City</th>
            <th scope="col">Contacts</th>
            <th scope="col">Date Created</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
         <tbody>
            {this.state.hasps.map((hasp, i) => 
            <TableHasp 
                 delEvent={this.deleteCurrentHaspInfo} 
                 modifyEvent={this.modifyCurrentHaspInfo}  
                 key={i} 
                 hasps={hasp} 
                 />)}
          </tbody>
         </table>
       </div>
    </div>
  );
}
}


export default App;
