import User from './userModel';
var sendRsp = require('../../utils/response').sendRsp;
var status = require('../../config/http_status');
var msg = require('../../config/message');
var globalLimit = require('../../config/environment');
var references = require('../../config/resource');
var upload = require('../../auth/fileupload');
var async = require('async');
var resource = 'user';
var _ = require('lodash')
var moment = require('moment');
var config = require('../../config/environment');
var s3delete = require('../../utils/s3.js').s3delete
var notifyObj = require('../../config/notification')
var notificationService = require('../notifications/notificationCreate');
var email = require('../../job/email');
var agenda = require('../../agenda').agenda;


// var pushNotification = require('../../job/send-pushNotification');



//creating users
//Input:Object Ex:{"name:String,age:Integer"}
//Output:object created
exports.create = async function(req, res) {
	try {
		req.checkBody('name', 'Missing Query Param').notEmpty();
		req.checkBody('age', 'Missing Query Param').notEmpty();
		var errors = req.validationErrors();
		if (errors) {
			sendRsp(res, status.BAD_REQUEST, msg.err, errors);
			return;
		}
		var userObj = {};
		userObj.name = req.body.name;
		userObj.age = req.body.age;
		userObj.profile_id = Math.floor(100000 + Math.random() * 900000)
		var users = await User.create(userObj)
		sendRsp(res, status.CREATED, msg.create, users);
	} catch (err) {
		if (err.code == 11000) {
			sendRsp(res, status.CONFLICT, msg.conflict, err);
		}
		sendRsp(res, status.INTERNAL_SERVER_ERROR, msg.err, err);
	}
}

//getAll users array 0f objects
exports.get = function(req, res) {
	console.log('fff', req.query)
	var query = {};

	if (req.query.name) {
		var queryValue = req.query.name;
		var value = new RegExp(".*" + queryValue, "i");
		query.name = {
			$regex: value
		}
	}
	if (req.query.email) {
		var queryValue = req.query.email;
		var value = new RegExp(".*" + queryValue, "i");
		query.email = {
			$regex: value
		}
	}
	if (req.query.status) {
		query.status = req.query.status;

	}
	if (req.query.provider) {
		query.provider = req.query.provider;
	}
	if (req.query.age) {
		query.age = req.query.age;
	}
	if (req.query.level) {
		query.level = req.query.level;
	}
	if (req.query.country) {
		query.country = req.query.country;
	}
	if (req.query.current_game) {
		query.current_game = req.query.current_game;
	}
	if (req.query.overall_score) {
		query.overall_score = req.query.overall_score;
	}
	if (req.query.from && req.query.to) {
		query.created_at = {
			$gte: moment(new Date(req.query.from)).startOf('day').format(),
			$lte: moment(new Date(req.query.to)).endOf('day').format()
		}
	}
	var options = {
		limit: globalLimit.globalRowsLimit,
		skip: 0
	};
	options.sort = {
		"_id": -1
	};
	if (req.query.sort != undefined) {
		let key = req.query.sort;
		let obj = {};
		obj[key] = req.query.orderBy;
		options.sort = obj;
	}
	if (req.query.limit != undefined)
		options.limit = parseInt(req.query.limit);
	if (req.query.offset != undefined)
		options.skip = parseInt(req.query.offset);
	if (req.query.limit < 0 || req.query.limit > options.limit) {
		req.query.limit = options.limit;
	}
	query['deleted'] = false;
	console.log("sort", options)
	User.find(query, null, options)
		.populate(references['users'])
		.exec()
		.then(user => {
			User.count(query, (err, counts) => {
				if (err) {
					sendRsp(res, status.INTERNAL_SERVER_ERROR, msg.err, err)
				} else {
					sendRsp(res, status.OK, msg.get, {
						"total": counts,
						"users": user
					});

				}
			})

		}).catch(err => {
			sendRsp(res, status.INTERNAL_SERVER_ERROR, msg.err, err);
		});
}


//getsingle users  single object
exports.show = function(req, res) {
	User.findById(req.params.id)
		.populate(references['users'])
		.exec()
		.then(user => {
			sendRsp(res, status.OK, msg.get, user);
		}).catch(err => {
			sendRsp(res, status.INTERNAL_SERVER_ERROR, msg.err, err);
		});
}

const preUpdate = {
	removeImageFromS3: async(req, res) => {
		try {
			var id = req.params.id;
			var findId = await User.findById(id)
			var params = {
				Bucket: config.s3FileUpload.bucket,
				Delete: {
					Objects: [{
						Key: decodeURIComponent(findId.profile_pic)
					}]
				}
			};
			s3delete(params, function(err, resp) {
				if (err) {
					console.log("error ", err);
				} else {
					console.log("resp", resp)
					return;
				}
			});
		} catch (err) {
			sendRsp(res, status.INTERNAL_SERVER_ERROR, msg.err, err);
		}
	}
}

