const plusTrimRegex = /([\w.]*)(?:\+[\w]*)?@([\w.]*)/;

export default function trimEmail(email: string){
	let parsedEmail = email.trim().match(plusTrimRegex);
	if(!parsedEmail) return '';
	return `${parsedEmail[1]}@${parsedEmail[2]}`;
}
