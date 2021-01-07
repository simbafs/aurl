<div align="center">
	<img src="./public/assets/img/icon-1024.png" alt="AURL" width=100>
	<h1>CKCSC URL</h1>
</div>

# AURL
URL shortener written in Node.js  
[Demo (https://aurl.simba-fs.dev)](https://aurl.simba-fs.dev)

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
AURL has a preset config (`config/default.json`), the only thing you need to do is starting a localhost mongodb server (port 27017). To customize your own config, edit your own `config/local.json`. Examp	le is placed in `config/default.json`.

### Google Analytics
GA is available in AURL. To enable it, modify `other.GAid` in `config/local.json`.

### hCaptcah
You can enable hCaptcha by editing `other.hcaptcha` in `config.local.json`. Once enabled, a captcha section will insert in the index page below URL input.

### Start the server
```bash
npm start
```

## API v1
| method | path    | params |
| ------ | ------- | ------ |
| GET    | /code   | code   |
| GET    | /url    | url    |
| POST   | /create | url    |

## TODO
- Browser addons
- Improve log
- ~~Click to copy (finish)~~
- ~~add ip record (finish)~~

