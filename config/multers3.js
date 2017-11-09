const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
aws.config.update({
    secretAccessKey: SECRETACCESSKEYAMZ,
    accessKeyId: ACCESSKEYID,
    region: 'eu-west-2'
});
var s3 = new aws.S3({
    apiVersion: '2012-10-17',
    params: { Bucket: 'contactfreelance' }
});

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'contactfreelance/images',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        }
    })
});
module.exports = upload;