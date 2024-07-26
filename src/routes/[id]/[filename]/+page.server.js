import { error } from '@sveltejs/kit';
import * as fs from 'fs';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	if (fs.existsSync(`./files/${params.id}/${params.filename}`)) {
		const stat = fs.statSync(`./files/${params.id}/${params.filename}`);
		return {
			name: params.filename,
			size: stat.size,
			modified: stat.mtime,
			id: params.id
		};
	}

	error(404, 'Not found');
}
