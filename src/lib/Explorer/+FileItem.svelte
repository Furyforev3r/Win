<script lang="ts">
    import Icon from "@iconify/svelte"
    import { setEditorOpenPath } from "../../services/services"

    export let file: any
    let showChildren = false

    function toggleChildren() {
        showChildren = !showChildren
    }
</script>

<div class="fileItem">
    <div class="fileItemContent">
        <Icon icon={file.is_dir ? "material-symbols:folder-outline" : "mdi:file"} />
        
        <button class="fileName" on:click={file.is_dir ? toggleChildren : () => setEditorOpenPath(file.path)}>
            {file.name}
        </button>
    </div>
    {#if showChildren && file.is_dir}
        {#each file.children as child}
            <svelte:self file={child} />
        {/each}
    {/if}
</div>

<style>
    .fileItem {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
        padding-left: 1rem;
    }

    .fileItemContent {
        width: 100%;
        margin: 0.3rem;
        display: flex;
        flex-direction: flex;
        align-items: center;
        gap: 0.3rem;
    }

    .fileItem:hover {
        background: var(--editorIndentGuide-background);
    }

    .fileName {
        cursor: pointer;
        background: none;
        outline: none;
        border: none;
    }
</style>
