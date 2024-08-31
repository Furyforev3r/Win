<script lang="ts">
    import { open } from "@tauri-apps/api/dialog"
    import Icon from '@iconify/svelte'
    import FileItem from "./+FileItem.svelte"
    import { closeProject, getFilesInFolder, projectPath } from "../../services/services"

    let projectOpen: boolean = false
    let files: Array<{ name: string, is_dir: boolean, children?: Array<{ name: string, is_dir: boolean }> }> = []
    let projectButtons: boolean = false

    async function handleButtonClick() {
        const selectedPath = await open({
            directory: true,
            multiple: false,
            title: "Select a project folder",
        })

        if (selectedPath) {
            projectPath.set(selectedPath as string)
            await loadFiles($projectPath)
        }
    }

    async function loadFiles(path: string) {
        try {
            const fileEntries = await getFilesInFolder(path)
            files = fileEntries as Array<{ name: string, is_dir: boolean, children?: Array<{ name: string, is_dir: boolean }> }>
        } catch (error) {
            console.error("Failed to load files:", error)
        }
    }

    function toggleProject() {
        projectOpen = !projectOpen
    }

    function toggleButtons() {
        projectButtons = !projectButtons
    }

    function close() {
        toggleProject()
        toggleButtons()
        closeProject()
    }
</script>

<div class="explorer">
    <p class="explorerTitle">Explorer</p>
    <div class="explorerProject">
        {#if $projectPath}
            <button class="projectTitle" on:click={toggleProject} on:pointerenter={toggleButtons} on:pointerleave={toggleButtons}>
                <div class="projectInfo">
                    <div class="projectArrow" class:projectClosed={!projectOpen}>
                        <Icon icon="ri:arrow-down-s-line" />
                    </div>
                    <div class="titleContent">
                        <p>{$projectPath}</p>
                    </div>
                </div>
                {#if projectButtons}
                    <div class="projectButtons">
                        <button class="titleButton" on:click={close}>
                            <Icon icon="ri:close-fill" width='13px'/>
                        </button>
                    </div>
                {/if}
            </button>
            {#if projectOpen}
                <div class="filesList">
                    {#each files as file}
                        <FileItem file={file} />
                    {/each}
                </div>
            {/if}
        {:else}
            <div class="selectProject">
                <p class="selectDescription">You have not yet opened a folder.</p>
                <button class="projectButton" on:click={handleButtonClick}>Choose a project</button>
            </div>
        {/if}
    </div>
    
</div>

<style>
    .explorer {
        position: fixed;
        height: 100dvh;
        width: 256px;
        background: var(--activityBar-background);
    }

    .explorerTitle {
        padding: 1rem;
    }

    .projectInfo, .projectButtons {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.3rem;
    }

    .titleButton {
        cursor: pointer;
        margin-inline: 0.3rem;
        display: grid;
        place-items: center;
        padding: 1px;
        border: none;
        border-radius: 2px;
        outline: none;
        background: none;
        transition: background 0.3s;
    }

    .titleButton:hover {
        background-color: var(--tokenErrorToken-foreground);
    }

    .projectTitle {
        width: 100%;
        border: none;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0.3rem;
        background: var(--editorIndentGuide-background);
        font-size: 12px;
        font-weight: 400;
        text-transform: uppercase;
    }

    .titleContent {
        max-width: 200px;
        display: grid;
        place-items: center;
        overflow: hidden;
    }

    .titleContent p {
        font-size: 13px;
    }

    .projectTitle:hover .titleContent {
        overflow: auto;
    }

    .titleContent::-webkit-scrollbar {
        height: 5px;
    }

    .titleContent::-webkit-scrollbar-thumb {
        background-color: var(--tab-inactiveForeground, rgba(0, 0, 0, 0.5));
    }

    .projectArrow {
        display: grid;
        place-items: center;
        transition: transform 0.2s ease;
    }

    .projectArrow.projectClosed {
        transform: rotate(-90deg);
    }

    .selectProject {
        height: 100%;
        display: grid;
        place-items: center;
    }

    .selectDescription {
        max-width: 50%;
        color: rgba(187, 187, 187, 0.6);
        margin: 0.8rem;
        font-size: 12px;
        font-weight: 600;
    }

    .projectButton {
        padding: 0.8rem 1.3rem;
        background: var(--editorRuler-foreground);
        border: none;
        cursor: pointer;
        transition: background 0.3s;
    }

    .projectButton:hover {
        background: var(--badge-background);
    }

    .filesList {
        overflow-y: hidden;
        overflow-x: hidden;
        margin-top: 0.3rem;
        display: flex;
        flex-direction: column;
        max-height: calc(100dvh - 7.3rem); 
    }

    .filesList:hover {
        overflow-y: auto;
        overflow-x: auto;
    }

    .filesList::-webkit-scrollbar {
        height: 10px;
    }

    .filesList::-webkit-scrollbar-thumb {
        background-color: var(--tab-inactiveForeground);
    }
</style>
