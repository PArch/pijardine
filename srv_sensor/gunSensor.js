const sensor = require("node-dht-sensor");
const http = require('http')
const Gun = require('gun');
var gun = Gun({file: 'data', web: http.createServer().listen(8765) });
gun.get('sensorData').on(function(data, key){
	console.log("update:", data);
});



function readSensor() {
	sensor.read(22, 4, function(err, temperature, humidity) {
		if (!err) {
			const date = Date.now()
			gun.get('sensorDataV1').get(date).put({
				temperature: temperature,
				humidity:humidity,
				date:date
			});
		}
	})
}
setInterval(readSensor, 60000)
