FROM node:20.18.0-bookworm-slim

WORKDIR /app

RUN apt-get update && \
  apt-get install -y \
  git \
  yarn \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

COPY package.json .

RUN yarn install && yarn add qrcode-terminal

RUN yarn add @supabase/supabase-js

RUN npm install koa @koa/router koa-bodyparser node-fetch

COPY . .

EXPOSE 4000

CMD ["yarn", "start"]
