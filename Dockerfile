FROM node:18 as base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .
EXPOSE 8080
CMD ["npm", "start"]
