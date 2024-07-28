<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import prettyBytes from 'pretty-bytes';
	import Button from '../../../Button.svelte';
	import Navbar from '../../../Navbar.svelte';
</script>

<Navbar />
<div class="p-2 text-center align-middle dark:text-white h-full">
	<h1 class="text-4xl">{decodeURIComponent(data.name)}</h1>
	<h1 class="text-xl">Size: {prettyBytes(data.size)}</h1>
	<h1 class="text-xl pb-2">Type: {data.type}</h1>
	<a href="/get/{data.id}/{data.name}" download>
		<Button>Download</Button>
	</a>
</div>
