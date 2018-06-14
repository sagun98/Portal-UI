
#!/bin/bash

sudo mkdir -p /app
sudo cp -rf scripts /app
sudo cp -rf src /app
sudo cp *.json /app
sudo /usr/local/bin/fpm -s dir -n dev-portal-ui -v 0.1.0 --iteration $(date "+%Y%m%d%H%M%S") -t deb /app