const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
        const form = new formidable.IncomingForm();

        // Specify the directory where uploaded files will be stored
        form.uploadDir = path.join(__dirname, 'uploads');

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error(err);
                return;
            }
            var originalFilename, oldPath;
            console.log(files)
            const uploadedFiles = files.file;

            uploadedFiles.forEach((uploadedFile) => {
                originalFilename = uploadedFile.originalFilename;
                oldPath = uploadedFile.filepath;
                console.log(originalFilename);
            });
            const newPath = path.join(form.uploadDir, originalFilename);

            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('File uploaded successfully');
            });
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
      <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="file">
        <input type="submit" value="Upload File">
      </form>
    `);
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});