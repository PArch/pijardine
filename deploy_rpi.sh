cd /home/pi/Source/pijardine/
git pull origin master
pm2 delete pijardine.js
pm2 start pijardine.js  --no-autorestart