//updating users
//Input:Object Ex:{"name:String,age:Integer"}
//Output: object updated
exports.update = async function(req, res) {
	try {
		req.checkBody('name', 'Missing Query Param').notEmpty();
		req.checkBody('age', 'Missing Query Param').notEmpty();
		var errors = req.validationErrors();
		if (errors) {
			sendRsp(res, status.BAD_REQUEST, msg.err, errors);
			return;
		}
		var userObj = {};
		var addScore = {};
		var addDevice = {};
		var devArr = [];
		var _id = req.params.id;
		if (req.files) {
			await preUpdate['removeImageFromS3'](req, res)
			var fileArr = Object.keys(req.files);
			await Promise.all(fileArr.map(async(image) => {
				if (image == 'profile') {
					var pic = await upload.fileUpload(req, res, resource, image)
					userObj.profile_pic = pic;
				}
			}))
		}
		let pattenCheck = req.body.email;
		var mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var checkMail = await mailFormat.test(String(pattenCheck).toLowerCase());
		if (checkMail == true) {
			userObj.email = req.body.email;
			userObj.email_verified = true
		} else {
			return sendRsp(res, 409, "EmailNotVaild")
		}
		addDevice.device_type = req.body.device_type;
		addDevice.dev_token = req.body.dev_token;
		devArr.push(addDevice);
		userObj.devices = devArr;
		userObj.name = req.body.name;
		userObj.age = req.body.age;
		userObj.gender = req.body.gender;
		userObj.provider = req.body.provider;
		userObj.level = req.body.level;
		userObj.current_game = req.body.current_game;
		userObj.connected_friends = req.body.connected_friends;
		addScore.speed = req.body.speed;
		addScore.memory = req.body.memory;
		addScore.concentration = req.body.concentration;
		addScore.problem_solving = req.body.problem_solving;
		addScore.accuracy = req.body.accuracy;
		addScore.visual = req.body.visual;
		userObj.score = addScore;
		userObj.overall_score = req.body.overall_score;
		userObj.achievements = req.body.achievements;
		userObj.country = req.body.country;
		var users = await User.findByIdAndUpdate({
			_id
		}, userObj)
		sendRsp(res, status.OK, msg.update, users);
	} catch (err) {
		sendRsp(res, status.INTERNAL_SERVER_ERROR, msg.err, err);
	}
}

//update user devices
//input:{device_type,dev_token}
//output:updated
exports.deviceRegister = async function(req, res) {
	try {
		req.checkBody('device_type', 'Missing Query Param').notEmpty();
		req.checkBody('dev_token', 'Missing Query Param').notEmpty();
		var errors = req.validationErrors();
		if (errors) {
			sendRsp(res, status.BAD_REQUEST, msg.err, errors);
			return;
		}
		var findToken = await User.findOne({
			_id: req.params.id
		})
		var checkToken = await _.find(findToken.devices, (device) => {
			return device.dev_token == req.body.dev_token
		})
		if (!checkToken) {
			var updateUser = await User.update({
				_id: req.params.id
			}, {
				$push: {
					devices: {
						device_type: req.body.device_type,
						dev_token: req.body.dev_token,
						registered_at: new Date()
					}
				}
			})
			sendRsp(res, status.OK, msg.update);
		} else {
			sendRsp(res, status.OK, msg.update);
		}
	} catch (err) {
		console.log(err)
		sendRsp(res, status.INTERNAL_SERVER_ERROR, msg.err, err);
	}
}

//get all users name and ids
exports.allUser = function(req, res) {
	var query = {};
	if (req.query.name) {
		var queryValue = req.query.name;
		var value = new RegExp(".*" + queryValue, "i");
		query.name = {
			$regex: value
		}
	}
	var options = {
		limit: globalLimit.globalRowsLimit,
		skip: 0
	};
	if (req.query.limit != undefined)
		options.limit = parseInt(req.query.limit);
	if (req.query.offset != undefined)
		options.skip = parseInt(req.query.offset);
	if (req.query.limit < 0 || req.query.limit > options.limit) {
		req.query.limit = options.limit;
	}
	User.find(query, {
			name: 1,
			id: 1
		}, options)
		.then(user => {
			sendRsp(res, status.OK, msg.get, {
				"user": user
			});

		}).catch(err => {
			sendRsp(res, status.INTERNAL_SERVER_ERROR, msg.err, err);
		});
}


