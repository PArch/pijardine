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
	var soilSensor = mcpadc.open(5,{speedHz:20000},function(err){
console.log(err);
		if (err) throw err;
		soilSensor.read(function(err, reading){
			if (err) throw err;
			function map(x, in_min, in_max, out_min, out_max){
				return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
			}
			var curValue = map(reading.value, 0, 1, 100, 0).toFixed(1);
			console.log("soil persen : " + curValue + "%");
			console.log("soil moisture reading : " + (1023 - ((reading.value * 5 - 0.5) * 100).toFixed(2)) );
			app.currentSoil = curValue;
			resolve();
		});
	});

}

const job = new CronJob('0 */1 * * * *', function() {
	readSensorDHC22()
	readSensorLM393()
});
	readSensorLM393()
job.start();
