const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());   //no cors rules
//const corsOptions = require("./cors-rules/cors-rules");  //apply cors rules. header is needed in requests
//app.use(cors(corsOptions));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://localhost/haspDB", {useNewUrlParser: true });
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
			res.status(500).send({error: "Could not modify hasp info..."});
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


const port = 3004;
app.listen(port, function(){
	console.log("Server started on port "+ port +"...");
});