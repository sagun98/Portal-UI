#!/bin/sh

cd /app && npm run build:$ANGULAR_BUILD_TYPE

nginx -c /app/nginx.conf -g 'daemon off;'
