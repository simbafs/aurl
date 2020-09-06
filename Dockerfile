FROM node:12

# build environment
WORKDIR /aurl 
COPY package*.json ./
RUN npm i --only=production
RUN npm i pm2 -g

COPY . ./
EXPOSE 3000
CMD ["pm2-runtime", "bin/www"]

