const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const _ = require('lodash');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { writeFile, readFile } = require('fs').promises;

const app = express();
const port = process.env.PORT || 5000;

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

// enables access to body in request
app.use(bodyParser.json());

// logger
// TODO: save log to file
app.use(morgan('dev'));

app.use(cors());

app.post('/api/pdf/upload', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            pdf_file = req.files.pdf_file;
            console.log(pdf_file);
            await writeFile(`./storage/pdf/${pdf_file.name}`, pdf_file.data); 
            
            //send response
            res.send({
                status: true,
                message: 'PDF File is uploaded',
                data: {
                    name: pdf_file.name,
                    mimetype: pdf_file.mimetype,
                    size: pdf_file.size
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

// Graceful shutdown
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