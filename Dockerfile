FROM node:18-bullseye

WORKDIR /app

RUN apt-get update && apt-get install -y curl iputils-ping
COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "test:mobile"]