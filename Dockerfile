FROM node:16-alpine as builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build

FROM node:16-alpine AS server
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
VOLUME [ "/secrets" ]

RUN yarn install --production
COPY --from=builder ./app/dist ./dist
EXPOSE 1201
CMD ["yarn", "start"]
