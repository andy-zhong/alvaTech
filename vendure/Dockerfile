FROM node:20 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npm run build:dashboard
RUN npm prune --omit=dev

FROM node:20 AS runtime

ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/static ./static

EXPOSE 2605

CMD ["npm", "run", "start:server"]
