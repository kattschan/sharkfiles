<script>
	import { onMount } from 'svelte';
	let files = [];
	// when files changes
	$: {
		console.log([...files]);
	}
	onMount(() => {
		const input = document.querySelector('input[type="file"]');
		const dropArea = document.querySelector('.border-dashed');

		dropArea.addEventListener('dragover', (e) => {
			e.preventDefault();
			dropArea.classList.add('border-blue-500');
		});

		dropArea.addEventListener('dragleave', (e) => {
			e.preventDefault();
			dropArea.classList.remove('border-blue-500');
		});

		dropArea.addEventListener('drop', (e) => {
			e.preventDefault();
			dropArea.classList.remove('border-blue-500');
			files.push(e.dataTransfer.files);
			console.log(files);
		});

		dropArea.addEventListener('click', () => {
			input.click();
		});

		input.addEventListener('change', () => {
			files.push(input.files);
			console.log(files);
		});
	});
</script>

<input type="file" accept="*/*" class="hidden" multiple />
<h1 class="text-2xl font-semibold">Upload a File</h1>
<div class="border-2 border-dashed border-gray-300 rounded-lg p-4 m-4 text-center">
	<p class="text-gray-500">Drag & drop your files here</p>
	<p class="text-gray-500">or</p>
	<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
		Select Files
	</button>
	{#if files.length > 0}
		<ul>
			{#each [...files] as file}
				<li>{file.name}</li>
			{/each}
		</ul>
	{/if}
</div>

<input type="file" accept="*/*" class="hidden" multiple />
