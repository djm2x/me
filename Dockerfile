FROM node:14-alpine
EXPOSE 3000

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "dist", "node_modules", "./"]

COPY package.json .
COPY node_modules .
COPY dist .

CMD ["npm", "run", "start:prod"]