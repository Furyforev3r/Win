<script lang="ts">
    import { open } from "@tauri-apps/api/dialog"
    import { invoke } from "@tauri-apps/api/tauri"
    import Icon from '@iconify/svelte'
    import FileItem from "./+FileItem.svelte"

    export let projectPath: any
    let projectOpen: boolean = false
    let files: Array<{ name: string, is_dir: boolean, children?: Array<{ name: string, is_dir: boolean }> }> = []

    async function handleButtonClick() {
        const selectedPath = await open({
            directory: true,
            multiple: false,
            title: "Select a project folder",
        })

        if (selectedPath) {
            projectPath = selectedPath as string
            await loadFiles(projectPath)
        }
    }

    async function loadFiles(path: string) {
        try {
            const fileEntries = await invoke("get_files_in_folder", { folderPath: path })
            files = fileEntries as Array<{ name: string, is_dir: boolean, children?: Array<{ name: string, is_dir: boolean }> }>
        } catch (error) {
            console.error("Failed to load files:", error)
        }
    }

    function toggleProject() {
        projectOpen = !projectOpen
    }
</script>

<div class="explorer">
    <p class="explorerTitle">Explorer</p>
    <div class="explorerProject">
        {#if projectPath}
            <button class="projectTitle" on:click={toggleProject}>
                <div class="projectArrow" class:projectClosed={!projectOpen}>
                    <Icon icon="ri:arrow-down-s-line" />
                </div>
                <p>{projectPath}</p>
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
                <button class="projectButton" on:click={handleButtonClick}>Choose a project</button>
            </div>
        {/if}
    </div>
    
</div>

<style>
    .explorer {
        min-height: 100dvh;
        width: 256px;
        background: var(--activityBar-background);
    }

    .explorerTitle {
        padding: 1rem;
    }

    .projectTitle {
        width: 100%;
        border: none;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.3rem;
        padding: 0.3rem;
        background: var(--editorIndentGuide-background);
        font-size: 12px;
        font-weight: 400;
        text-transform: uppercase;
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

    .projectButton {
        padding: 0.8rem 1.3rem;
        background: var(--button-background);
        border: none;
        cursor: pointer;
        transition: background 0.3s;
    }

    .projectButton:hover {
        background: var(--badge-background);
    }

    .filesList {
        height: 100%;
        margin-top: 0.3rem;
        display: flex;
        flex-direction: column;
    }

    .filesList::-webkit-scrollbar {
        height: 10px;
    }

    .filesList::-webkit-scrollbar-thumb {
        background-color: var(--tab-inactiveForeground);
    }
</style>
