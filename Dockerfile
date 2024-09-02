#BASE IMAGE
FROM node:20.11.1

#Create app directory
WORKDIR /app 

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/src/app.js"]