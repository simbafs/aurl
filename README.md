<div align="center">
	<img src="./public/assets/img/icon-1024.png" alt="ckcsc url" width=100>
	<h1>CKCSC URL</h1>
</div>

# url-shortener
URL shortener written in Node.js

## Start with Docker
see [https://github.com/simba-fs/aurl-docker-deploy](https://github.com/simba-fs/aurl-docker-deploy)

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
email=support@aurl.com

appName="Your app name"
title="title"
subtitle="subtitle"

HCAPTCHA_SECRET_KEY=your_secret_key
GAid=Google_Analytics_ID
```

### Start the server
```BASH
npm start
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

