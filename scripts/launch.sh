#!/bin/bash

apt-get update
apt-get install curl -y

curl -o nodejs_8.11.2-1nodesource1_amd64.deb https://deb.nodesource.com/node_8.x/pool/main/n/nodejs/nodejs_8.11.2-1nodesource1_amd64.deb
dpkg -i nodejs_8.11.2-1nodesource1_amd64.deb
apt-get install -f -y

node -v
npm -v

echo "-------------------------"
echo $ANGULAR_PRODUCTION_BUILD
echo $RESTBASE
echo $ANGULAR_BUILD_TYPE
echo "-------------------------"

cd /app && npm install
cd /app && npm run build:dev

nginx -c /app/nginx.conf -g 'daemon off;'