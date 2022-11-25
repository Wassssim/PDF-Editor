FROM node:16-alpine as build-stage

# optimize for production
#ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --chown=node:node package*.json .

RUN npm install

COPY --chown=node:node . /usr/src/app/

RUN npm run build

FROM nginx

COPY --from=build-stage /usr/src/app/dist /var/www/react-front/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80