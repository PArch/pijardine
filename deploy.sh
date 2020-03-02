git add ./
if [ "$1" != "" ]; then
    git commit -m "$1"
else
    git commit -m "fix"
fi
git push origin master
ssh pi@192.168.0.13 'sh /home/pi/Source/pijardine/deploy_rpi.sh'