//checkAvalible users
//input:"ObjectId"
//output:ok(or)conflicts
exports.userCheck = function(req, res) {
	console.log("body", req.body.name)
	User.find({
			name: req.body.name
		})
		.then(data => {
			if (data.length > 0) {
				sendRsp(res, status.CONFLICT, msg.exist)

			} else {
				sendRsp(res, status.OK, msg.get);
			}
		}).catch(err => {
			sendRsp(res, status.INTERNAL_SERVER_ERROR, msg.err, err);
		})
}


//userStatus updated
//input:"ObjectId"
//output:updated
exports.userUpdate = function(req, res) {
	User.findOne({
		_id: req.body.id
	}).then(user => {
		user.status = user.status == 'INACTIVE' ? 'ACTIVE' : 'INACTIVE';
		user.save().then(userSaved => {
			sendRsp(res, status.OK, 'UserStatus Updated');
		}).catch(err => {
			sendRsp(res, status.INTERNAL_SERVER_ERROR, msg.err, err);
		});
	}).catch(err => {
		sendRsp(res, status.CONFLICT, "UserNotMatch", err);
	});
}


//userConnect to another user as a friend
//input:"name,objectId"
//output:user added
// exports.connections = async function(req, res) {
// 	try {
// 		var findUser = await User.findOne({
// 			name: req.body.name
// 		})
// 		var connect = await _.find(findUser.connected_friends, (friends) => {
// 			return friends == req.body.id
// 		})
// 		if (connect) {
// 			User.update({
// 				name: req.body.name
// 			}, {
// 				$pull: {
// 					connected_friends: {
// 						$in: [connect]
// 					}
// 				}
// 			}).then((user) => {
// 				sendRsp(res, status.OK, msg.remove, user);
// 				console.log(user, "user removed successfully")
// 			})
// 		} else {
// 			console.log('comm')
// 			User.update({
// 				name: req.body.name
// 			}, {
// 				$push: {
// 					connected_friends: req.body.id

// 				}
// 			}).then((user) => {
// 				sendRsp(res, status.OK, msg.add, user);
// 				console.log(user, "user added successfully")
// 			})
// 		}
// 	} catch (err) {
// 		sendRsp(res, status.INTERNAL_SERVER_ERROR, msg.err, err);
// 	}
// }

//delete users
//input:"ObjectId"
//outout:deleted
exports.softDelete = function(req, res) {
	Game.findOneAndUpdate({
		_id: req.params.id
	}, {
		"deleted": true
	}).then(data => {
		sendRsp(res, status.OK, msg.delete);
	}).catch(err => {
		sendRsp(res, status.INTERNAL_SERVER_ERROR, msg.err, err);
	})
}


exports.connectFriends = async function(req, res) {
	try {
		var findUser = await User.findOne({
			name: req.body.name
		})
		var connect = await _.find(findUser.connected_friends, (friends) => {
			return friends.user == req.body.id
		})

		if (connect) {
			sendRsp(res, status.OK, "User Already Exits");
		} else {
			let reqRecivingObj = {
				user: findUser._id,
				req_by: findUser._id
			}
			var updateRecivingFriends = await User.findOneAndUpdate({
				_id: req.body.id
			}, {
				$push: {
					connected_friends: reqRecivingObj

				}
			})
			let reqSentObj = {
				user: req.body.id,
				status: 2,
				ref_code: Math.floor(1000 + Math.random() * 9000),
			}
			var updateSentFriends = await User.findOneAndUpdate({
				_id: findUser._id
			}, {
				$push: {
					connected_friends: reqSentObj

				}
			})

			await sendNotification(updateRecivingFriends, reqSentObj, updateSentFriends)
			sendRsp(res, status.OK, "request successfully Sent");
		}
	} catch (err) {
		console.log("errrr", err)
		sendRsp(res, status.INTERNAL_SERVER_ERROR, msg.err, err);
	}
}


exports.acceptRejectFriend = async function(req, res) {
	try {
		var findUser = await User.findOne({
			name: req.body.name
		})
		var matchCode = await _.find(findUser.connected_friends, (findCode) => {
			return findCode.ref_code === req.body.code
		})
		if (!matchCode) {
			return sendRsp(res, status.OK, "Invalid Status Code");
		}
		if (matchCode.status != 3 && matchCode.status != 4) {
			var acceptRejectSender = await User.update({
				"_id": req.params.id,
				"connected_friends.user": findUser._id
			}, {

				"connected_friends.$.status": req.body.status
			})
			var acceptRejectReciver = await User.update({
				"_id": findUser._id,
				"connected_friends.ref_code": req.body.code
			}, {

				"connected_friends.$.status": req.body.status
			})
			sendRsp(res, status.OK, msg.get);
		} else {
			return sendRsp(res, status.OK, "Already requested");
		}

	} catch (err) {
		console.log("err", err)
		sendRsp(res, status.INTERNAL_SERVER_ERROR, msg.err, err);
	}
}


