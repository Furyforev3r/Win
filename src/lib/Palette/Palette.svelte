<script>
    import { onMount } from "svelte"
    import { searchCommand, searchResults } from "./palette"

    onMount(() => {
        searchCommand('')
    })
</script>

<div class="paletteContainer">
    <div class="palette">
        <input value="> " type="text" on:change={() => {}} on:input={(e) => searchCommand(e.currentTarget.value.split('> ').at(-1))}>
        <div class="paletteItems">
            {#each $searchResults as result }   
                <button class="paletteItem">
                    <p class="itemTitle">{result.title}</p>
                    <p class="shortcuts">
                        {#each result.shortcut as shortcut}
                            <span>{shortcut}</span>
                            {#if shortcut != result.shortcut.at(-1)}
                                +
                            {/if}
                        {/each}
                    </p>
                </button>
            {/each}
        </div>
    </div>
</div>

<style>
    .paletteContainer {
        width: 100%;
        display: grid;
        place-items: center;
        position: absolute;
        z-index: 999;
    }

    .palette {
        display: grid;
        place-items: center;
        gap: 0.5rem;
        width: 40%;
        padding: 0.8rem;
        background: var(--activityBar-background);
        border-radius: 0.3rem;
        filter: drop-shadow(0px 0px 10px var(--editorRuler-foreground));
    }

    .palette input {
        width: 100%;
        background: none;
        outline: none;
        border: 1px solid var(--editorRuler-foreground);
        padding: 0.3rem;
        font-weight: 500;
    }

    .paletteItems {
        width: 100%;
        max-height: 200px;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        overflow: auto;
    }

    .paletteItems::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    .paletteItems::-webkit-scrollbar-thumb {
        background-color: var(--tab-inactiveForeground);
    }

    .paletteItem {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background: none;
        outline: none;
        border: none;
        gap: 0.3rem;
        transition: background 0.3s;
        padding: 0.5rem;
    }

    .paletteItems:hover .paletteItem:not(:hover):first-child {
        background: none;
    }

    .paletteItem:first-child {
        background: var(--editorRuler-foreground);
    }

    .paletteItem:hover {
        background: var(--editorRuler-foreground);
    }

    .shortcuts span {
        cursor: pointer;
        background: var(--editorRuler-foreground);
        border: 1px solid var(--activityBar-background);
        box-shadow: inset 0 -1px 0 var(--activityBarBadge-background);
        border-radius: 3px;
        font-size: 12px;
        margin: 0 2px;
        padding: 3px 5px;
        transition: background 0.3s;
    }

    .shortcuts span:hover {
        background: var(--badge-background);
    }
</style>