FROM node:20-alpine

WORKDIR /app

COPY src ./src
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY nest-cli.json ./nest-cli.json
COPY tsconfig.json ./tsconfig.json

RUN npm install
RUN npm run build


CMD ["node", "dist/main.js"]