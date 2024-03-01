ARG NODE_VERSION=20.11.1
FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY . /app

RUN npm install -g nodemon
RUN npm install express
RUN npm install mysql2

EXPOSE 3000

# VOLUME ["/app/data"]
# FROM mysql
# COPY init.sql /docker-entrypoint-initdb.d

CMD ["nodemon", "index.js"]
