FROM node:14-alpine
EXPOSE 3000

ENV NODE_ENV=production

WORKDIR /app

COPY package.json .
COPY node_modules ./node_modules
COPY dist ./dist

CMD ["npm", "run", "start:prod"]