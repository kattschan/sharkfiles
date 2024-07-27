<script>
	let buttonProps = {
		class: [
			'rounded-md bg-rose-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
			$$restProps.class
		]
	};
</script>

<button on:click {...buttonProps}><slot /></button>
