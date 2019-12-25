const express = require("express");
const cors = require("cors");
const app = express();

//app.use(cors());   //no cors rules
//const corsOptions = require("./cors-rules/cors-rules");  //apply cors rules. header is needed in requests
//app.use(cors(corsOptions));

//Production
const origin = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://hasp-database-react-client.netlify.com';
app.use(cors({ origin }));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const mongoose = require("mongoose");
const db = mongoose.connect("mongodb+srv://Yurii:0x55@cluster0-as40t.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true }); //local: "mongodb://localhost/haspDB" 
//mongo atlas: mongodb+srv://Yurii:<password>@cluster0-as40t.mongodb.net/test?retryWrites=true&w=majority
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

let HaspInfo = require("./model/hasp");


//POST request
app.post("/hasp", function(req, res) {
	let hasp = new HaspInfo();
	//hasp.dateCreated = Date.now;
	hasp.name = req.body.name;
	hasp.city = req.body.city;
	hasp.phone = req.body.phone;
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


//DELETE ALL FROM DB request
app.delete("/hasp/deleteAll", function(req, res) {
	HaspInfo.deleteMany({}, function(err) {
		if (err) {
			res.status(500).send({error: "Could not clean database..."});			
		} else {
			res.status(200).send({message: "All hasp info deleted from database succesfully..."});
		}
	});
});


const port = process.env.PORT || 3004;
app.listen(port, function(){
	console.log("Server started on port "+ port +"...");
});
