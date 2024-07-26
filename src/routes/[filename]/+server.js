/** @type {import('./$types').RequestHandler} */
import * as fs from 'fs';
import * as config from '../../../config.json';
export async function PUT({ request, params }) {
	console.log('Server received a POST request');
	console.log(await request);
	const form = await request.formData();
	const file = await form.get('file').arrayBuffer();
	const id = Math.random().toString(36).substr(2, 5);
	fs.mkdirSync(`./files/${id}`, { recursive: true });
	fs.writeFileSync(`./files/${id}/${params.filename}`, Buffer.from(file));
	// return status 200
	return new Response(`${config.urlRoot}/${id}/${params.filename}`, { status: 200 });
}

// TODO curl doesn't provide a way to see the file type, so formData won't work. fix.
