FROM node:12-slim

# Testing purposes
RUN apt-get update \
    && apt-get install -y wget curl

RUN mkdir -p /home/node/frontend/node_modules && chown -R node:node /home/node/frontend

WORKDIR /home/node/frontend

COPY package*.json ./

USER node

RUN npm install --production

COPY --chown=node:node . .

RUN npm run build

CMD [ "npm", "start" ]

