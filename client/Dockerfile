FROM node:6.11.3

ARG backend=null
ENV BACKEND_URL $backend
ENV NPM_CONFIG_LOGLEVEL warn

RUN ls
RUN mkdir /app
COPY . /app

WORKDIR /app
RUN mkdir build

#RUN npm install
RUN REACT_APP_BACKEND_URL=$BACKEND_URL npm run build


COPY ./build /var/www/html

WORKDIR /

FROM nginx

RUN mkdir /etc/nginx/logs && touch /etc/nginx/logs/static.log
ADD ./nginx.conf /etc/nginx/conf.d/default.conf

RUN cat /etc/nginx/conf.d/default.conf && rm -rf /var/www/html/index.nginx-debian.html

COPY /app/build /var/www/html
