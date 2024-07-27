import express from 'express';
import fs from 'fs';
import multer from 'multer';
const upload = multer();
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

const app = express();

app.put('/*', express.raw({ type: () => true, limit: '5gb' }), (req, res) => {
	let file;
	if (req.headers?.['content-type']?.includes('multipart/form-data')) {
		file = req.file;
	} else {
		file = req.body;
	}
	const fileName = req.path.slice(1);
	if (!fileName) {
		return res.status(400).send('No file name provided in the URL.');
	}
	const id = Math.random().toString(36).substr(2, 5);
	fs.mkdirSync(`./files/${id}`, { recursive: true });
	const fileData = Buffer.isBuffer(file) ? file : Buffer.from(new Uint8Array(file));
	fs.writeFile(`./files/${id}/${fileName}`, fileData, (err) => {
		if (err) {
			return res.status(500).send(err.message);
		}
		res.status(200).send(`${config.urlRoot}/${id}/${fileName}`);
	});
});

app.put('/form/*', upload.single('file'), (req, res) => {
	console.log('form request');
	const file = req.file;
	const fileName = req.path.slice(6);
	console.log(fileName);
	if (!fileName) {
		return res.status(400).send('No file name provided in the URL.');
	}
	if (fileName.includes('/form')) {
		fileName.replace('/form', '');
	}
	const id = Math.random().toString(36).substr(2, 5);
	fs.mkdirSync(`./files/${id}`, { recursive: true });
	fs.writeFile(`./files/${id}/${fileName}`, file.buffer, (err) => {
		if (err) {
			return res.status(500).send(err.message);
		}
		res.status(200).send(`${config.urlRoot}/${id}/${fileName}`);
	});
});

app.listen(4000, () => {
	console.log('Server is running on port 4000');
});
