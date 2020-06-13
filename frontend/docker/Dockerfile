FROM node:12-slim

RUN mkdir -p /home/node/frontend/node_modules && chown -R node:node /home/node/frontend

WORKDIR /home/node/frontend

COPY package*.json ./

USER node

RUN npm install --production

COPY --chown=node:node . .

RUN sed -i "s/localhost/ec2-54-144-27-221.compute-1.amazonaws.com/g" pages/index.js

RUN npm run build

CMD [ "npm", "start" ]
