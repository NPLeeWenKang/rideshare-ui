FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV REACT_APP_PORT=3000

EXPOSE 3000

CMD ["npm", "start"]