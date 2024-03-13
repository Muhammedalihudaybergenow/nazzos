FROM node:latest
WORKDIR /home/app/files
RUN npm install -g npm@latest
COPY . .
EXPOSE 4000
CMD ["npm","run","dev"]
