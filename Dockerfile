FROM node:15.14.0
RUN mkdir /app
WORKDIR /app

COPY package*.json /app
RUN npm install
ADD /. /app
RUN npm run build:dev
# RUN npm run build:prod

EXPOSE 80
