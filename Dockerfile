FROM node:lts-alpine

ENV NODE_ENV production
USER node

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./

COPY --chown=node:node . .
RUN npm install
RUN npm run build

COPY .env ./

# Create upload directory
# RUN mkdir ./upload

EXPOSE 8000

CMD [ "node", "dist/index.js"]