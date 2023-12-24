FROM node:latest
WORKDIR /home/app/users
RUN npm install -g npm@latest
COPY . .
RUN npm install
CMD ["npm","run","dev"]