import express from 'express';
import controller from './userController';
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var auth = require('../../auth/auth-service')

var router = express.Router();
// router.put('/connections',controller.connections)
router.post('/resend-otp',auth.isValid(),controller.resendOtp)
router.post('/verify-otp',auth.isValid(),controller.verifyOtp)
router.post('/send-otp',auth.isValid(),controller.sendOtp);
router.post('/check-available',auth.isValid(),controller.userCheck)
router.put('/update-status',auth.isSuperAdmin(),controller.userUpdate);
router.get('/all',auth.isValid(),controller.allUser);
router.get('/',auth.isValid(),controller.get);
router.post('/',multipartMiddleware,controller.create);
router.get('/:id',auth.isValid(),controller.show);
router.put('/connect-friend',auth.isValid(),controller.connectFriends);
router.put('/:id/connect-friend',auth.isValid(),controller.acceptRejectFriend);
router.put('/:id',auth.isValid(),multipartMiddleware,controller.update);
router.put('/:id/device-register',auth.isValid(),controller.deviceRegister);
router.delete('/:id',auth.isSuperAdmin(),controller.softDelete);

module.exports = router;