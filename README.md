![url shortener](./index.png)

# url-shortener
url shortener written in nodejs

## Install
```
git clone https://github.com/simba-fs/url-shortener.git
cd url-shortener
npm i 
cat DB=/path/to/your/db >> .env
cat BASEURL=/your/domain/name
npm start
```

## .env
this project need a .env file to tell the db url and something can't public on internet  
please conplete the following
```env
DB=/url/to/your/db
BASEURL=/your/host/url
backdoor=/backdoor/token
admin=your admin token
```

## CHANGELOG
2019/12/4
add clipboard.js

## TODO
1. brewser addons
2. click to copy (finish)
3. add ip record
