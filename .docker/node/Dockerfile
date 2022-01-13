FROM node:lts-alpine

RUN mkdir -p /home/app
WORKDIR /home/app
COPY package.json yarn.lock ecosystem.config.js ./

RUN yarn install && npm install pm2 -g
COPY ./dist ./dist
EXPOSE 8080

ENTRYPOINT [ "pm2-runtime","start","ecosystem.config.js" ]