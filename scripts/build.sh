#!/bin/bash

sudo node -v
sudo npm -v

sudo mkdir -p /app

sudo cp -rf scripts /app/scripts
sudo cp -rf src /app/src
sudo cp *.json /app/
sudo cp nginx.conf /app/

sudo /usr/local/bin/fpm -s dir -n dev-portal-ui -v 0.1.0 --iteration $(date "+%Y%m%d%H%M%S") -t deb /app