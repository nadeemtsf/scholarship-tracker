FROM node:22-bookworm-slim

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

ENV NODE_ENV=production
EXPOSE 10000

CMD ["sh", "-c", "npm start -- --port ${PORT:-10000}"]
