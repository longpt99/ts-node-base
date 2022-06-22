FROM node:lts-alpine

LABEL author="Long Phuong (longpt99.it@gmail.com)"

WORKDIR /home/app

COPY package*.json ecosystem.config.js ./

RUN  npm install pm2 --location=global && npm install ci --production --ignore-scripts && npm cache clean --force

COPY ./dist ./dist

CMD ["pm2-runtime","start","ecosystem.config.js","--env","production"]