import React from 'react';
import './tableHasp.css';


class TableHasp extends React.Component {
  render(){
    return(
      <tr>
         <td>{ this.props.hasps._id}</td>
         <td>{ this.props.hasps.serial }</td>
         <td>{ this.props.hasps.soft }</td>
         <td>{ this.props.hasps.numberOfKeys }</td>
         <td>{ this.props.hasps.company.name }</td>
         <td>{ this.props.hasps.company.city }</td>
         <td>{ this.props.hasps.company.phone }</td>
         <td>{ this.props.hasps.dateCreated }</td>
         <td><a href="#formId"><i onClick={this.props.modifyEvent} className="far fa-edit btnEdit"></i></a></td>
         <td><i  onClick={this.props.delEvent} crr={this.props.hasps._id} dd={this.key} className="far fa-trash-alt btnDelete" ></i></td>
      </tr>
      );
  }
}

export default TableHasp;