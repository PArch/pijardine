const sensor = require("node-dht-sensor");
const rpio = require('rpio');
const http = require('http')
const Gun = require('gun');
const CronJob = require('cron').CronJob;
const mcpadc = require("mcp-spi-adc");
var gun = Gun({file: 'data', web: http.createServer().listen(8765) });

function readSensorDHC22() {
	sensor.read(22, 4, function(err, temperature, humidity) {
		if (err) {console.log(err)}
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
}

const job = new CronJob('0 */1 * * * *', function() {
	readSensorDHC22()
	readSensorLM393()
});
job.start();
