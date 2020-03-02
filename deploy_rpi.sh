cd /home/pi/Source/pijardine/srv_sensor
git pull origin master
pm2 delete gunSensor
pm2 start gunSensor.js  --no-autorestart
