import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}, (err) => {
	if(err) return console.error(err);
});

import { UserModel } from './src/schema/mongoModel';

