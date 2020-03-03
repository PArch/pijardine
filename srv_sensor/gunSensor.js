const sensor = require("node-dht-sensor");
const rpio = require('rpio');
const http = require('http')
const Gun = require('gun');
const CronJob = require('cron').CronJob;
var gun = Gun({file: 'data', web: http.createServer().listen(8765) });
let v = Buffer(5);

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
read_dht11(v)
console.log(v[2]);
console.log(v);
});
job.start();
var pin = 13;

function read_dht11(vals)
{

	var data = new Array(40);

	var buf = new Buffer(50000);

	rpio.open(pin, rpio.OUTPUT, rpio.HIGH);
	rpio.write(pin, rpio.LOW);
	rpio.msleep(18);

	rpio.mode(pin, rpio.INPUT, rpio.PULL_UP);
	rpio.readbuf(pin, buf);
	rpio.close(pin);


	var dlen = 0;
	buf.join('').replace(/0+/g, '0').split('0').forEach(function(bits, n) {

		if (n < 2 || n > 41)
			return;

		data[dlen++] = bits.length;
	});

	if (dlen < 39)
		return false;

	var low = 10000;
	var high = 0;
	for (var i = 0; i < dlen; i++) {
		if (data[i] < low)
			low = data[i];
		if (data[i] > high)
			high = data[i];
	}
	var avg = (low + high) / 2;


	vals.fill(0);
	for (var i = 0; i < dlen; i++) {
		var group = parseInt(i/8)

		/* The data is in big-endian format, shift it in. */
		vals[group] <<= 1;

		/* This should be a high bit, based on the average. */
		if (data[i] >= avg)
			vals[group] |= 1;
	}


	return (vals[4] == ((vals[0] + vals[1] + vals[2] + vals[3]) & 0xFF));
}
