import express from 'express';
import fs from 'fs';
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

const app = express();

// Middleware to parse raw data
app.use(express.raw({ type: () => true, limit: '5gb' }));

app.put('/*', (req, res) => {
	const fileName = req.path.slice(1);
	if (!fileName) {
		return res.status(400).send('No file name provided in the URL.');
	}
	const id = Math.random().toString(36).substr(2, 5);
	fs.mkdirSync(`./files/${id}`, { recursive: true });
	console.log(req.body);
	const fileData = Buffer.isBuffer(req.body) ? req.body : Buffer.from(new Uint8Array(req.body));
	fs.writeFile(`./files/${id}/${fileName}`, fileData, (err) => {
		if (err) {
			return res.status(500).send(err.message);
		}
		res.status(200).send(`${config.urlRoot}/${id}/${fileName}`);
	});
});

app.listen(4000, () => {
	console.log('Server is running on port 4000');
});
