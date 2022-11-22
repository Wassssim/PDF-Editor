const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const _ = require('lodash');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { writeFile } = require('fs').promises;

const app = express();
const port = process.env.PORT || 3000;

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

// enables access to body in request
app.use(bodyParser.json());

// logger
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
        res.send({
            status: false,
            message: err
        })
    }
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});