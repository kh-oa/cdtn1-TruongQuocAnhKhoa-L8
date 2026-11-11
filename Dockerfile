FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY --chown=node:node src ./src
COPY --chown=node:node db ./db
COPY --chown=node:node tests ./tests

USER node

EXPOSE 3000

CMD ["node", "src/server.js"]