FROM node:12

WORKDIR /app/src

COPY package*.json ./

RUN npm install


COPY . /app/src

EXPOSE 3000

CMD ["node","app.js"]



