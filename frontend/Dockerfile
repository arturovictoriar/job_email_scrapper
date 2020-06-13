FROM node:12-slim

ENV HOST_API=ec2-54-144-27-221.compute-1.amazonaws.com

# Testing purposes
RUN apt-get update \
    && apt-get install -y wget curl

RUN mkdir -p /home/node/frontend/node_modules && chown -R node:node /home/node/frontend

WORKDIR /home/node/frontend

COPY package*.json ./

USER node

RUN npm install --production

COPY --chown=node:node . .

RUN chmod 755 docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

# RUN npm run build

# CMD [ "npm", "start" ]
