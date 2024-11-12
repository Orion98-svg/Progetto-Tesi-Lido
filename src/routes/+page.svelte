<script>
	import Menu from "./Menu.svelte";
	import Ombrelloni from "./Ombrelloni.svelte";
	import Prenotazioni from "./Prenotazioni.svelte";
	
</script>



<style>
	.container {
		display: grid;
		grid-template-columns: 1fr 3fr 1fr;
	}

	.menu{
		padding-inline: 1rem;
		background-color: #f0f0f0;
		border: rgb(26, 16, 16);
	}

	.ombrelloni {
		padding: 10px;
		background-color: #c5c4c4;
		overflow-y: auto;
		margin : 0 10px;
	}

	.prenotazioni {
		padding: 1rem;
		background-color: #f0f0f0;
		border: rgb(26, 16, 16);
		overflow-y: auto;
	}
</style>


<div class="container">
	<div class = "menu"><Menu /></div>
	<div class = "ombrelloni"><Ombrelloni /></div>
	<div class = "prenotazioni"><Prenotazioni /></div>
</div>