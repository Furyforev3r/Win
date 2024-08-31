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

    function getTruncatedFileName(name: string): string {
        return name.length > 25 ? name.slice(0, 22) + "..." : name
    }
</script>

<div class="fileItem">
    <button class="fileItemContent" class:file={!file.is_dir} on:click={file.is_dir ? () => { toggleChildren() ; toggleProject() } : () => setEditorOpenPath(file.path)}>
        <div class="fileIcons">
            {#if file.is_dir}
                <div class="projectArrow" class:projectClosed={!projectOpen}>
                    <Icon icon="ri:arrow-down-s-line" width='15px'/>
                </div>
            {/if}
    
            <img class="fileIcon" src={iconPath} alt={file.name} width="15px" >
        </div>

        <p>
            {getTruncatedFileName(file.name)}
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
        margin: 0.3rem;
        display: flex;
        flex-direction: flex;
        align-items: center;
        gap: 0.3rem;
        background: none;
        outline: none;
        border: none;
    }

    .fileItemContent p {
        font-size: 13px;
        color: rgba(187, 187, 187, 0.6);
    }

    .file {
        padding-inline: 15px;
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