


let mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/pwd-api', {useNewUrlParser: true});
mongoose.Promise = Promise;





// Schema
let entrySchema = new mongoose.Schema({
	website: {
		type: String,
		required: "please enter a name"
	},
	username: {
		type: String, 
		required: "enter username"
	},
	pwd: {
		type: String,
		required: 'enter the password'
	},
	created_date: {
		type: Date,
		default: Date.now
	},
	keyword: {
		type: String
	}
});

let EntryModel  = mongoose.model('EntryModel', entrySchema);


module.exports.EntryModel = EntryModel;
