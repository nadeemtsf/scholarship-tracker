FROM node:22-bookworm-slim

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

ENV NODE_ENV=production
EXPOSE 10000

CMD ["sh", "-c", "npx vinext start --hostname 0.0.0.0 --port ${PORT:-10000}"]
