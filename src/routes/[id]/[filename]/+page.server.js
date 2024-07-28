import { error } from '@sveltejs/kit';
import * as fs from 'fs';
import mime from 'mime';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	let name = params.filename.toLowerCase();
	if (fs.existsSync(`./files/${params.id}/${name}`)) {
		const stat = fs.statSync(`./files/${params.id}/${name}`);
		return {
			name,
			size: stat.size,
			modified: stat.mtime,
			id: params.id,
			type: mime.getType(`./files/${params.id}/${name}`)
		};
	}

	error(404, 'Not found');
}
