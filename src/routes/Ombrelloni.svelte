<script>
  import Ombrellone from "./Ombrellone.svelte"; // Importa il componente Ombrellone
  import { listOmbrelloni } from '../store.js'; // Importa lo store listOmbrelloni

  let rows = 15;
  let columns = 15;

  // Crea un array 2D per rappresentare la griglia di ombrelloni
  let grid = Array.from({ length: rows }, (_, fila) => 
      Array.from({ length: columns }, (_, numero) => ({ 
          numero: numero + 1, 
          fila: fila + 1
      }))
  );

  // Funzione per trovare l'ombrellone associato
  function getOmbrelloneAssociato(ombrellone) {
      let associato = $listOmbrelloni.find(o => o.numero === ombrellone.numero && o.fila === ombrellone.fila);
      return associato ? { 
          prenotato: true, 
          sdraio: associato.sdraio, 
          lettino: associato.lettino 
      } : { prenotato: false, sdraio: 0, lettino: 0 };
  }
</script>

<style>
  .Titolo {
      text-align: center; 
  }
  
  .row {
      justify-content: center;
      display: grid;
      grid-template-columns: repeat(15, 1fr);
      gap: 5px;
  }
</style>

<div class="Titolo">
  <h1>Ombrelloni</h1>
</div>

<div class="content">
  {#each grid as row}
    <div class="row">
      {#each row as ombrellone}
        {#await Promise.resolve(getOmbrelloneAssociato(ombrellone)) then dati}
            <Ombrellone 
                num={ombrellone.numero} 
                fila={ombrellone.fila} 
                prenotato={dati.prenotato} 
                sdraio={dati.sdraio} 
                lettino={dati.lettino} 
            />
        {/await}
      {/each}
    </div>
  {/each}
</div>
