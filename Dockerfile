FROM node:12

# build environment
WORKDIR /aurl 
COPY package*.json ./
RUN npm i --only=production

COPY . ./
EXPOSE 3000
CMD ["node", "bin/www"]

