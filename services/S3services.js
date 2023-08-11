const AWS = require('aws-sdk');

const uploadToS3=(data, filename)=>{
    const BUCKET_NAME= 'expensetrackerapp7';
    const IAM_USER_KEY= 'AKIAYNY5G2H5XRMD2YER';
    const IAM_USER_SECRET= '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';

    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
    })

        var params= {
            Bucket : BUCKET_NAME,
            Key : filename,
            Body:data,
            ACL: 'public-read'
        }
        return new Promise((resolve, reject)=>{
            s3bucket.upload(params,(err, S3response)=> {
                if(err){
                    console.log('something went wrong', err)
                    reject(err)  
                }
                else{
                    console.log('success')
                    resolve(S3response.Location);
                }
            })
        })
      

}

module.exports={
    uploadToS3
}