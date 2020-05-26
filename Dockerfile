FROM node:12-alpine
MAINTAINER enrico.vompa@gmail.com
WORKDIR /arete_ui

ENV PATH /arete_ui/node_modules/.bin:$PATH

COPY . .

RUN yarn
RUN yarn build
RUN mv dist services/arete/dist

# start app

ENTRYPOINT ["sh", "-c", "serve -s dist"]
