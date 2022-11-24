FROM node:16-alpine

# optimize for production
ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --chown=node:node . /usr/src/app/

RUN npm ci --only=production

USER node

EXPOSE 5000

CMD [ "node", "app.js" ]