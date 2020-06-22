FROM node:12

WORKDIR /api

COPY package*.json /api/
COPY yarn.lock /api/
COPY tsconfig.json /api/

COPY .docker/app/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3333
