#!/bin/bash

sudo node -v
sudo npm -v
sudo npm install
sudo npm run build
sudo nginx -c /app/nginx.conf -g 'daemon off;'