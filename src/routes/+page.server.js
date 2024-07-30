import { dev } from '$app/environment';
import { ORIGIN } from '$env/static/private';
/** @type {import('./$types').PageServerLoad} */
export async function load() {
	if (dev || !ORIGIN) {
		return { prod: false };
	} else {
		return { prod: true };
	}
}
