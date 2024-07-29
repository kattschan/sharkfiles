<script>
	import { onMount } from 'svelte';
	import prettyBytes from 'pretty-bytes';
	import Button from '../Button.svelte';
	import NavbarHome from '../NavbarHome.svelte';
	import Modal from '../Modal.svelte';
	import { dev } from '$app/environment';
	let submitURL = '/form';
	if (dev) {
		submitURL = 'http://localhost:4000/form';
	}
	let files = [];
	let queue = [];
	let error = {
		status: false,
		message: ''
	};
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
			xhr.open('PUT', `${submitURL}/${file.name}`, true);
			xhr.upload.onprogress = (e) => {
				file.progress = (e.loaded / e.total) * 100;
				queue = queue;
			};
			xhr.onload = () => {
				if (xhr.status === 200) {
					console.log('Uploaded');
					file.url = `${xhr.responseText}`;
					queue = queue;
				} else {
					error.status = true;
					error.message = xhr.status + ' ' + xhr.statusText + '\n\n' + xhr.responseText;
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
<div class="border-2 border-dashed border-gray-300 rounded-lg p-4 m-4 text-center">
	<p class="text-gray-500 dark:text-gray-300">Drag & drop your files here</p>
	<p class="text-gray-500 dark:text-gray-300">or</p>
	<Button on:click={() => document.querySelector('input[type="file"]').click()}>
		Select Files
	</Button>
	<div class="flex flex-row justify-center">
		{#each queue as file}
			<div
				class="m-2 rounded-sm border-2 dark:bg-slate-700 dark:text-white p-2 h-auto w-48 uploadedFile"
			>
				{#if file.url}
					<a href={file.url} target="_blank"> <p class="truncate underline">{file.name}</p></a>
				{:else}
					<p class="truncate">{file.name}</p>
				{/if}
				<p>{prettyBytes(file.size)}</p>
				<div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
					<div
						class="bg-rose-600 h-2.5 rounded-full"
						style="width: {file.progress}%"
						role="progressbar"
					></div>
				</div>
			</div>
		{/each}
	</div>
</div>

{#if error.status}
	<Modal title="Error" message={error.message} />
{/if}
<h1 class="text-2xl font-medium p-4 dark:text-white">Thanks for using sharkfiles!</h1>
<p class="p-4 dark:text-white">
	We're a free, open-source file sharing service with awesome features. To upload, you can drag &
	drop above, select the button, or:
</p>
<pre class="p-2 bg-gray-200 dark:bg-gray-700 rounded dark:text-white">
	curl -T file.txt https://sharkfiles.kattschan.co.uk/file.txt
</pre>
<p class="p-4 dark:text-white">
	The upload will process and return a URL you can use to access your file. You can upload files up
	to 5GB and they will expire after one week. If you want extra peace of mind with your files, or
	you want to change the limits, you can host sharkfiles yourself, with instructions coming soon to
	our GitHub. Thanks for using sharkfiles! :3
</p>
