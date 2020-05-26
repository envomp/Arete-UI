FROM node:lts-alpine
MAINTAINER enrico.vompa@gmail.com
WORKDIR /arete_ui

ENV PATH /arete_ui/node_modules/.bin:$PATH
ENV NODE_ENV ${NODE_ENV}
ENV BACKEND ${BACKEND}

COPY . .

RUN yarn
RUN yarn build
RUN mv public public-vue
RUN mv dist public

EXPOSE 80
# start app

ENTRYPOINT ["sh", "-c", "serve -s dist"]
