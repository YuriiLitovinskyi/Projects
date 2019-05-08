import "whatwg-fetch";
//import axios from "axios";

class HttpService {
	getHasps = () => {
		let promise = new Promise((resolve, reject) => {
			fetch("/hasp")    //proxy in package.json
		    .then(res => {
			  //console.log(res.json());
			  resolve(res.json());

		  });
		});
		return promise;		
	}
}

export default HttpService;