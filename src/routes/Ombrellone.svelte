<script>
    export let num = 0;
    export let fila = 0;
    let sdraio = 0;
    let lettino = 0;
    export let prenotato = false;

</script>

<button class = "bottone {prenotato ? 'bottone_prenotato' : ''}"> 
    <div>N: {num}</div>
    <div>F: {fila}</div>
    <div>S: {sdraio} L: {lettino}</div>
</button>

<style>
    .bottone {
        background-color: #369137; /* Green */
        border: 2px solid black;
        border-radius: 20px;
        width: 90px;
        height: 70px;
        color: white;
        text-align: center;
        font-size: 14px;
        font-family:sans-serif;
        margin: 4px 4px;
        cursor: pointer;
    }

    .bottone_prenotato {
        background-color: #f44336; /* Red */
    }
</style>
