# base image
FROM node:8.11.4

# set working directory
RUN mkdir /app
WORKDIR /app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY *.json /app/
COPY nginx.conf /app/
COPY scripts /app/scripts
COPY src /app/src

RUN apt-get update && apt-get install nginx -y && npm install

EXPOSE 80

ENTRYPOINT [ "/bin/bash", "/app/scripts/launch.sh"]
