<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import prettyBytes from 'pretty-bytes';
	import Button from '../../../Button.svelte';
	import Navbar from '../../../Navbar.svelte';
</script>

<Navbar />
<div class="p-2 text-center align-middle dark:text-white h-full">
	<h1 class="text-4xl">{data.name}</h1>
	<h3 class="text-xl">Size: {prettyBytes(data.size)}</h3>
	<h3 class="text-xl pb-2">Type: {data.type}</h3>
	<a href="/get/{data.id}/{data.name}" download>
		<Button>Download</Button>
	</a>
</div>
