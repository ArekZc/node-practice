FROM node

RUN npm i -g typings typescript

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install --unsafe-perm
RUN node_modules/.bin/typings install

EXPOSE 3000
