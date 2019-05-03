const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://localhost/haspDB", {useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

let HaspInfo = require("./model/hasp");



//POST request
app.post("/hasp", function(req, res) {
	let hasp = new HaspInfo();
	//hasp.dateCreated = Date.now;
	hasp.company.name = req.body.company.name;
	hasp.company.city = req.body.company.city;
	hasp.company.phone = req.body.company.phone;
	hasp.serial = req.body.serial;
	hasp.soft = req.body.soft;
	hasp.numberOfKeys = req.body.numberOfKeys;
    
    hasp.save(function(err, savedHasp) {
    	if (err) {
		res.status(500).send({error: "Could not save hasp info..."});
	} else {
		res.status(200).send(savedHasp);
	}	
    });	
});


//GET request
app.get("/hasp", function(req, res) {	
	HaspInfo.find({}, function(err, hasps) {
		if (err) {
			res.status(500).send({error: "Could not fetch hasps..."});
		} else {
			res.status(200).send(hasps);
		}
	});
});


//PUT request
app.put("/hasp/change", function(req, res) {
	//console.log(req.body);
    HaspInfo.findOneAndUpdate({_id: req.body._id}, {$set:req.body}, {new: true}, function(err, hasps) {
		if (err) {
			res.status(500).send({error: "Could not modified hasp info..."});
		} else {           
           //console.log(hasps);
           res.status(200).send(hasps);
		}
	});	
	});


//DELETE request
app.delete("/hasp/delete", function(req, res) {
	HaspInfo.findOneAndDelete({_id: req.body._id}, function(err) {
		if (err) {
			res.status(500).send({error: "No such hasp id in database..."});			
		} else {
			res.status(200).send({message: "Hasp deleted succesfully..."});
		}
	});
});





	//HaspInfo.findById({_id: req.params.id}, function(err, newHasp) {
		


		//if (err) {
		//	res.status(500).send({error: "No such hasp id in database..."});
		//} else {
			//let newHasp = new HaspInfo();
		/*	newHasp.company.name = req.body.company.name;
			newHasp.company.city = req.body.company.city;
			newHasp.company.phone = req.body.company.phone;
			newHasp.serial = req.body.serial;
			newHasp.soft = req.body.soft;
			newHasp.numberOfKeys = req.body.numberOfKeys;
			newHasp.save();
			res.status(200).send(newHasp);

		//}
		
	});
  
*/





//	});
	/*
	*/

/*
	HaspInfo.findOne({_id: req.body.id}, function(err, hasp) {
		if (err) {
			res.status(500).send({error: "Could not modified hasp info..."});
		} else {
           res.status(200).send(hasp);
		}
	});
*/
	//let haspNewInfo = req.body;

//});
	
/*
	let newText = req.body;

	
	for (let i=0; i<HaspInfo.length; i++) {
		let hasp = HaspInfo[i];

		if (HaspInfo.findOne({_id: req.body._id}) === true) {
			HaspInfo[i] = newText;			
		} 
	}
			res.send(HaspInfo);
	  

});
*/

/*
//GET request
app.get("/hasp", function(req, res) {	
	res.send(haspInfo);
});



//PUT request
app.put("/hasp/:haspId", function(req, res) {
	
	let newText = req.body;

	if (!newText || newText === "") {
		res.status(500).send({error:"You must add hasp info!"});
	} else {
		let objectFound = false;
	for (let i=0; i<haspInfo.length; i++) {
		let hasp = haspInfo[i];

		if (hasp.id === req.params.haspId) {
			haspInfo[i] = newText;
			objectFound = true;
			break;
		} 
	}
	if (!objectFound) {
		res.status(500).send({error:"Hasp id not found!"});
	} else {
		res.send(haspInfo);
	}	
  }
});

//delete - not working
app.delete("hasp/:haspId", function(req, res) {

	let objToDeleteFound = false;
	for (let i=0; i<haspInfo.length; i++) {
		let haspToDelete = haspInfo[i];

		if (haspToDelete.id === req.params.haspId) {
			haspInfo.splice(i, 1);
			objToDeleteFound = true;
			break;
		}
	}
	if (!objToDeleteFound) {
		res.status(500).send({error:"Such hasp ID not found"});
	} else  {
		res.send(haspInfo);
	}
});

*/
const port = 3004;
app.listen(port, function(){
	console.log("Server started on port "+ port +"...");
});