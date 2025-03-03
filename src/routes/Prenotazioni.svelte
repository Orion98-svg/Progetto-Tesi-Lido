<script>
    import { listPrenotazioni, listOmbrelloni } from '../store.js';
    let prenotazioni;

    $: prenotazioni = $listPrenotazioni;

    function illumina(prenotazione) {
        listOmbrelloni.set(prenotazione.ombrelloni);
    }

    async function elimina(event) {
        const id = event.target.value;
        if (!id) {
            console.error("No ID provided for deletion.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5173/prenotazioni`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });

            if (!response.ok) {
                let errorMessage = "Failed to delete.";
                try {
                    const error = await response.json();
                    errorMessage = error.message || errorMessage;
                } catch {
                    errorMessage = "Server returned a non-JSON error response.";
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('Success:', data);

            listPrenotazioni.update(prenotazioni => 
                prenotazioni.filter(p => String(p._id) !== String(id)) // Ensure correct type comparison
            );
        } catch (error) {
            console.error("Deletion error:", error.message);
        }
    }

</script>

<style>
    #dettagli {
        display: flex;
        width: auto;
        height: auto;
        margin: 10px 0 0 10px;
        background-color: rgb(39, 41, 41);
        font-size: larger;
        border-radius: 10px;
        text-align: left;
        color: #ffff;
        cursor: pointer;
    }

    button {
        margin: 5px 0 0 10px;
        width: 100px;
        height: 35px;
        background-color: rgb(39, 41, 41);
        font-size: larger;
        border-radius: 10px;
        text-align: left;
        color: #ffff;
        cursor: pointer;
    }

    #elimina {
        background-color: red;
        display: inline-block;
        text-align: left;
    }

    #modifica {
        background-color: green;
        display: inline-block;
        text-align: left;
    }
</style>

<h1>Prenotazioni</h1>

{#each prenotazioni as prenotazione}
    <button id="dettagli" on:click={() => illumina(prenotazione)}>
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
    <div style="display:inline-flex;">
        <button id="elimina" value="{prenotazione._id}" on:click={elimina}>Elimina</button>
        <button id="modifica">Modifica</button>
    </div>
{/each}