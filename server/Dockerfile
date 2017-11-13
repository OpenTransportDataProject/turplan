FROM node:8
MAINTAINER Trym

RUN mkdir -p /app
WORKDIR /app
COPY . /app

RUN set -e \
  && yarn

ENTRYPOINT ["node", "./bin/www"]
