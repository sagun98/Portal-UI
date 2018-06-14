#!/bin/bash

node -v
npm -v
npm install
npm run build
nginx -c /app/nginx.conf -g 'daemon off;'