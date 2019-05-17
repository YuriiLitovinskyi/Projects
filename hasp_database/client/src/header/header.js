import React from 'react';
import './header.css';

class Header extends React.Component {
	render() {
		return(
			<header className="App-header">                
		        <h1 className="App-link"><i className="fab fa-usb"></i> Hasp Keys Database</h1>
		        <h4>Designed for "NVF Venbest-ltd"</h4>
		    </header>
					
	 )
	}
}

export default Header;