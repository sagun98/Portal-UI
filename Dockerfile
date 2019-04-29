# base image
#FROM node:8.15.1-stretch
#FROM node:8.15.1-alpine
FROM node@sha256:8e9987a6d91d783c56980f1bd4b23b4c05f9f6076d513d6350fef8fe09ed01fd


# set working directory
RUN mkdir /app
RUN mkdir -p /run/nginx
WORKDIR /app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY *.json /app/
COPY nginx.conf /app/
COPY scripts /app/scripts
COPY src /app/src

#RUN apt-get update && apt-get install nginx -y && npm install
RUN apk update && apk add nginx && npm install

EXPOSE 80

ENTRYPOINT [ "/bin/sh", "/app/scripts/launch.sh"]