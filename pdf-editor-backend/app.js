require('dotenv').config()
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const _ = require('lodash'); // TODO: check if this is still used
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const multer = require('multer');
const { writeFile, readFile } = require('fs').promises;
const PdfFile = require('./models/PdfFile');
const mongoose = require('mongoose');


// mongodb
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("connected to mongodb"))
    .catch((err) => console.error("Error connecting to mongodb: ", err.message));

const app = express();
const port = process.env.PORT || 3000;

// enable files upload
// TODO: decide between multer and fileUpload
//const upload = multer({dest: "storage/uploads"});

app.use(fileUpload({
    createParentPath: true
}));

// enables access to body in request
app.use(bodyParser.json());

// logger
// TODO: save log to file
app.use(morgan('dev'));

app.use(cors());

app.post('/api/pdf-file/upload', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            pdf_file = req.files.pdf_file;
            // TODO randomize file names
            // save file to storage
            await writeFile(`./storage/uploads/${pdf_file.name}`, pdf_file.data); 
            fileData = {
                path: `storage/uploads/${pdf_file.name}`,
                originalName: pdf_file.name
            };

            // add new entry to databse
            const pdfFile = await PdfFile.create(fileData);
            
            //send response
            res.send({
                status: true,
                message: 'PDF File is uploaded',
                data: {
                    id: pdfFile.id,
                    name: pdf_file.name,
                    mimetype: pdf_file.mimetype,
                    size: pdf_file.size,
                    link: `${req.headers.host}/api/pdf-file/${pdfFile.id}`
                }
            });        
        }
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err
        });
    }
});


// download pdf
app.get('/api/pdf-file/:id', async (req, res) => {
    // TODO: handle when id doesn't exist
    try {
        const pdfFile = await PdfFile.findById(req.params.id);
        console.log(pdfFile)
        res.download(pdfFile.path, pdfFile.originalName);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({
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
        res.send({
            status: true,
            data: JSON.parse(data)
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err
        });
    }
})


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
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