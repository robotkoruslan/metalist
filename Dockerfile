FROM node:buster
RUN mkdir /app
WORKDIR /app

COPY package.json /app

RUN yarn install --production --network-timeout 600000

ADD /dist /app

EXPOSE 80
