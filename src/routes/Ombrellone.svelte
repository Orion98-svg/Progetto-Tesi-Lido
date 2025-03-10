<script>
    export let num = 0;
    export let fila = 0;
    export let sdraio = 0;
    export let lettino = 0;
    export let prenotato = false;
</script>

<button class="bottone {prenotato ? 'bottone_prenotato' : ''}">
    <div>N: {num}</div>
    <div>F: {fila}</div>
    <div>S: {sdraio} L: {lettino}</div>
</button>

<style>
    .bottone {
        background-color: #369137; /* Green */
        border: 2px solid black;
        border-radius: 0.5vw; /* Use viewport width for border-radius */
        width: 3vw; /* Use viewport width for width */
        height: 3vw; /* Use viewport height for height */
        color: white;
        text-align: center;
        font-size: 0.5vw; /* Use viewport width for font-size */
        font-family: sans-serif;
        margin: 0.2vw; /* Use viewport width for margin */
        cursor: pointer;
    }

    .bottone_prenotato {
        background-color: #f44336; /* Red */
    }
</style>
