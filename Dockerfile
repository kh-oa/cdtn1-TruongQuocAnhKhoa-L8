
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY src ./src
COPY db ./db

EXPOSE 3000

CMD ["node", "src/server.js"]
