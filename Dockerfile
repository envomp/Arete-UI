FROM node:lts-alpine
MAINTAINER enrico.vompa@gmail.com
WORKDIR /arete_ui

ENV PATH /arete_ui/node_modules/.bin:$PATH

COPY . .

RUN npm install

ENTRYPOINT ["sh", "-c", "npm config set BACKEND $BACKEND && npm start"]
