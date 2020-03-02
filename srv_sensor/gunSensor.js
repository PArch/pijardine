const express = require('express')
const app = express()
const sensor = require("node-dht-sensor");

var Gun = require('gun');
app.use(Gun.serve);
var gun = Gun({	file: 'data', web: server });

const server = app.listen(3000, function () {
	gun.get('sensorData').on(function(data, key){
		console.log("update:", data);
	});
})


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
