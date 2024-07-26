import express from 'express';
import multer from 'multer';
const app = express();
const port = 3000;

app.put('/*', (req, res) => {
	const file = req.body;
	console.log('file ', file);
	res.send('PUT request');
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
