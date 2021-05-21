import { Response } from 'express'

export default function errorMsg(res: Response){
	let error: string[] = [];
	function end(){
		if(error.length > 0) res.status(400).json(error);
		return error.length;
	}

	return {
		error,
		push: error.push,
		end
	}
} 
