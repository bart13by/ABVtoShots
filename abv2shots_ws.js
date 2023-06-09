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
	console.log(JSON.stringify(req.body));
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
	if (!['ml','oz'].includes(inUnits)){
		const error = new Error(`strVolUnits must be ml or oz, not ${inUnits}`);
		error.status = 400;
		return next(error);		
	}
	const abv = data.pctABV / 100;
	const ozToMl = 29.57;
	const mlShotVolume = 20;
	const ozShotVolume = .6;
	const mlVolume = inUnits === "ml" ? inVolume : inVolume * ozToMl;
	const ozVolume = inUnits === "oz" ? inVolume : inVolume / ozToMl;
	const mlAlcohol = abv * mlVolume;
    const ozAlcohol = abv * ozVolume;
    const ozShots = ozAlcohol / ozShotVolume;
    const mlShots = mlAlcohol / mlShotVolume;
	const ret_data = {
		'mlVolume' : mlVolume.toLocaleString('en-US', {maximumFractionDigits: 2 }),
		'ozVolume' : ozVolume.toLocaleString('en-US', {maximumFractionDigits: 2 }),
		'mlAlcohol': mlAlcohol.toLocaleString('en-US', {maximumFractionDigits: 2 }),
	    'ozAlcohol': ozAlcohol.toLocaleString('en-US', {maximumFractionDigits: 2 }),
	    'numOzShots'  : ozShots.toLocaleString('en-US', {maximumFractionDigits: 2 }),
	    'numMlShots'  : mlShots.toLocaleString('en-US', {maximumFractionDigits: 2 })
	}
    console.log(JSON.stringify(ret_data));	 
	 

  console.log("Received a new request containing:")
  console.log(JSON.stringify(req.body))
  // return a status and echo back the req.body
  res.setHeader('Content-Type', 'application/json')
  res.send({status: 'success', data: ret_data})
  
});


// start the server
app.listen(3000, function() {
  console.log('Server started on port 3000');
});
