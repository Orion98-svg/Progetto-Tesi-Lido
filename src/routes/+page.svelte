<script>
	import Menu from "./Menu.svelte";
	import Ombrelloni from "./Ombrelloni.svelte";
	import Prenotazioni from "./Prenotazioni.svelte";
	
</script>



<style>
	.container {
		display: grid;
		grid-template-columns: 1fr 3fr 1fr;
		height: 100vh;
	}

	.menu, .ombrelloni, .prenotazioni {	
		margin: 5px;
        background-color: #f0f0f0;
    }

	.prenotazioni{
		overflow: auto;
	}

</style>


<div class="container">
	<div class = "menu"><Menu /></div>
	<div class = "ombrelloni"><Ombrelloni /></div>
	<div class = "prenotazioni"><Prenotazioni /></div>
</div>