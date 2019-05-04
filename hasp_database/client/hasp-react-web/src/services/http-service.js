import "whatwg-fetch";
//import axios from "axios"

class HttpService {
	getHasps = () => {
		let promise = new Promise((resolve, reject) => {
			fetch("http://localhost:3004/hasp")
		    .then(res => {
			  //console.log(res.json());
			  resolve(res.json());

		  });
		});
		return promise;		
	}
}

export default HttpService;