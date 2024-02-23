<script>
	import Header from './Header.svelte';
	import { onMount } from 'svelte';
	import { tick } from 'svelte';
	// You might import a Chat component here if you have one,
	// or directly implement chat logic in this script block.

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
		event.target.style.height = 'auto';
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
		await tick(); // Wait for the DOM to update
		scrollToBottom(); // Scroll to the bottom of the chat
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
				console.error('API call failed:', response.statusText);
				// Optionally, read and log the response text for more details
				const errorText = await response.text();
				console.error('Error details:', errorText);
				return; // Exit early since the API call failed
			}

			let data;
			if (response.ok) {
				data = await response.json(); // Parse once
				messages = [...messages, { sender: 'AI Assistant', content: data.message }];
				await tick(); // Wait for the DOM to update
				scrollToBottom(); // Scroll to the bottom of the chat
			} else {
				// Handle non-OK responses without trying to parse JSON
				console.error('API call failed:', response.statusText);
				// Read response as text or handle accordingly
			}
			// Update the messages array with the response
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
	function scrollToBottom() {
		const chatContainer = document.querySelector('.flex.flex-grow.overflow-auto'); // Adjust the selector as needed
		chatContainer.scrollTop = chatContainer.scrollHeight;
	}
</script>

<main class="flex flex-col h-[calc(100dvh)]">
	<Header />

	<div class="flex flex-grow overflow-auto justify-center bg-gradient-to-b from-cee5fd to-white">
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
			<div class="w-full md:w-1/2 p-4">
				{#each messages as message}
					<div><strong>{message.sender}:</strong> {message.content}</div>
				{/each}
				{#if isLoading}
					<div><strong>AI Assistant:</strong></div>
					<div class="animate-pulse flex space-x-4">
						<div class="flex-1 space-y-6 py-1">
							<div class="h-2 bg-slate-400 rounded"></div>
							<div class="space-y-3">
								<div class="grid grid-cols-3 gap-4">
									<div class="h-2 bg-slate-400 rounded col-span-2"></div>
									<div class="h-2 bg-slate-400 rounded col-span-1"></div>
								</div>
								<div class="h-2 bg-slate-400 rounded"></div>
							</div>
						</div>
					</div>
				{/if}
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
				{#if isLoading}
					<svg
						aria-hidden="true"
						class="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
				{:else}
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
				{/if}
			</button>
		</div>
	</div>
</main>
