FROM node:lts-alpine
MAINTAINER enrico.vompa@gmail.com
WORKDIR /arete_ui

ENV PATH /arete_ui/node_modules/.bin:$PATH
ENV NODE_ENV ${NODE_ENV}
ENV BACKEND ${BACKEND}

COPY . .

RUN npm ci
RUN npm run build

EXPOSE 80
# start app

CMD ["npm", "run", "start"]
