const sensor = require("node-dht-sensor");
const http = require('http')
const Gun = require('gun');
const CronJob = require('cron').CronJob;
var gun = Gun({file: 'data', web: http.createServer().listen(8765) });

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

const job = new CronJob('0 */1 * * * *', function() {
	readSensor()
});
job.start();
