FROM node:lts-alpine as build-stage
MAINTAINER enrico.vompa@gmail.com
WORKDIR /arete_ui

ENV PATH /arete_ui/node_modules/.bin:$PATH

COPY . .

RUN yarn
RUN yarn build
RUN mv public public-vue
RUN mv dist public

EXPOSE 80
# start app

CMD ["npm", "run", "serve"]


#FROM nginx as production-stage
#RUN mkdir /arete_ui
#COPY --from=build-stage /arete_ui/dist /arete_ui
##COPY nginx.conf /etc/nginx/nginx.conf

#CMD ["nginx", "-g", "daemon off;"]