export function isContain(parent: string[], child: string[]){
	return child.every(i => parent.includes(i));
}

export function typeOfElement(arr: any[]): string[]{
	function typeOf(i: any){
		if(typeof i === 'string') return 'string';
		if(typeof i === 'number') return 'number';
		if(Array.isArray(i)) return 'array';

		return 'object';
	}
	function add<T = any>(arr:T [], ele: T){
		if(!arr.includes(ele)) arr.push(ele);
		return arr;
	}

	return arr.reduce((result, i) => add<string>(result, typeOf(i)), []);
}
