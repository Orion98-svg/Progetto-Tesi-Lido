<script>
    import Ombrellone from "./Ombrellone.svelte";

    import { listOmbrelloni } from '../store.js';
  
    let rows = 15; // Number of rows (fili)
    let columns = 15; // Number of umbrellas per row (ombrelloni)
    
    // Create a 2D array for each umbrella's properties
    let grid = Array.from({ length: rows }, (_, fila) => 
        Array.from({ length: columns }, (_, numero) => ({ numero: numero + 1, fila: fila + 1 }))
    );

    let ombrelloniAssociati = [];

    $: ombrelloniAssociati = $listOmbrelloni;

    function prenotato(ombrellone) {
        return ombrelloniAssociati.some(o => o.numero === ombrellone.num && o.fila === ombrellone.fila);
    }

  </script>
  
  <style>
    /* Style the scrollable content */
    .Titolo {
        text-align: center;
    }
    
    .row {
      display:grid;
      grid-template-columns: repeat(15, 1fr);
    }
  </style>
  
  <div class="Titolo">
    <h1>Ombrelloni</h1>
  </div>

  <div class="content">
    <!-- Loop over rows and each umbrella in each row -->
    {#each grid as row}
      <div class="row">
        {#each row as ombrellone}
          <Ombrellone num={ombrellone.numero} fila={ombrellone.fila} prenotato={prenotato({"num": ombrellone.numero, "fila": ombrellone.fila})}/>
        {/each}
      </div>
    {/each}
  </div>

  