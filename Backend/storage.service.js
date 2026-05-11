/// IMage kit 

const { File } = require("node:buffer");
globalThis.File = File;

const ImageKit = require("@imagekit/nodejs").default  // require

const client = new ImageKit({ // intialize imagekit
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function uploadFile({ buffer, fileName, folder = "" }) {

    const file = await client.files.upload({
        file: await ImageKit.toFile(Buffer.from(buffer)),
        fileName: fileName,
        folder
    })

    return file
}

module.exports = {uploadFile}