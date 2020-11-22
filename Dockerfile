FROM node:lts-alpine
MAINTAINER enrico.vompa@gmail.com
WORKDIR /monitoring_service

ENV PATH /monitoring_service/node_modules/.bin:$PATH

COPY . .

RUN npm install

ENTRYPOINT ["sh", "-c", "echo 'VUE_APP_BACKEND=$BACKEND' >> .env && npm start"]
