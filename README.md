<div align="center">
	<img src="./public/assets/img/icon-1024.png" alt="ckcsc url" width=100>
	<h1>CKCSC URL</h1>
</div>

# url-shortener
URL shortener written in Node.js
[Demo](https://aurl.simba-fs.dev)

## Start with Docker
see [https://github.com/simba-fs/aurl-docker-deploy](https://github.com/simba-fs/aurl-docker-deploy)

## Installation
### Download the project.
- With git
	```BASH
	git clone --depth 1 https://github.com/simba-fs/aurl.git
	cd aurl
	npm i 
	```
- Without git
	```BASH
	wget https://github.com/simba-fs/aurl/archive/master.zip
	unzip master.sip
	cd aurl
	npm i 
	```

### config file
AURL can run none-config with a mongodb server. You can custom your own config by editing your own `config/local.json`. Example is placed in `config/default.json`.

### Google Analytics
GA is available in AURL. To enable it, modify `other.GAid` in `config/local.json`.

### hCaptcah
You can enable hCaptcha by editing `other.hcaptcha` in `config.local.json`. Once enabled, a captcha will insert in the index page below URL input.

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

