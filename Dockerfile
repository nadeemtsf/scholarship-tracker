FROM node:22-bookworm-slim

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

ENV NODE_ENV=production
EXPOSE 10000

CMD ["sh", "-c", "node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js dev --config dist/server/wrangler.json --local --persist-to /tmp/wrangler-state --ip 0.0.0.0 --inspector-port 0 --port ${PORT:-10000}"]
