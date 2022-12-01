require('dotenv').config()
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const _ = require('lodash'); // TODO: check if this is still used
const bodyParser = require('body-parser');
const morgan = require('morgan');
const multer = require('multer');
const { writeFile, readFile } = require('fs').promises;
const PdfFile = require('./models/PdfFile');
const mongoose = require('mongoose');
const logger = require('./logging/logger');

// mongodb
mongoose.connect(process.env.DATABASE_URL)
    .then(() => logger.info("connected to mongodb"))
    .catch((err) => logger.error("Error connecting to mongodb: ", err.message));

const app = express();
const port = process.env.PORT || 3000;

// enable files upload
// TODO: decide between multer and fileUpload
const upload = multer({dest: "storage/uploads"});

/*app.use(fileUpload({
    createParentPath: true
}));*/

// enables access to body in request
app.use(bodyParser.json());

// logger
// TODO: save log to file
app.use(morgan('dev'));

app.use(cors({
    origin: '*'
}));

const whitelist = [
    'application/pdf'
];

app.post('/api/pdf-file/upload', upload.single("pdf_file"), async (req, res) => {
    try {
        logger.debug("uploading pdf file: ", req.file);
        if (!req.file) {
            return res.send({
                status: false,
                message: 'No file uploaded'
            });
        }

        if (!whitelist.includes(req.file.mimetype)) {
            return res.send({
                status: false,
                message: 'Invalid file type'
            });
        }

        // save file to storage
        fileData = {
            path: req.file.path,
            originalName: req.file.originalname
        };

        // add new entry to databse
        const pdfFile = await PdfFile.create(fileData);
        
        //send response
        return res.send({
            status: true,
            message: 'PDF File is uploaded',
            data: {
                id: pdfFile.id,
                name: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size,
                link: `${req.headers.host}/api/pdf-file/${pdfFile.id}` // TODO: check if this is correct
            }
        });        
        
    } catch (err) {
        logger.error(err);
        return res.status(500).send({
            status: false,
            message: err
        });
    }
});


// download pdf
app.get('/api/pdf-file/:id', async (req, res) => {
    try {
        // check if file exists
        const count = await PdfFile.countDocuments({_id: req.params.id});

        if (count === 0)
            return res.status(404).send({
                status: false,
                message: "File not found"
            });

        // get file from database
        const pdfFile = await PdfFile.findById(req.params.id);

        return res.download(pdfFile.path, pdfFile.originalName);
    } catch (err) {
        logger.error(err);
        return res.status(500).send({
            status: false
        });
    }
})

// translations
app.get('/api/assets/i18n/:lang/:ns', async (req, res) => {
    const { ns, lang } = req.params;
    const path = `./storage/i18n/${ns}/${lang}.json`;

    try {
        const data = await readFile(path, 'utf8');
        return res.send({
            status: true,
            data: JSON.parse(data)
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: err
        });
    }
});

// run server
app.listen(port, () => {
    logger.info(`app listening at http://localhost:${port}`);
});

// TODO: Graceful shutdown
/*function closeGracefully(signal) {
    console.log(`Received signal to terminate: ${signal}`);
  
    server.close(() => {
      // await db.close() if we have a db connection in this app
      // await other things we should cleanup nicely
      console.log('Http server closed.');
      process.exit(0);
    });
  }
  
process.on('SIGINT', closeGracefully);
process.on('SIGTERM', closeGracefully);*/