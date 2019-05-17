import React from 'react';
import './footer.css';

class Footer extends React.Component {
	render() {
		return(
			<footer className="bg">  
			  <div className="container">    
			    <ul className="list-unstyled list-inline text-center py-2">
			      <li className="list-inline-item">
			        <a 
				        href="http://venbest.ltd/index.php" 
				        target="_blank" 
				        rel="noopener noreferrer">
				        <h6 className="mb-2 text-white">Check official web site</h6>
			        </a>
			      </li>      
			    </ul>	   
			  </div>
			  <div className="footer-copyright text-center py-3 text-white">© 2019 Copyright   
			  </div>
			</footer>
	 )
	}
}

export default Footer;