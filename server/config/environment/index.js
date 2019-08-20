/*eslint no-process-env:0*/

import path from 'path';
import _ from 'lodash';

function requiredProcessEnv(name) {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}
var baseUrl = process.env.DOMAIN;
// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(`${__dirname}/../../..`),

    // dev client port
    clientPort: process.env.CLIENT_PORT || 3000,

    // Server port
    port: process.env.PORT || 9000,

    // Server IP
    ip: process.env.IP || '0.0.0.0',

    // Should we populate the DB with sample data?
    seedDB: false,

    // Secret for session, you will want to change this and make it an environment variable
    globalRowsLimit: parseInt(process.env.GLOBAL_ROW_LIMIT) || 25,

    // secrets: {
    //     session: 'braincubate-api-secret'
    // },
    fileSize: process.env.fileSize || 500 * 1000,

    auth: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        saUrl: baseUrl + "/auth/sa-token"
    },
    token: {
        expiresInMinutes: process.env.TOKEN_EXPIRES_IN_MIN || 2
    },
    base_auth: {
        id: process.env.BASE_AUTH_ID || '5bd40bcaedc69a1bde706c1f',
        secret: process.env.BASE_AUTH_SECRET || 'jZBKJaYVYCKM/Ej5p3LHdnoTScipCAFy6Uyh2u/qhc0='
    },
    jobs: {
        "emailNotifications": "emailNotifications",
        "resendOtp": "resendOtp"
    },

    email_config: {
        "SMTP_HOST": 'mail.ibytecode.com',
        "SMTP_PORT": 587,
        "SMTP_AUTH_USER": 'tester@ibytecode.com',
        "SMTP_AUTH_PASS": 'Ibytecode_ibc0&',
        "SMTP_FROM": 'postmaster@ibytecode.com'
    },
    email_msg:{
        "html": "Hello %NAME% Your otp is %OTP%",
        "sub": "Send-OTP",
        "sub2":"Resend-OTP"
    },
    s3FileUpload: {
        keyId: process.env.S3_KEY_ID,
        secret: process.env.S3_SECRET,
        bucket: process.env.S3_BUCKET,
        region: process.env.S3_REGION,
        userskeyPath: "braincubate/announcements/",
    },
    secrets: {
        session: 'braincubate-api-secret',
        globalAccessToken: process.env.GLOBAL_ACCESS_TOKEN_SECRET,
        accessToken: process.env.ACCESS_TOKEN_SECRET,
        refreshToken: process.env.REFRESH_TOKEN_SECRET,
        refTokenKey: process.env.REFRESH_TOKEN_KEY_SECRET
    },
    // MongoDB connection options
    mongo: {
        options: {
            useNewUrlParser: true
        }
    }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require('./shared').default,
    require(`./${process.env.NODE_ENV}.js`) || {});