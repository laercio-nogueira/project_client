FROM node:24-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN cd bff && npm install && npm run build
RUN cd client && npm install && npm run build
EXPOSE 3000 4173
CMD ["npm", "run", "prod"]
