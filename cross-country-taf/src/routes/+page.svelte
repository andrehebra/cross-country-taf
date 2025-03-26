<script>
    import Button from './Button.svelte'
    export let data;
    let tafArray = data.taf;

    let identifier;
    let tafFound = false;
    let taf;

    console.log(tafArray);

    function selectAirport() {
        for (let i = 0; i < tafArray.length; i++) {
            if (identifier == tafArray[i].icaoId) {
                tafFound = true;
                taf = tafArray[i];
            }
        }

        if (!taf) {
            taf.fcsts = "NOT FOUND";
        }

        console.log(taf);
    }

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        
        const month = String(date.getMonth() + 1).padStart(2, '0');  // Get month (1-based)
        const day = String(date.getDate()).padStart(2, '0');         // Get day
        const hours = String(date.getHours()).padStart(2, '0');       // Get hours
        const minutes = String(date.getMinutes()).padStart(2, '0');   // Get minutes

        return `${month}/${day} ${hours}:${minutes}`;
    }   
</script>

<div class="container">
    <div class="destination">
        <input bind:value={identifier} type="text" />
        <Button on:click={selectAirport}>Get TAF</Button>
    </div>
    <div class="taf">
        {#if taf}
        {#if taf.fcsts}
            {#each taf.fcsts as forecast}
                <p class="title">FROM {formatTimestamp(forecast.timeFrom * 1000)} TO {formatTimestamp(forecast.timeTo * 1000)}</p>
                <p>WIND {forecast.wdir} AT {forecast.wspd} {#if forecast.wgst} GUSTING {forecast.wgst}{/if}</p>
                <p>VISIBILITY {forecast.visib}</p>
                {#each forecast.clouds as clouds}
                    <p>{clouds.cover} {clouds.base}</p>
                {/each}
            {/each}
        {/if}
        {/if}
    </div>
</div>

<style>
    :global(.title) {
        font-weight: 900;
    }
</style>