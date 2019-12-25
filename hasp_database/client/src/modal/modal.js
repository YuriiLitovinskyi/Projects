import React from 'react';
import './modal.css';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            serial: "",
            soft: "",
            numberOfKeys: "",           
            name: "",
            city: "",
            phone: ""            
        }

        this.handleSave = this.handleSave.bind(this);
        this.serialHandler = this.serialHandler.bind(this);
        this.softHandler = this.softHandler.bind(this);
        this.numberOfKeysHandler = this.numberOfKeysHandler.bind(this);
        this.nameHandler = this.nameHandler.bind(this);
        this.cityHandler = this.cityHandler.bind(this);
        this.phoneHandler = this.phoneHandler.bind(this);    
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            
            serial: nextProps.serial,
            soft: nextProps.soft,
            numberOfKeys: nextProps.numberOfKeys,           
            name: nextProps.name,
            city: nextProps.city,
            phone: nextProps.phone
        });
    }
  

    serialHandler(e) {
        this.setState({ serial: e.target.value });
    }

    softHandler(e) {
        this.setState({ soft: e.target.value });
    }

    numberOfKeysHandler(e) {
        this.setState({ numberOfKeys: e.target.value });
    }

    nameHandler(e) {
        this.setState({name: e.target.value});
    }

    cityHandler(e) {
        this.setState({city: e.target.value});
    }

    phoneHandler(e) {
        this.setState({phone: e.target.value});
    }

    handleSave() {
        const item = this.state;
        //console.log(item);
        this.props.modifyCurrentHaspInfo(item)
    }

    render() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Hasp info</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>                     
                        <div className="modal-body">
                            <p>
                                <span className="modal-lable">Serial: </span>
                                <input type="text" 
                                    placeholder="00000-00000" 
                                    maxLength="11" value={this.state.serial} 
                                    onChange={(e) => this.serialHandler(e)} />
                            </p>
                            <p>
                                <span className="modal-lable">Soft: </span>
                                <input type="text" 
                                    placeholder="XXI or PRO" 
                                    maxLength="3" 
                                    value={this.state.soft} 
                                    onChange={(e) => this.softHandler(e)}  />
                            </p>
                            <p>
                                <span className="modal-lable">Number of keys: </span>
                                <input type="number" 
                                    min="1" 
                                    placeholder="Enter number of keys"  
                                    value={this.state.numberOfKeys || ""} 
                                    onChange={(e) => this.numberOfKeysHandler(e)} />
                            </p>
                            <p>
                                <span className="modal-lable">Company: </span>
                                <input type="text" 
                                    placeholder="Enter company name" 
                                    maxLength="15" 
                                    value={this.state.name} 
                                    onChange={(e) => this.nameHandler(e)} />
                            </p>
                            <p>
                                <span className="modal-lable">City: </span>
                                <input type="text" 
                                    placeholder="Enter city name" 
                                    maxLength="12" 
                                    value={this.state.city} 
                                    onChange={(e) => this.cityHandler(e)} />
                            </p>
                            <p>
                                <span className="modal-lable">Contacts: </span>
                                <input type="text"
                                    placeholder="Enter contact number" 
                                    maxLength="13" 
                                    value={this.state.phone} 
                                    onChange={(e) => this.phoneHandler(e)} />
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                data-dismiss="modal">Close
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                data-dismiss="modal" 
                                onClick={() => { this.handleSave() }}>Save changes
                            </button>
                        </div>                    
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;