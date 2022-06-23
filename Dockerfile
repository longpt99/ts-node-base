FROM node:lts-alpine

LABEL author="Long Phuong (longpt99.it@gmail.com)"

RUN mkdir -p /home/app

WORKDIR /home/app

COPY package*.json ecosystem.config.js ./

RUN npm install pm2 --location=global && \ 
    npm set-script prepare "" && \ 
    npm install ci --production && \ 
    npm cache clean --force

COPY ./dist ./dist

CMD ["pm2-runtime","start","ecosystem.config.js","--env","production"]