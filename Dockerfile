FROM node:latest

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build-prod

# EXPOSE 3000

# CMD ["npm", "start"]