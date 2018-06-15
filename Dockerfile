# base image
FROM debian

# install chrome for protractor tests
#RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
#RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
#RUN apt-get update && apt-get install -yq google-chrome-stable

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
#COPY nodejs_8.11.2-1nodesource1_amd64.deb /app/

#RUN apt-get update && dpkg -i nodejs_8.11.2-1nodesource1_amd64.deb; exit 0 
#RUN apt-get install -f -y

RUN apt-get update
RUN apt-get install nginx -y

EXPOSE 80

ENTRYPOINT [ "/bin/bash", "/app/scripts/launch.sh" ]