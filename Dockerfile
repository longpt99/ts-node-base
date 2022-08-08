FROM node:lts-alpine

LABEL author="Long Phuong (longpt99.it@gmail.com)"

WORKDIR /home/app

COPY yarn.lock package.json ecosystem.config.js newrelic.js ./

RUN yarn global add pm2 && yarn install --production && yarn cache clean

COPY ./dist ./dist

CMD ["pm2-runtime","start","ecosystem.config.js","--env","production"]