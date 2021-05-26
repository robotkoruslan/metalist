### First stage ###
FROM node:15.14.0 as appbuild

WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

### Second stage ### 
FROM node:15.14.0-slim
WORKDIR /app
COPY package*.json /app/
RUN npm install --only=production
COPY --from=appbuild /app/dist /app
EXPOSE 80
CMD npm start

