FROM node:22-alpine as angular

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli
COPY . .
RUN npm run build 

FROM httpd:alpine3.20

RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf

WORKDIR /usr/local/apache2/htdocs
COPY --from=angular /app/dist/myapp/browser .