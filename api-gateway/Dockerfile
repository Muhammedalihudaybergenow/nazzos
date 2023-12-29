FROM node:latest
WORKDIR /home/app/api-gateway
RUN npm install -g npm@latest
COPY . .
#RUN npm install
EXPOSE 3000
CMD [ "npm","run","dev" ]