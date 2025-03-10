<script>
    // Any menu-related logic here
    import { listPrenotazioni, listOmbrelloni, listPrenotazioniGG } from '../store.js';
    import Dialog from './Dialog.svelte';
    let dialogOpen = false;
    let dialogMessage = "";
    let menu = "button-containerS";
    let prenotazione = "nascosto";
    let cercap = "nascosto";
    let nome = "";

    let nominativo = "";
    let telefono = "";
    let data_inizio = "";
    let data_fine = "";
    let cabina = "";
    let prezzo = "";
    let pagato = false;

    async function cercaOmbrellone(data_inizio, data_fine) {
        try {
            const response = await fetch(`http://localhost:5173/ombrelloni?data_inizio=${data_inizio}&data_fine=${data_fine}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error fetching data.");
            }

            const data = await response.json();
            if (!Array.isArray(data)) {
                throw new TypeError("Expected an array but got something else.");
            }

            let ombrelloni = [];
            data.forEach(prenotazione => {
                ombrelloni.push(prenotazione.ombrelloni);
            });

            // Flatten the arrays
            let sombrelloni = ombrelloni.flat();
            listOmbrelloni.set(sombrelloni);
        } catch (error) {
            console.error("Fetch error:", error);
            openDialog(`Failed to fetch data: ${error.message}`);
        }
    }

    function newP(){
      menu = "nascosto";
      prenotazione = "prenotazioneS";
    }

    function indietroAdd(){
      menu = "button-containerS";
      prenotazione = "nascosto";
    }

    function indietroCer(){
      menu = "button-containerS";
      cercap = "nascosto";
      listPrenotazioni.set([]);
      prenotazioniGiornalieri();
    }

    $:console.log($listPrenotazioniGG, " m");

    function visualizza(){
      menu = "nascosto";
      cercap = "visualizzaS";
      cercapersone();
    }

    async function prenotazioniGiornalieri() {
        try {
            const response = await fetch('/prenotazioni', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }); // Invia una richiesta GET al server per ottenere le prenotazioni giornaliere

            if (!response.ok) {
                throw new Error('Failed to fetch today\'s reservations');
            }

            const data = await response.json(); // Ottiene i dati dalla risposta del server
            listPrenotazioniGG.set(data); // Imposta i dati delle prenotazioni nello store listPrenotazioni
        } catch (error) {
            console.error("Fetch error:", error); // Stampa un messaggio di errore se c'è un'eccezione
        }
    }

    async function cercapersone() {
        if (!nome) {
            nome = "";
        }

        try {
            const response = await fetch(`http://localhost:5173/prenotazioni?nominativo=${encodeURIComponent(nome)}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error fetching data.");
            }

            const data = await response.json();
            listPrenotazioni.set(data);
            console.log($listPrenotazioni);
        } catch (error) {
            console.error("Fetch error:", error);
            openDialog(`Failed to fetch data: ${error.message}`);
        }   
    }

    function openDialog(message) {
        dialogMessage = message;
        dialogOpen = true;
    }

    function closeDialog() {
        dialogOpen = false;
        dialogMessage = "";
    }

</script>
  
  <style>
    .button-containerS {
        text-align: center;
    }
    .button-containerS button{
        display: block; /* Ensures each button takes up a full line */
        width: 200px;
        height: 50px;    /* Optional: sets button width */
        margin: 10px auto;  /* Adds space above and below each button */
        background-color: aqua;
        font-size:larger;
        border-radius: 10px;
        cursor: pointer;
    }
    .prenotazioneS {
        display: block;
        width: 200px;
        height: 25px;
        margin: 10px auto;
        border-radius: 10px;
    }

    .nascosto {
        display: none;
    }

    #back {
      display: block;
        width: 100px;
        border-radius: 10px;
        cursor: pointer;
        transition: 2s;
    }

    #back:hover {
        background-color: red;
        transition: 2s;
    }

    .prenotazioneS input {
        width: 200px;
        height: 25px;
        margin: 10px auto;
        border-radius: 10px;
    }

    .prenotazioneS button {
        width: 200px;
        height: 50px;
        margin: 10px auto;
        border-radius: 10px;
    }

    .prenotazioneS label {
      display: flex;
      width: 100px;
      text-align: right;
    }

    .visualizzaS {
        text-align: center;
        
    }

    .visualizzaS input {
        display: flex;
        width: 200px;
        height: 25px;
        margin: 10px auto;
        border-radius: 10px;
    }

    .visualizzaS label {
        width: 100px;
        font-size: larger;
    }

   #tstCer {
        width: 200px;
        height: 50px;
        margin: 10px auto;
        border-radius: 10px;
    }

  </style>
  
  <div class={menu}>
    <h1 >Menu</h1>
    <button on:click={newP}>
        nuova prenotazione
    </button>
    <button on:click={visualizza}>
        visualizza prenotazioni
    </button>
  </div>

  
  <div class={prenotazione}>
    <h1 >Prenotazione</h1>
    <form on:submit|preventDefault={indietroAdd} style="display:flex;  justify-content: center;">
      <table>
        <tbody>
          <tr>
            <td><label for="name">Nominativo:</label></td>
            <td><input type="text" id="name" bind:value={nominativo} name="fname" /></td>
          </tr>
          <tr>
            <td><label for="phone">Telefono:</label></td>
            <td><input type="text" id="phone" bind:value={telefono} name="phone" /></td>
          </tr>
          <tr>
            <td><label for="iDate">Data_inizio:</label></td>
            <td><input type="date" id="iDate" bind:value={data_inizio} name="iDate" /></td>
          </tr>
          <tr>
            <td><label for="fDate">Data_fine:</label></td>
            <td><input type="date" id="fDate" bind:value={data_fine} name="fDate" /></td>
          </tr>
          <tr>
            <td><label for="cabin">Cabina:</label></td>
            <td><input type="text" id="cabin" bind:value={cabina} name="cabin" /></td>
          </tr>
          <tr>
            <td><label for="price">Prezzo:</label></td>
            <td><input type="text" id="price" bind:value={prezzo} name="price" /></td>
          </tr>
          <tr>
            <td><label for="umbrella">Ombrellone:</label></td>
            <td><button type="button" on:click={() => {cercaOmbrellone(data_inizio, data_fine)}}>Aggiungi ombrellone</button></td>
          </tr>
          <tr>
            <td><label for="pagato">Pagato?</label></td>
            <td><input type="checkbox" id="pagato" bind:checked={pagato} name="pagato" /></td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">
              <input type="submit" value="Conferma" />
              <button type="button" id="back"  style="height:20px;" on:click={indietroAdd} >Annulla</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>

  <div class = {cercap}>
    <h1 >Visualizza prenotazioni</h1>
    <form on:submit|preventDefault={cercapersone}>
      <label for="cerca">filtra per nome: </label>
      <input type="text" bind:value={nome} name="cerca" placeholder="Inserisci nominativo"/>
      <input type="submit" id="tstCer" value="Filtra" />
    </form>
    <button id="back" on:click={indietroCer}>
      <p>Annulla</p>
    </button>
    <Dialog isOpen={dialogOpen} message={dialogMessage} onClose={closeDialog} />
  </div>
  