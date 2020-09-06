<div align="center">
	<img src="./public/assets/img/icon-1024.png" alt="ckcsc url" width=100>
	<h1>CKCSC URL</h1>
</div>

# url-shortener
URL shortener written in Node.js

## Installation
### Download the project.
- With git
	```BASH
	git clone --depth 1 https://github.com/simba-fs/url-shortener.git
	cd url-shortener
	npm i 
	```

- Without git
	```BASH
	wget https://github.com/simba-fs/url-shortener/archive/master.zip
	unzip master.sip
	cd url-shortener-master
	npm i 
	```

### Prepare dotenv file
This project needs a `.env` file to set the DB url, and other things can't public on internet.

Please complete the `.env` example below, and save it to the root directory of this project.

```env
DB=/url/to/your/db
BASEURL=/your/host/url
backdoor=/backdoor/token
admin="your admin token"

appName="Your app name"
title="title"
subtitle="subtitle"
```

### Start the server
```BASH
npm start
```

## Start with Docker
1. install docker, docker-compose
2. run the following command
```bash
mkdir aurl
cd aurl
wget https://raw.githubusercontent.com/simba-fs/aurl/master/docker-compose.yml
wget https://raw.githubusercontent.com/simba-fs/aurl/master/env-sample
mv env-sample .env
# then edit .env file
docker-compose up -d
```

## API v1
| method | path    | params |
| ------ | ------- | ------ |
| GET    | /code   | code   |
| GET    | /url    | url    |
| POST   | /create | url    |

## [CHANGELOG](./CHANGELOG.md)

## TODO
- Browser addons
- Improve log
- ~~Click to copy (finish)~~
- ~~add ip record (finish)~~

---

感謝 [CSY教主](https://github.com/CSY54)、[海豹](https://www.facebook.com/seadog007) 幫助解決 nosql injection  
\CSY教我/  
\CSY教主萬歲/  

