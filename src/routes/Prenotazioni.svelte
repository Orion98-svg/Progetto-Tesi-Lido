<script>
    import { listPrenotazioni, listOmbrelloni, listPrenotazioniGG } from '../store.js'; // Importa gli store per le prenotazioni e gli ombrelloni
    import { onMount } from 'svelte';

    let prenotazioni; // Definisce una variabile per le prenotazioni

    $: prenotazioni = $listPrenotazioni; // Assegna il valore dello store listPrenotazioni alla variabile prenotazioni

    function illumina(prenotazione) { // Funzione per impostare gli ombrelloni di una prenotazione
        listOmbrelloni.set(prenotazione.ombrelloni); // Imposta gli ombrelloni della prenotazione nello store listOmbrelloni
    }

    

    async function elimina(event) { // Funzione asincrona per eliminare una prenotazione
        const id = event.target.value; // Ottiene l'ID della prenotazione dal valore del pulsante
        if (!id) { // Controlla se l'ID è valido
            console.error("No ID provided for deletion."); // Stampa un messaggio di errore se l'ID non è valido
            return; // Esce dalla funzione se l'ID non è valido
        }

        try {
            const response = await fetch(`http://localhost:5173/prenotazioni`, { // Invia una richiesta DELETE al server
                method: 'DELETE', // Metodo DELETE
                headers: {
                    'Content-Type': 'application/json' // Imposta l'intestazione del contenuto come JSON
                },
                body: JSON.stringify({ id }) // Invia l'ID della prenotazione nel corpo della richiesta
            });

            if (!response.ok) { // Controlla se la risposta non è OK
                let errorMessage = "Failed to delete."; // Messaggio di errore predefinito
                try {
                    const error = await response.json(); // Prova a ottenere il messaggio di errore dal server
                    errorMessage = error.message || errorMessage; // Usa il messaggio di errore del server se disponibile
                } catch {
                    errorMessage = "Server returned a non-JSON error response."; // Messaggio di errore se la risposta non è JSON
                }
                throw new Error(errorMessage); // Lancia un'eccezione con il messaggio di errore
            }

            const data = await response.json(); // Ottiene i dati dalla risposta del server
            console.log('Success:', data); // Stampa un messaggio di successo con i dati

            listPrenotazioni.update(prenotazioni => 
                prenotazioni.filter(p => String(p._id) !== String(id)) // Aggiorna lo store listPrenotazioni rimuovendo la prenotazione eliminata
            );
        } catch (error) {
            console.error("Deletion error:", error.message); // Stampa un messaggio di errore se c'è un'eccezione
        }
    }

</script>

<style>

    .Titolo {
        text-align: center;
        position: inherit;
    }

    #dettagli, #elimina{
        width: 20vh;
    }

    #dettagli { 
        display: flex;
        height: auto;
        margin: 15px 0px 0px 0px;
        background-color: rgb(39, 41, 41);
        font-size: larger;
        border-radius: 10px;
        text-align: left;
        color: #ffff;
        cursor: pointer;
    }

    .content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow-y: auto;
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
        background-color: rgb(238, 66, 66);
        text-align: center;
        margin: 0;
    }

</style>

<div class="Titolo">
    <h1>Prenotazioni</h1> <!-- Titolo della pagina -->
</div>

<div class="content">
    {#each prenotazioni as prenotazione} <!-- Ciclo each per iterare sulle prenotazioni -->
        <button id="dettagli" on:click={() => illumina(prenotazione)}> <!-- Pulsante per visualizzare i dettagli della prenotazione -->
            <div>
                <p>Nominativo: {prenotazione.nominativo}</p> <!-- Mostra il nominativo della prenotazione -->
                <p>Telefono: {prenotazione.telefono}</p> <!-- Mostra il telefono della prenotazione -->
                <p>Data_inizio: {prenotazione.data_inizio}</p> <!-- Mostra la data di inizio della prenotazione -->
                <p>Data_fine: {prenotazione.data_fine}</p> <!-- Mostra la data di fine della prenotazione -->
                <p>Cabina: {prenotazione.cabina}</p> <!-- Mostra la cabina della prenotazione -->
                <p>Prezzo: {prenotazione.prezzo}</p> <!-- Mostra il prezzo della prenotazione -->
                <p>Pagato? {prenotazione.pagato}</p> <!-- Mostra se la prenotazione è stata pagata -->
            </div>
        </button>
        <div>
            <button id="elimina" value="{prenotazione._id}" on:click={elimina}>Elimina</button> <!-- Pulsante per eliminare la prenotazione -->
        </div>
    {/each}
</div>