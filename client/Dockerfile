# client.Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
