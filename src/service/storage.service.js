// SDK initialization

const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_publicKey,
    privateKey : process.env.IMAGEKIT_privateKey,
    urlEndpoint : process.env.IMAGEKIT_urlEndpoint
});

async function uploadFile(file, filename){
    const response = await imagekit.upload({
        file: file,
        fileName: filename,
        folder: "cohort-ai-social"
    })
    return response
}

module.exports = uploadFile;