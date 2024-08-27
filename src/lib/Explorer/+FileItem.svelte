<script lang="ts">
    import Icon from "@iconify/svelte"
    import { setEditorOpenPath, getIcon } from "../../services/services"

    export let file: any
    
    let showChildren = false
    let projectOpen: boolean = false
    let iconPath: any

    function toggleChildren() {
        showChildren = !showChildren
    }

    function toggleProject() {
        projectOpen = !projectOpen
    }
    
    $: iconPath = getIcon(file)
</script>

<div class="fileItem">
    <button class="fileItemContent" on:click={file.is_dir ? () => { toggleChildren() ; toggleProject() } : () => setEditorOpenPath(file.path)}>
        <div class="fileIcons">
            {#if file.is_dir}
                <div class="projectArrow" class:projectClosed={!projectOpen}>
                    <Icon icon="ri:arrow-down-s-line" />
                </div>
            {/if}
    
            <img class="fileIcon" src={iconPath} alt={file.name} width="15px" >
        </div>

        <p>
            {file.name}
        </p>
    </button>
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
        cursor: pointer;
        width: 100%;
        margin: 0.3rem;
        display: flex;
        flex-direction: flex;
        align-items: center;
        gap: 0.3rem;
        background: none;
        outline: none;
        border: none;
    }

    .fileIcons {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    
    .projectArrow {
        display: grid;
        place-items: center;
        transition: transform 0.2s ease;
    }

    .projectArrow.projectClosed {
        transform: rotate(-90deg);
    }

    .fileItem:hover {
        background: var(--editorIndentGuide-background);
    }
</style>
