const sensor = require("node-dht-sensor");
const rpio = require('rpio');
const http = require('http')
const Gun = require('gun');
const CronJob = require('cron').CronJob;
const mcpadc = require("mcp-spi-adc");
var gun = Gun({file: 'data', web: http.createServer().listen(8765) });

function readSensorDHC22() {
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
function readSensorLM393() {
	rpio.open(11, rpio.INPUT);
	console.log('Pin 11 is currently ' + (rpio.read(11) ? 'high' : 'low'));
	console.log(rpio.read(11));
	// var soilSensor = mcpadc.open(0,{speedHz:20000},function(err){
	// 	if (err) throw err;
	// 	soilSensor.read(function(err, reading){
	// 		if (err) throw err;
	//
	// 		//reading.value returns a number between 0 and 1.
	// 		//if totally dry conditions, returns 1.  Sensor submerged in water returns ~0.5
	// 		function map(x, in_min, in_max, out_min, out_max){
	// 			return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	// 		}
	// 		var curValue = map(reading.value, 0, 1, 100, 0).toFixed(1);
	// 		console.log("soil persen : " + curValue + "%");
	// 		console.log("soil moisture reading : " + (1023 - ((reading.value * 3.3 - 0.5) * 100).toFixed(2)) );
	// 		app.currentSoil = curValue;
	// 		resolve();
	// 	});
	// });

}

const job = new CronJob('0 */1 * * * *', function() {
	readSensorDHC22()
	readSensorLM393()
});
job.start();
