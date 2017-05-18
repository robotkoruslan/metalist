FROM node:boron

RUN mkdir /app
WORKDIR /app

ADD /dist /app
