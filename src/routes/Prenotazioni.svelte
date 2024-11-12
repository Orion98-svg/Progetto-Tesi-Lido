<script>
import {listPrenotazioni, listOmbrelloni} from '../store.js';
let prenotazioni 

$: prenotazioni = $listPrenotazioni

 function illumina(prenotazione){
    listOmbrelloni.set(prenotazione.ombrelloni)
 }
</script>

<style>
    button {
        display: block;
        margin: 10px auto;  /* Adds space above and below each button */
        background-color: rgb(39, 41, 41);
        font-size:larger;
        border-radius: 10px;
        text-align: left;
        color: #ffff;
        cursor: pointer;
    }
</style>

<h1>Prenotazioni</h1>

{#each prenotazioni as prenotazione}
    <button on:click={() => illumina(prenotazione)}>
        <div>
            <p>ID: {prenotazione._id}</p>
            <p>Nominativo: {prenotazione.nominativo}</p>
            <p>Telefono: {prenotazione.telefono}</p>
            <p>Data_inizio: {prenotazione.data_inizio}</p>
            <p>Data_fine: {prenotazione.data_fine}</p>
            <p>Cabina: {prenotazione.cabina}</p>
            <p>Prezzo: {prenotazione.prezzo}</p>
            <p>Pagato? {prenotazione.pagato}</p>
        </div>
    </button>
    
{/each}