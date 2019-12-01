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
```

## TODO
1. brewser addons
2. click to copy

## api
[url](https://url.ckcsc.net/api)
| api | args | result |
| :--- | :--- | :--- |
| new | u {} | code or error {json}| 
