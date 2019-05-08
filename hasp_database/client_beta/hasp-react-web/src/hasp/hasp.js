import React from "react";
import "./hasp.css";

class Hasp extends React.Component {

    //constructor(props) {
    //	super(props);
  //  }

	render(){
		return(
			<div className="card hasp">
			<div className="card-block">
			   <h4 className="card-title">Hasp</h4>
			   <p >Serial: {this.props.serial}</p>
			   <p >Soft: {this.props.soft}</p>
			   <p >Number Of Keys: {this.props.numberOfKeys}</p>
			   <p >Date created: {this.props.dateCreated}</p>
			   <p >Company info: </p>
			   <p >Name: {this.props.name}</p>
			   <p >City: {this.props.city}</p>
			   <p >Phone number: {this.props.phone}</p>
			   <button className="btn btn-primary">Modify</button>
			   <button className="btn btn-danger">Delete</button>
			</div>
			</div>
		);
	}
}

export default Hasp;