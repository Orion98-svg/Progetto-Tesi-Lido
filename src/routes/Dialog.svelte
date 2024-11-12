<!-- Dialog.svelte -->
<script>
    export let isOpen = false;
    export let message = "";
    export let onClose = () => {};
</script>

{#if isOpen}
    <div class="dialog-overlay" >
        <div class="dialog" >
            <p>{message}</p>
            <button on:click={onClose}>Close</button>
        </div>
    </div>
{/if}

<style>
    .dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    .dialog {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        max-width: 400px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    button {
        margin-top: 10px;
        padding: 8px 16px;
    }
</style>
