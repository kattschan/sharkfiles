<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import prettyBytes from 'pretty-bytes';
</script>

<!--todo: UI :sob:-->
<div class="p-2">
	<h1>File: {data.name}</h1>
	<h1>Size: {prettyBytes(data.size)}</h1>
	<h1>Modified: {new Date(data.modified).toLocaleString()}</h1>
	<a href="/get/{data.id}/{data.name}" download>
		<button class="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded">
			Download
		</button>
	</a>
</div>
