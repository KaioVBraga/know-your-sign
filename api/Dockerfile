FROM node:20-alpine

COPY . .
RUN npm install
RUN npm run build
COPY . .
CMD ["node", "dist/main.js"]