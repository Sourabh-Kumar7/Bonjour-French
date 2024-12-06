FROM node:18

WORKDIR /app

COPY ./package*.json ./
COPY ./client/package*.json ./client/

RUN npm install

COPY . .

RUN cd client && npm install

RUN cd ..

RUN npm rebuild bcrypt --build-from-source

CMD ["npm", "start"]
