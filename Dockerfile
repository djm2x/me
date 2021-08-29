FROM node:14-alpine
EXPOSE 3000

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "dist", "node_modules", "./"]

CMD ["npm", "run", "start:prod"]