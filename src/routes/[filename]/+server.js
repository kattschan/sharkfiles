/** @type {import('./$types').RequestHandler} */
import * as fs from 'fs';
import * as config from '../../../config.json';

export async function PUT({ request, params }) {
	console.log('Server received a PUT request');
	const formData = await request.formData();
	const file = formData.get('file');
	if (!file) {
		return new Response('No file uploaded', { status: 400 });
	}
	const fileBuffer = Buffer.from(await file.arrayBuffer());
	console.log(fileBuffer.length);
	const id = Math.random().toString(36).substr(2, 5);
	fs.mkdirSync(`./files/${id}`, { recursive: true });
	const filename = params.filename;
	fs.writeFileSync(`./files/${id}/${filename}`, fileBuffer);
	return new Response(`${config.urlRoot}/${id}/${filename}`, { status: 200 });
}
