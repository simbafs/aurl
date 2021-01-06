#!/usr/bin/env node
const config = require('config');
const fs = require('fs');

// update notice
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
const notifier = updateNotifier({pkg});
notifier.notify();
notifier.update && console.log(notifier.update);

// config
if(!fs.readdirSync('config').some(i => i.includes('local'))){
	console.log('tips: you can custom some variables by adding your `config/local.json`');
}

console.group('Config:');
console.table({ DB: config.get('DB')});
console.table(config.get('app'));
console.table({
	hcaptcha: !! (config.get('other.hcaptcha.sitekey') && config.get('other.hcaptcha.sitekey') ),
	GAid: !!config.get('other.GAid')
});
console.groupEnd();

require('./www');
