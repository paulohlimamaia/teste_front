FROM node:8

WORKDIR /app

COPY . /app

EXPOSE 8080

RUN npm install http-server -g

RUN npm install

RUN npm rebuild node-sass

RUN npm run build

CMD http-server ./dist