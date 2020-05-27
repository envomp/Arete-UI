FROM node:lts-alpine
MAINTAINER enrico.vompa@gmail.com
WORKDIR /arete_ui

ENV PATH /arete_ui/node_modules/.bin:$PATH

COPY . .

RUN npm install

ENTRYPOINT ["sh", "-c", "echo 'VUE_APP_BACKEND=$BACKEND' >> .env && npm start"]