const sendNotification = async(reciver, reqSentObj, sender) => {
	try {
		var androidDevToken;
		var iosDevToken;
		var device = reciver.devices
		if (device.length > 0) {
			device.forEach(function(users) {
				if (users.device_type == 1) {
					androidDevToken = users.dev_token
				} else if (users.device_type == 2) {
					iosDevToken = users.dev_token
				}
			})
		}
		var devTokens = _.concat(androidDevToken, iosDevToken);
		var Message = notifyObj.NOTIFICATION_TO_USER.description;
		Message = Message.replace('%REF_CODE%', reqSentObj.ref_code);
		Message = Message.replace('%NAME%', reciver.name);
		Message = Message.replace('%REQUESTED_NAME%', sender.name);

		// //frame payload
		var payload = {
			data: {
				title: notifyObj.NOTIFICATION_TO_USER.title,
				desc: Message,
				type: 'Individual'
			}
		};
		console.log('payload', payload)

		// //frame the send and reciver id
		var notificationResource = {
			from: sender._id,
			to: reciver._id,
		}
		var notification = {
			devTokens: devTokens,
			payload: payload,
		}
		notificationService.createNotify(payload, notificationResource, async function(err, notify) {
			//sending notifications
			// await pushNotification.FCMPushNotification(notification.devTokens, notification.payload, function(err, response) {
			// 	if (err) {
			// 		console.log("push Notificaiton not send", err);
			// 	} else {
			// 		console.log("push Notificaiton  send successfully");
			// 	}
			// })
			return;
		})
	} catch (err) {
		console.log("err", err)
		sendRsp(res, status.INTERNAL_SERVER_ERROR, msg.err, err);
	}
}


exports.sendOtp = async function(req, res) {
	try {
		var findMail = await User.findOne({
			email: req.body.email
		})
		if (!findMail) {
			return sendRsp(res, 404, "email not found");
		} else {
			var otpGenrate = Math.floor(1000 + Math.random() * 9000)
			var Message = config.email_msg.html
			Message = Message.replace('%OTP%', otpGenrate);
			Message = Message.replace('%NAME%', findMail.name);
			var emailObj = {
				html: Message,
				createTextFromHtml: true,
				from: config.email_config.SMTP_FROM,
				to: req.body.email,
				subject: config.email_msg.sub
			};
			agenda.now(config.jobs.emailNotifications, {
				"email": emailObj
			})
			findMail.otp = otpGenrate;
			findMail.otp_verified = false;
			var saveData = await findMail.save();
			return sendRsp(res, status.OK, "Email send");
		}

	} catch (err) {
		console.log("errrr", err)
		sendRsp(res, status.INTERNAL_SERVER_ERROR, msg.err, err)
	}
}


exports.verifyOtp = function(req, res) {

	User.findOne({
			email: req.body.email
		}).populate(references['users'])
		.exec()
		.then(findUser => {
			if (!findUser) {
				return sendRsp(res, 404, "User not found");
			} else {
				if (findUser.otp === req.body.otp) {
					findUser.otp_verified = true
					findUser.otp_verified_token_generated = new Date();
					findUser.save();
					return sendRsp(res, status.OK, msg.get, findUser)
				} else {
					return sendRsp(res, 404, "OTP MISSMATCH");
				}
			}
		}).catch(err => {
			console.log("err", err)
			sendRsp(res, status.INTERNAL_SERVER_ERROR, msg.err, err);
		})
}


exports.resendOtp = async function(req, res) {
	try {
		var findUser = await User.findOne({
			email: req.body.email
		})
		if (!findUser) {
			return sendRsp(res, 404, "user not found");
		} else {
			var otpGenrate = Math.floor(1000 + Math.random() * 9000)
			var Message = config.email_msg.html
			Message = Message.replace('%OTP%', otpGenrate);
			Message = Message.replace('%NAME%', findUser.name);
			var emailObj = {
				html: Message,
				createTextFromHtml: true,
				from: config.email_config.SMTP_FROM,
				to: req.body.email,
				subject: config.email_msg.sub2
			};
			agenda.now(config.jobs.emailNotifications, {
				"email": emailObj
			})
			findUser.otp = otpGenrate;
			findUser.otp_verified = false;
			findUser.otp_verified_token_generated = new Date();
			var saveData = await findUser.save();
			return sendRsp(res, status.OK, "Email Re-send");
		}

	} catch (err) {
		console.log("err", err)
		sendRsp(res, status.INTERNAL_SERVER_ERROR, msg.err, err);
	}
}