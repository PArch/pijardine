const express = require('express')
const Gpio = require('onoff').Gpio // Gpio class
const app = express()
const temperatureIO = new Gpio(4, 'in')
const relay = new Gpio(26, 'out')
const bodyParser = require('body-parser')
const serveIndex = require('serve-index')
const sensor = require("node-dht-sensor");

var Gun = require('gun');
app.use(Gun.serve);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));

const server = app.listen(3000, function () {

	gun.get('sensorData').on(function(data, key){
	  console.log("update:", data);
	});
})
var gun = Gun({	file: 'data', web: server });


function readSensor() {
sensor.read(22, 4, function(err, temperature, humidity) {
	if (!err) {
		gun.get('sensorData').put({
			temperature: temperature,
			humidity:humidity,
			date: Date.now()
		});
	}
})
}
setInterval(readSensor, 60000)
