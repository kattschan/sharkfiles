import { error } from '@sveltejs/kit';
import * as fs from 'fs';
import mime from 'mime';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	if (fs.existsSync(`./files/${params.id}/${params.filename}`)) {
		const stat = fs.statSync(`./files/${params.id}/${params.filename}`);
		return {
			name: params.filename,
			size: stat.size,
			modified: stat.mtime,
			id: params.id,
			type: mime.getType(`./files/${params.id}/${params.filename}`)
		};
	}

	error(404, 'Not found');
}
