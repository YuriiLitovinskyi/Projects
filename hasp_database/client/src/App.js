import React from 'react';
import axios from "axios";
import './App.css';
import { AlertSuc, AlertDelAll, AlertCurAll, AlertCurmodif } from "./alerts/alerts";
import Modal from "./modal/modal";
import Header from "./header/header";
import Footer from "./footer/footer";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { BASE_URL } from './index';

class App extends React.Component {

 constructor(props) {
    super(props);
    
    this.state = {
      hasps: [],
      requiredItem: 0,      
      sucAlert: false,
      delAllAlert: false,
      delCurAlert: false,
      modifCurAlert: false,     
      serial: "",
      soft: "",
      numberOfKeys: "",     
      name: "",
      city: "",
      phone: "",
      serialToModal: "",
      softToModal: "",
      numberOfKeysToModal: "",     
      nameToModal: "",
      cityToModal: "",
      phoneToModal: ""
     
    };

    this.loadHaspInfo = this.loadHaspInfo.bind(this);
    this.addHaspInfo = this.addHaspInfo.bind(this);
    this.deleteAllHaspInfo = this.deleteAllHaspInfo.bind(this);
    this.deleteCurrentHaspInfo = this.deleteCurrentHaspInfo.bind(this);
    this.modifyCurrentHaspInfo = this.modifyCurrentHaspInfo.bind(this);
    this.replaceModalItem = this.replaceModalItem.bind(this);   

  }

  //Event Hendlers
  onChangeSerial = (event) => {
    this.setState({serial: event.target.value});
  }

  onChangeSoft = (event) => {
    this.setState({soft: event.target.value});
  }

  onChangeKeys = (event) => {
    this.setState({numberOfKeys: event.target.value});
  }

  onChangeName = (event) => {
    this.setState({name: event.target.value});
  }

   onChangeCity = (event) => {
    this.setState({city: event.target.value});
  }

  onChangePhone = (event) => {
    this.setState({phone: event.target.value});
  }

  componentDidMount(){
    this.loadHaspInfo();
  }

