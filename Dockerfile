#   Stage 1 - build static file
FROM node:14-alpine as build-stage

LABEL maintainer="VieON.vn"
LABEL service_name="demo-livestream-rec"

WORKDIR /app

# ENV PATH /app/node_modules/.bin:$PATH
ARG VUE_APP_API_BASE_URL
# RUN export

COPY package.json ./

RUN echo VUE_APP_API_BASE_URL=${VUE_APP_API_BASE_URL} >> .env
RUN cat .env

RUN apk add --no-cache ffmpeg opus pixman cairo pango giflib ca-certificates \
    && apk add --update npm \
    && apk add --no-cache --virtual .build-deps curl git pixman-dev cairo-dev pangomm-dev libjpeg-turbo-dev giflib-dev \
    && npm install \
    && apk del .build-deps

COPY . ./

RUN npm run build

#   Stage 2 - nginx
FROM nginx:1.19.6-alpine as demo-livestream-rec

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build-stage /app/dist .

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 7006

ENTRYPOINT ["nginx", "-g", "daemon off;"]
