FROM node:lts-alpine
LABEL author="longpt99.it@gmail.com"

RUN mkdir -p /home/app
WORKDIR /home/app
COPY package*.json newrelic.js ecosystem.config.js ./

RUN npm ci --production && npm install pm2 --location=global && npm cache clean --force
COPY ./dist ./dist
EXPOSE 8080

ENTRYPOINT [ "pm2-runtime","start","ecosystem.config.js"]