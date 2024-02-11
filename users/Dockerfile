FROM node:latest
WORKDIR /home/app/users
RUN npm install -g npm@latest
COPY . .
RUN npm install
RUN ["chmod","+x","./migration-seed.sh"]
CMD ["bash","./migration-seed.sh"]
