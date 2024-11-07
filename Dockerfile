FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

COPY . .

CMD ["node", "server.js"]
