const sensor = require("node-dht-sensor");
const rpio = require('rpio');
const http = require('http')
const Gun = require('gun');
const CronJob = require('cron').CronJob;
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

	rpio.open(13, rpio.INPUT);
	console.log('Pin 11 is currently ' + (rpio.read(13) ? 'high' : 'low'));
	console.log(rpio.read(13));
}
readSensorLM393()
const job = new CronJob('0 */1 * * * *', function() {
	readSensorDHC22()
	readSensorLM393()
});
job.start();
