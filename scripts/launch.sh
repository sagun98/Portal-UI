#!/bin/bash

cd /app && npm install

cd /app && npm run build:$ANGULAR_BUILD_TYPE

nginx -c /app/nginx.conf -g 'daemon off;'
