FROM node:20-bookworm-slim

ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY package*.json ./
RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ \
    && npm ci --omit=dev \
    && npm cache clean --force \
    && apt-get purge -y --auto-remove python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

# The release ZIP contains locally verified, platform-independent JavaScript
# and Dashboard assets. Native runtime dependencies are installed above for
# Linux, while the small production server avoids compiling Vite on a 2 GB VM.
COPY dist ./dist
COPY static ./static

EXPOSE 2605

CMD ["npm", "run", "start:server"]
