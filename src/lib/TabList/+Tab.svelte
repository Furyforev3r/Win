<script lang="ts">
	import Icon from '@iconify/svelte'
    import { setEditorOpenPath, removeEditor } from '../../services/services'
    import { onMount } from 'svelte';

    export let fileName: string
    export let editorFile: any
    export let filePath: string
    
    async function handleKeydown(event: any) {
        if (event.ctrlKey && event.key === 'w' && filePath === editorFile) {
            event.preventDefault()
            removeEditor(filePath)
        }
    }
    
    onMount(() => {
        window.addEventListener('keydown', handleKeydown)

        return () => {
            window.removeEventListener('keydown', handleKeydown)
        }
    })
</script>

<button class="tab" class:tabSelected={filePath === editorFile} on:click={() => setEditorOpenPath(filePath)}>
    <Icon icon="mdi:file-outline" />
    <div class="fileInfo">
        <p>{fileName}</p>
        <button class="closeButton" on:click={() => removeEditor(filePath)}>
            <Icon icon="material-symbols:close"/>
        </button>
    </div>
</button>

<style>
    .tab {
        background: none;
        cursor: pointer;
        padding: 1rem;
        display: flex;
        flex-direction: row;
        gap: 0.3rem;
        align-items: center;
        border: 1px solid var(--editor-background);
        border-radius: 0.3rem;
        transition: background 0.8s;
    }

    .tab:hover {
        background: var(--editor-background);   
    }

    .tabSelected {
        background: var(--editor-background);
    }

    .fileInfo {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        align-items: end;
    }

    .fileInfo p {
        font-size: 12px;
    }

    .closeButton {
        display: grid;
        place-items: center;
        border: none;
        background: none;
        border-radius: 3px;
        transition: background 0.3s;
    }

    .closeButton:hover {
        background: var(--panelTitle-inactiveForeground);
    }
</style>