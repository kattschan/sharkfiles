import express from 'express';
import fs from 'fs';
import multer from 'multer';
import cors from 'cors';

const upload = multer();
const config = JSON.parse(fs.readFileSync('src/lib/config.json', 'utf-8'));

const app = express();
app.use(cors());

app.put('/form/*', upload.single('file'), (req, res) => {
	console.log('form request');
	const file = req.file;
	let fileName = req.path.slice(6);
	console.log(fileName);
	if (!fileName) {
		return res.status(400).send('No file name provided in the URL.');
	}
	fileName = fileName.replace(/%20/g, '-');
	fileName = fileName.toLowerCase();
	const id = Math.random().toString(36).substr(2, 5);
	fs.mkdirSync(`./files/${id}`, { recursive: true });
	fs.writeFile(`./files/${id}/${fileName}`, file.buffer, (err) => {
		if (err) {
			return res
				.status(418)
				.send('Error writing file: ', err.message, '\n\nIntended file name: ', fileName);
		}
		res.status(200).send(`${config.urlRoot}/${id}/${fileName}`);
	});
});

app.put('/*', express.raw({ type: () => true, limit: '5gb' }), (req, res) => {
	let file;
	if (req.headers?.['content-type']?.includes('multipart/form-data')) {
		file = req.file;
	} else {
		file = req.body;
	}
	let fileName = req.path.slice(1);
	if (!fileName) {
		return res.status(400).send('No file name provided in the URL.');
	}
	fileName = encodeURIComponent(fileName);
	fileName = fileName.replace(/%20/g, '-');
	fileName = fileName.toLowerCase();
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
setTimeout(() => {
	// Delete files older than 1 week
	const folders = fs.readdirSync('./files');
	for (const folder of folders) {
		const files = fs.readdirSync(`./files/${folder}`);
		const stats = fs.statSync(`./files/${folder}/${files[0]}`);
		if (Date.now() - stats.mtime > 604800000) {
			fs.unlinkSync(`./files/${folder}/${files[0]}`);
		}
	}
}, 3600000);

app.listen(4000, () => {
	console.log('Server is running on port 4000');
});
