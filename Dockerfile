ARG NODE_VERSION=20.11.1
FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY . /app

RUN npm install -g nodemon
RUN npm install express
RUN npm install fs
RUN npm install mysql

EXPOSE 3000

VOLUME ["/app/data"]

CMD ["nodemon", "index.js"]
