<script>
	import { onMount } from 'svelte';
	import prettyBytes from 'pretty-bytes';
	import Button from '../Button.svelte';
	import NavbarHome from '../NavbarHome.svelte';
	let files = [];
	let queue = [];
	$: {
		files.forEach((file) => {
			file.progress = 0;
			queue = [...queue, file];
			files = files.filter((f) => f !== file);
		});
		queue.forEach((file) => {
			if (file.progress != 0) {
				return;
			}
			const formData = new FormData();
			formData.append('file', file);
			const xhr = new XMLHttpRequest();
			xhr.open('PUT', `/form/${file.name}`, true);
			xhr.upload.onprogress = (e) => {
				file.progress = (e.loaded / e.total) * 100;
				queue = queue;
			};
			xhr.onload = () => {
				if (xhr.status === 200) {
					console.log('Uploaded');
					file.url = `${xhr.responseText}`;
					queue = queue;
				}
			};
			xhr.send(formData);
		});
	}
	onMount(() => {
		const input = document.querySelector('input[type="file"]');
		const dropArea = document.querySelector('.border-dashed');
		const dragOver = (e) => {
			e.preventDefault();
			dropArea.classList.add('border-rose-500');
		};
		const dragLeave = (e) => {
			e.preventDefault();
			dropArea.classList.remove('border-rose-500');
		};
		const drop = (e) => {
			e.preventDefault();
			dropArea.classList.remove('border-rose-500');
			files = [...files, ...e.dataTransfer.files];
		};
		dropArea.addEventListener('dragover', dragOver);
		dropArea.addEventListener('dragleave', dragLeave);
		dropArea.addEventListener('drop', drop);
		input.addEventListener('change', (e) => {
			files = [...files, ...e.target.files];
		});
	});
</script>

<NavbarHome />
<input type="file" accept="*/*" class="hidden" multiple />
<h1 class="text-2xl font-semibold dark:text-white px-4 pt-2 pb-3">Upload a File</h1>
<div class="border-2 border-dashed border-gray-300 rounded-lg p-4 m-4 mt-0 text-center">
	<p class="text-gray-500 dark:text-gray-300">Drag & drop your files here</p>
	<p class="text-gray-500 dark:text-gray-300">or</p>
	<Button on:click={() => document.querySelector('input[type="file"]').click()}>
		Select Files
	</Button>
	<div class="flex flex-row justify-center">
		{#each queue as file}
			<div class="m-2 rounded-sm border-2 dark:bg-slate-700 dark:text-white p-2 h-auto w-48">
				{#if file.url}
					<a href={file.url} target="_blank"> <p class="truncate underline">{file.name}</p></a>
				{:else}
					<p class="truncate">{file.name}</p>
				{/if}
				<p>{prettyBytes(file.size)}</p>
				<div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
					<div class="bg-rose-600 h-2.5 rounded-full" style="width: {file.progress}%"></div>
				</div>
			</div>
		{/each}
	</div>
</div>

<input type="file" accept="*/*" class="hidden" multiple />
