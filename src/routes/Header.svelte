<script>
	let isOpen = false;
</script>

<nav class="bg-slbBlue text-white">
	<div class="max-w-6xl mx-auto px-4">
		<div class="flex justify-between">
			<div class="flex space-x-4">
				<!-- logo -->
				<div class="flex items-center space-x-1">
					<img src="/SLB_BIG.png" alt="SLB Logo" class="w-12 mx-2" />
				</div>

				<!-- primary nav -->
				<div class="hidden md:flex items-center space-x-1">
					<a
						href="/"
						class="py-4 px-3 text-white hover:text-gray-200 no-underline hover:no-underline">Home</a
					>
					<a
						href="/about"
						class="py-4 px-3 text-white hover:text-gray-200 no-underline hover:no-underline"
						>About</a
					>
					<!-- Add more navigation links as needed -->
				</div>
			</div>

			<!-- mobile button goes here -->
			<div class="md:hidden flex items-center">
				<button class="mobile-menu-button" on:click={() => (isOpen = !isOpen)}>
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16m-7 6h7"
						></path></svg
					>
				</button>
			</div>
		</div>
	</div>

	<!-- mobile menu -->
	<div class="md:hidden" class:hidden={!isOpen}>
		<a href="/" class="py-4 px-3 text-white hover:text-gray-200 no-underline hover:no-underline"
			>Home</a
		>
		<a
			href="/about"
			class="py-4 px-3 text-white hover:text-gray-200 no-underline hover:no-underline">About</a
		>
	</div>
</nav>
