import config from 'config';
import Debug from 'debug';
const debug = Debug('api:lib/randomCode');

import { CodeModel } from '../schema/mongoModel';

function randomString(len: number, charset: string[]){
	let charAmount = charset.length;
	let result = '';

	for(let i = 0; i < len; i++){
		result += charset[Math.floor(Math.random() * charAmount)];
	}

	return result;
}

let len = config.get('code.len') as number;
let charset = config.get('code.charset') as string[];

export async function randomCode(scope = 'default'){
	let codes = await CodeModel.findOne({ scope });
	
	let code = randomString(len, charset);
	while(codes.code.includes(code)) code = randomString(len, charset);
	
	return code;
}
