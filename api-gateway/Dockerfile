FROM node:latest
WORKDIR /home/api-gateway
COPY ./package*.json .
RUN npm install -g npm@latest
RUN npm install
COPY . .
CMD [ "" ]