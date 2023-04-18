// abv2shots_ws.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require(`path`);


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// error handling middleware function

app.use(function(err, req, res, next) {
  console.error(err.stack); // log the error to the console
  res.status(400).send('Improper payload'); // send an error response to the client
});

app.get('/', (req, res) => {
  console.log("Received a new GET request containing:")
  console.log(JSON.stringify(req.body))
  res.setHeader('Content-Type', 'application/json')
  res.send({status: 'success',received: req.body})
});

app.post('/getshots', (req, res, next) => {
	console.log(JSON.stringify(req.body);
	if (!req.body.data) {
	    // if the request doesn't contain the required data, throw an error
	    const error = new Error('Data is missing from the request');
	    error.status = 400;
	    return next(error);
	}  
	const data = req.body.data;
	const inVolume = data.decVolume;
	const inUnits = data.strVolUnits; // oz or ml
	if (inUnits === undefined || inVolume === undefined){
		const error = new Error('decVolume and strVolUnits are required');
		error.status = 400;
		return next(error);	
	}
	if (inUnits != 'ml' || inUnits != 'oz'){
	const error = new Error('strVolUnits must be ml or oz');
		error.status = 400;
		return next(error);		
	}
	const abv = data.pctABV / 100;
	const ozToMl = 29.57;
	const mlShot = 20;
	const ozShot = .6;
	const ret_data = {
		'mlVolume' : inUnits === "ml" ? inVolume : inVolume * ozToMl,
		'ozVolume' : inUnits === "oz" ? inVolume : inVolume / ozToMl,
		'mlAlcohol' : abv * mlVolume,
	    'ozAlcohol' : abv * ozVolume,
	    'ozShots' : ozAlcohol / ozShot,
	    'mlShots' : mlAlcohol / mlShot,
	}
    console.log(JSON.stringify(ret_data));	 
	 

  console.log("Received a new request containing:")
  console.log(JSON.stringify(req.body))
  // return a status and echo back the req.body
  res.setHeader('Content-Type', 'application/json')
  res.send({status: 'success',received: req.body})
  
});


// start the server
app.listen(3000, function() {
  console.log('Server started on port 3000');
});
