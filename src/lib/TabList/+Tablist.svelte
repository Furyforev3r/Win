<script lang="ts">
    import Tab from "./+Tab.svelte"
    import { editorsOpen, editorOpenPath, switchTab } from "../../services/services"
    import { onMount } from "svelte"

    async function handleKeydown(event: any) {
        if (event.ctrlKey && event.key === "Tab") {
            event.preventDefault()
            switchTab()
        } else if (event.ctrlKey && event.shiftKey && event.key === "Tab") {
            event.preventDefault()
            switchTab(false)
        }
    }
    
    onMount(() => {
        window.addEventListener('keydown', handleKeydown)

        return () => {
            window.removeEventListener('keydown', handleKeydown)
        }
    })
</script>

<div class="tablist">
    {#each $editorsOpen as tab}
        {#if tab.name}
            <Tab fileName={tab.name} editorFile={$editorOpenPath} filePath={tab.filePath}/>
        {/if}
    {/each}
</div>

<style>
    .tablist {
        background-color: var(--activityBar-background);
        max-width: calc(100dvw - 256px);
        display: flex;
        flex-direction: row;
        gap: 0.3rem;
        overflow-x: auto;
        white-space: nowrap;
    }

    .tablist::-webkit-scrollbar {
        height: 10px;
    }

    .tablist::-webkit-scrollbar-thumb {
        background-color: var(--tab-inactiveForeground);
    }
</style>
