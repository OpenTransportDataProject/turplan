FROM node:8
MAINTAINER Trym

RUN mkdir -p /server
COPY . /server
WORKDIR /server

RUN set -e \
  && npm install

CMD ["node", "bin/www"]
