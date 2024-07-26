/** @type {import('./$types').RequestHandler} */

export function PUT({ request }) {
    console.log('Server received a POST request');
    request.text().then(console.log);
    //TODO what is the correct way to do this without printing binary data to console?
    // return status 200
    return new Response('OK', { status: 200 });
}