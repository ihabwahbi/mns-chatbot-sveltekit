<script>
	import Header from './Header.svelte';
	// You might import a Chat component here if you have one,
	// or directly implement chat logic in this script block.
	let show = false;
	function autoResize(event) {
		event.target.style.height = 'auto'; // Reset height to ensure accurate measurement
		event.target.style.height = event.target.scrollHeight + 'px'; // Set new height based on scroll height
	}
</script>

<main class="flex flex-col h-[calc(100dvh)]">
	<Header />

	<div class="flex flex-grow justify-center bg-gradient-to-b from-cee5fd to-white">
		<div class="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
			<h1 class="text-5xl md:text-6xl mb-4 text-center">
				M&S <span class="text-slbBlue">AI</span> Assistant
			</h1>
			<p class="text-md md:text-lg text-gray-700 mb-6 text-center mx-2 sm:mx-4 md:mx-6 lg:mx-8">
				Explore this cutting-edge chatbot, delivering high-quality answers tailored to your needs.
				Type your question below.
			</p>
		</div>
		{#if show}
			<div class="w-full md:w-1/2 overflow-auto p-4">
				<!-- Chat messages -->
				<p>Message 1</p>
				<p>Message 2</p>
				<!-- Additional messages -->
			</div>
		{/if}
	</div>

	<!-- Input field and Send button at the bottom -->

	<div class="p-2 bg-white flex justify-center items-center md:p-4">
		<div class="relative w-full md:w-1/2">
			<textarea
				on:input={autoResize}
				class="appearance-none w-full bg-gray-100 text-gray-700 border-2 border-gray-300 rounded-3xl py-3 pl-4 pr-10 focus:outline-none focus:bg-white focus:border-slbBlues resize-none"
				rows="1"
				placeholder="Ask me anything..."
				style="overflow:hidden; max-height: 500px;"
			></textarea>
			<button
				class="absolute inset-y-1 right-2 flex items-center justify-center px-3 text-slbBlue"
				type="submit"
			>
				<!-- Adjusted px-3 for padding, ensures the button is centered -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
					<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
				</svg>
			</button>
		</div>
	</div>
</main>
