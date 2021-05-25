import { Response } from 'express'

export default function errorMsg(res: Response){
	let error: string[] = [];
	
	function end(){
		if(error.length > 0) res.status(400).json(error);
		return !!error.length;
	}

	function push(msg: string){
		error.push(msg);
		return error;
	}

	return {
		error,
		push,
		end
	}
} 
