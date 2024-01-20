FROM node:alpine

WORKDIR /docker_build

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
