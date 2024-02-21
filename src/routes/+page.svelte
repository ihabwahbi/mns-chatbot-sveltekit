<script>
	import Header from './Header.svelte';
	import { onMount } from 'svelte';
	// You might import a Chat component here if you have one,
	// or directly implement chat logic in this script block.
	let show = false;
	function autoResize(event) {
		event.target.style.height = 'auto'; // Reset height to ensure accurate measurement
		event.target.style.height = event.target.scrollHeight + 'px'; // Set new height based on scroll height
	}

	let userMessage = ''; // To hold the input from the user
	let submittedMessage = '';
	let messages = []; // To store all messages displayed on the screen
	let startChat = false;
	let isLoading = false;

	async function handleSubmit() {
		isLoading = true;
		submittedMessage = userMessage;
		userMessage = '';
		if (!submittedMessage.trim()) {
			console.error('The message is empty.');
			// Update your UI to inform the user or return to exit the function early
			return;
		} // Prevent sending empty messages
		// Add the user's message to the messages array
		startChat = true;
		messages = [...messages, { sender: 'You', content: submittedMessage }];
		// Clear the input field after submitting
		// Specify the API URL
		const apiUrl =
			'https://mns-chatbot-backend.azurewebsites.net/api/mns-chatbot-function?code=tp9MuKM6kSVavitcJSBwvflu0-fZNS7dQiBGhvm9ur7LAzFu46AbcA==';
		try {
			// Start the POST request to the API
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ prompt: submittedMessage.trim() }) // Ensure userMessage is correctly sent as 'prompt'
			});

			if (!response.ok) {
				const errorDetails = await response.json(); // Read the response body
				console.error('API call failed:', errorDetails.message);
				// Display the error to the user here
				return; // Exit early since the API call failed
			}

			const data = await response.json(); // This should only be called if the response was OK and not previously read
			// Continue processing the successful response

			// Assuming the API response has the format { sender: 'AI Assistant', content: 'Response message' }
			// Update the messages array with the response
			messages = [...messages, { sender: 'AI Assistant', content: data.message }];
		} catch (error) {
			console.error(error);
			// Update the UI to show the error message to the user
		} finally {
			isLoading = false; // Stop loading regardless of success or error
		}
	}
	function handleKeyDown(event) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault(); // Stop the textarea from creating a new line
			handleSubmit();
		}
	}
</script>

<main class="flex flex-col h-[calc(100dvh)]">
	<Header />

	<div class="flex flex-grow justify-center bg-gradient-to-b from-cee5fd to-white">
		{#if !startChat}
			<div class="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
				<h1 class="text-5xl md:text-6xl mb-4 text-center">
					M&S <span class="text-slbBlue">AI</span> Assistant
				</h1>
				<p class="text-md md:text-lg text-gray-700 mb-6 text-center mx-2 sm:mx-4 md:mx-6 lg:mx-8">
					Explore this cutting-edge chatbot, delivering high-quality answers tailored to your needs.
					Type your question below.
				</p>
			</div>
		{/if}
		{#if startChat}
			<div class="w-full md:w-1/2 overflow-auto p-4">
				{#each messages as message}
					<div><strong>{message.sender}:</strong> {message.content}</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Input field and Send button at the bottom -->

	<div class=" bg-white flex justify-center items-center p-2 md:p-4">
		<div class="relative w-full md:w-1/2">
			<textarea
				on:input={autoResize}
				class="appearance-none w-full bg-gray-100 text-gray-700 border-2 border-gray-300 rounded-3xl pl-4 pr-10 focus:outline-none focus:bg-white focus:border-slbBlues resize-none py-2 md:py-3"
				rows="1"
				placeholder="Ask me anything..."
				style="overflow:hidden; max-height: 500px;"
				bind:value={userMessage}
				on:keydown={handleKeyDown}
				disabled={isLoading}
			></textarea>
			<button
				class="absolute inset-y-0 right-2 flex items-center justify-center px-3 text-slbBlue"
				type="submit"
				on:click={handleSubmit}
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
