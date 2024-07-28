import * as fs from 'fs';

export async function GET({ request, params }) {
	if (!fs.existsSync(`./files/${params.id}/${params.filename}`)) {
		return {
			status: 404
		};
	}
	const name = params.filename;
	const id = params.id;
	const file = fs.readFileSync(`./files/${id}/${name}`);
	const stream = new ReadableStream({
		start(controller) {
			controller.enqueue(file);
			controller.close();
		}
	});
	const headers = new Headers();
	headers.set('Content-Disposition', `attachment; filename="${name}"`);
	return new Response(stream, {
		headers,
		status: 200
	});
}