  loadHaspInfo = (e) => {
    //e.preventDefault();
    axios.get(`${BASE_URL}/hasp`)
      .then((haspData) => {
        //console.log(haspData.data);
        this.setState({
          hasps: haspData.data,
          sucAlert: false,
          delAllAlert: false,
          delCurAlert: false,
          modifCurAlert: false
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Error. No connection to database...");  
        this.setState({
          sucAlert: false,
          delAllAlert: false,
          delCurAlert: false,
          modifCurAlert: false            
        })       
      })
  }

  addHaspInfo = (e) => {  
  e.preventDefault();  
    axios.post(`${BASE_URL}/hasp`, {     
            name: e.target[3].value,
            city: e.target[4].value,
            phone: e.target[5].value  ,          
            numberOfKeys: e.target[2].value,                      
            serial: e.target[0].value,
            soft: e.target[1].value,
      })
      .then((res) => {
        //console.log(res);
        //this.loadHaspInfo();
        this.setState({
          sucAlert: true,
          serial: "", 
          soft: "",
          numberOfKeys: "",
          name: "",
          city: "",
          phone: "",        
          delAllAlert: false,
          delCurAlert: false,
          modifCurAlert: false   
          });
      })
      .catch((err) => {
        console.log(err);
        alert("Error. No connection to database...");   
        this.setState({
            sucAlert: false,
            delAllAlert: false,
            delCurAlert: false,
            modifCurAlert: false            
          }) 
      })                 
  }

 deleteAllHaspInfo = (e) => {     
   if (confirm("Do you really want to clear database?") === true){  //eslint-disable-line
      if (prompt("Enter password:") === "123456") {
        axios.delete(`${BASE_URL}/hasp/deleteAll`, {
          data: {}
         })
         .then((res) => {
          //console.log(res.data);
          this.setState({
            delAllAlert: true
          })
         })
         .catch((err) => {
          console.log(err);
          alert("Error. No connection to database...");
          this.setState({
            sucAlert: false,
            delAllAlert: false,
            delCurAlert: false,
            modifCurAlert: false            
        })    
       })         
       } else {
        alert("Wrong password!");
       }          
 } else {
   //alert("Delete Canceled!");
 }       
 }

  deleteCurrentHaspInfo = (i) => {             
   if (confirm("Do you really want to delete this item from database?") === true){  //eslint-disable-line       
     if (prompt("Enter password:") === "123456") {
       axios.delete(`${BASE_URL}/hasp/delete`, {
        data: {
          _id: this.state.hasps[i]._id
        }
       })
       .then((res) => {
        //console.log(res.data);
        this.setState({
          delCurAlert: true
        })
       })
         .catch((err) => {
          console.log(err);
          alert("Error. No connection to database...");
          this.setState({
            sucAlert: false,
            delAllAlert: false,
            delCurAlert: false,
            modifCurAlert: false            
           })    
          })       
        } else {
        alert("Wrong password!");
       }       
     } else {
     //alert("Delete Canceled!");
    }       
   }

 replaceModalItem(index) {
    this.setState({
      requiredItem: index,
      serialToModal: this.state.hasps[index].serial,
      softToModal: this.state.hasps[index].soft,
      numberOfKeysToModal: this.state.hasps[index].numberOfKeys,           
      nameToModal: this.state.hasps[index].name,
      cityToModal: this.state.hasps[index].city,
      phoneToModal: this.state.hasps[index].phone
    });
    //console.log(index);    
    //const i = this.state.requiredItem;
    //console.log(i);
    //console.log(this.state.hasps[i]);
  }

 modifyCurrentHaspInfo(item) {
    const requiredItem = this.state.requiredItem;   
    //console.log(requiredItem);
    axios.put(`${BASE_URL}/hasp/change`, 
        {
          _id:  this.state.hasps[requiredItem]._id,
          serial: item.serial,  
          soft: item.soft ,      
          numberOfKeys: item.numberOfKeys,
          name: item.name,
          city: item.city,
          phone: item.phone
        }            
     )
    .then((res) => {
      //console.log(res.status);   
      this.setState({
        modifCurAlert: true
      })   
    })
    .catch((err) => {
      console.log(err);
      alert("Error. No connection to database...");  
      this.setState({
        sucAlert: false,
        delAllAlert: false,
        delCurAlert: false,
        modifCurAlert: false            
      }) 
    })  
  }
 
 render(){  

  return (
    <div className="App">
        <Header />
       <div className="container-fluid App-main">
        <form id="formId" className="form-group" onSubmit={this.addHaspInfo}>
            <div className="form-group row">
                 <label className="col-sm-2 col-form-label"><b>Serial:</b></label>
                 <div className="col-sm-10">
                   <input 
                     onChange={this.onChangeSerial.bind(this)} 
                     type="text" 
                     className="form-control" 
                     value={this.state.serial} 
                     placeholder="00000-00000" 
                     required 
                     maxLength="11" /><br />
                 </div>
            </div>
            <div className="form-group row">
                 <label className="col-sm-2 col-form-label"><b>Soft:</b></label>
                 <div className="col-sm-10">
                   <input 
                     onChange={this.onChangeSoft.bind(this)} 
                     type="text" 
                     className="form-control" 
                     value={this.state.soft} 
                     placeholder="XXI or PRO" 
                     required 
                     maxLength="3" /><br />
                 </div>
            </div>
            <div className="form-group row">
                  <label className="col-sm-2 col-form-label"><b># of keys:</b></label>
                 <div className="col-sm-10">
                   <input 
                     onChange={this.onChangeKeys.bind(this)} 
                     type="number" 
                     className="form-control" 
                     value={this.state.numberOfKeys} 
                     placeholder="Enter number of keys" 
                     required error={this.state.numberOfKeys > 12 ? 'Enter a number less than 12' : ''}
                     max={12} /><br />
                 </div>
            </div> 
            <div className="form-group row">
                 <label className="col-sm-2 col-form-label"><b>Company:</b></label>
                 <div className="col-sm-10">
                   <input 
                     onChange={this.onChangeName.bind(this)} 
                     type="text" 
                     className="form-control" 
                     value={this.state.name} 
                     placeholder="Enter company name" 
                     required 
                     maxLength="15" /><br />
                 </div>
            </div>
            <div className="form-group row">
                 <label className="col-sm-2 col-form-label"><b>City:</b></label>
                 <div className="col-sm-10">
                   <input 
                     onChange={this.onChangeCity.bind(this)} 
                     type="text" 
                     className="form-control" 
                     value={this.state.city} 
                     placeholder="Enter city name" 
                     required 
                     maxLength="12" /><br />
                 </div>
            </div>
            <div className="form-group row">
                 <label className="col-sm-2 col-form-label"><b>Phone:</b></label>
                 <div className="col-sm-10">
                   <input 
                     onChange={this.onChangePhone.bind(this)} 
                     type="text" 
                     className="form-control" 
                     value={this.state.phone} 
                     placeholder="Enter contact number" 
                     required 
                     maxLength="13" /><br />
                 </div>
            </div>
            <div className="form-group row">
                 <label className="col-sm-2 col-form-label"></label>
                 <div className="col-sm-10">
                   <button 
                     className="btn btn-primary btn-front" 
                     type="submit">Add new hasp info
                   </button> 
                 </div>
            </div>                     
        </form>
         { this.state.sucAlert && <AlertSuc /> } 
         { this.state.delAllAlert && <AlertDelAll /> }
         { this.state.delCurAlert && <AlertCurAll /> }
         { this.state.modifCurAlert && <AlertCurmodif /> }
        <button 
          className="btn btn-success" 
          onClick={this.loadHaspInfo}>
          Show hasp keys stored in database
        </button> 
        <button
          className="btn btn-danger" 
          onClick={this.deleteAllHaspInfo}>
          Delete all hasp info from database
        </button> 
         
         <Modal    
            serial={this.state.serialToModal} 
            soft={this.state.softToModal} 
            numberOfKeys={this.state.numberOfKeysToModal}           
            name={this.state.nameToModal} 
            city={this.state.cityToModal}
            phone={this.state.phoneToModal} 
            modifyCurrentHaspInfo={this.modifyCurrentHaspInfo}          
         /> 
     </div>  
       
       <div className="container">
        <table className="table table-striped" id="haspTable">
        <thead className="thead-dark tableHead">
          <tr>
            <th scope="col">#</th>            
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
         <tbody className="haspContent">
            {this.state.hasps.map((item, index) => {
              return (   
                <tr key={ item._id}>
                   <td className="indexNum">{ index + 1 }</td>
                   <td>{ item.serial }</td>
                   <td>{ item.soft }</td>
                   <td>{ item.numberOfKeys }</td>
                   <td>{ item.name }</td>
                   <td>{ item.city }</td>
                   <td>{ item.phone }</td>
                   <td>{ item.dateCreated }</td>
                   <td><i onClick={() => this.replaceModalItem(index)} 
                          className="far fa-edit btnEdit" 
                          data-toggle="modal" 
                          data-target="#exampleModal">
                   </i></td>
                   <td><i  onClick={() => this.deleteCurrentHaspInfo(index)} 
                           className="far fa-trash-alt btnDelete">
                   </i></td>
                </tr>
                )
            })}
          </tbody>
         </table>
         <ReactHTMLTableToExcel 
           table="haspTable"
           filename="haspDataTable"
           sheet="haspDataTable"
           buttonText="Download Excel"
           className="btn btn-dark"
         />
       </div>
     <Footer />
   </div>
  );
}
}


export default App;


 