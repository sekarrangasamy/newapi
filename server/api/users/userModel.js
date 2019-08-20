import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var Score = require('../score/scoreModel');

var UserSchema = new Schema({

	name: {
		type: String,
		required: true,
		index: true,
		unique: true
	},
	email: {
		type: String
	},
	age: {
		type: Number,
		required: true,
		index: true
	},
	profile_id:{
		type:String
	},
	hashed_password: {
		type: String
	},
	provider: {
		type: String,
		enum: ['OWN', 'FB', 'Google']
	},
	otp: {
		type: String
	},
	otp_verified: {
		type: Boolean,
		default: false
	},
	otp_verified_token_generated: {
		type: Date
	},
	email_verified: {
		type: Boolean,
		default: false
	},
	email_verified_token: {
		type: String
	},
	email_verified_token_generated: {
		type: Date
	},
	deleted: {
		type: Boolean,
		default: false
	}

}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'last_updated_at'
	}
});

export default mongoose.model('User', UserSchema);