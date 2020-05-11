<div align="center">
	<img src="./public/assets/img/icon-1024.png" alt="ckcsc url" width=100>
	<h1>CKCSC URL</h1>
</div>

# url-shortener
url shortener written in nodejs

## Install
```
git clone https://github.com/simba-fs/url-shortener.git
cd url-shortener
npm i 
npm start
```

## .env
This project need a .env file to set the db url and things can't public on internet  
please conplete the following
```
DB=/url/to/your/db
BASEURL=/your/host/url
backdoor=/backdoor/token
admin="your admin token"

appName="Your app name"
title="title"
subtitle="subtitle"
```

## API v1
| method | path    | params |
| ------ | ------- | ------ |
| GET    | /code   | code   |
| GET    | /url    | url    |
| POST   | /create | url    |

## [CHANGELOG](./CHANGELOG.md)

## TODO
1. brewser addons
2. click to copy (finish)
3. add ip record (finish)
4. improve log

---

感謝 [CSY教主](https://github.com/CSY54)、[海豹](https://www.facebook.com/seadog007) 幫助解決 nosql injection  
\CSY教我/  
\CSY教主萬歲/  

