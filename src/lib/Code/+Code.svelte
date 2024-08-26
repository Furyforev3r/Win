<script lang="ts">
    import { onMount } from 'svelte'
    import { invoke } from "@tauri-apps/api/tauri"
    import CodeMirror from "svelte-codemirror-editor"
    import minTheme from "./themes"
    import minStyles from "./styles"
    import toast, { Toaster } from 'svelte-french-toast'
    import { languageStore, setLanguageMode } from './languages'

    export let editorPath: string = ''
    let editorContent: string = ''
    let value: string


    async function updateContent(path: string) {
        if (path) {
            editorContent = await invoke("get_file_content", { filePath: path });
            value = editorContent
            setLanguageMode(path)
        }
    }

    $: {
        if (editorPath) {
            updateContent(editorPath)
        }
    }

    async function handleKeydown(event: any) {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault()
            toast.success(`File saved successfully! ${editorPath}`, {
                position: "bottom-right",
                style: "background: #1f1f1f; color: #CCC; filter: drop-shadow(3px 3px 8px #000);"
            })
            await invoke("save_file_content", { filePath: editorPath, content: value }).then(() => editorContent = value)
        }
    }

    onMount(() => {
        window.addEventListener('keydown', handleKeydown)

        return () => {
            window.removeEventListener('keydown', handleKeydown)
        }
    })
</script>

<div class="editor" class:notSave={editorContent != value}>
    <Toaster />
    <CodeMirror bind:value lang={$languageStore} theme={minTheme} styles={minStyles} />
</div>

<style>
    .notSave {
        border-left: 1px solid var(--customMarkdownLinks-foreground);
    }
    .editor {
        max-height: calc(100% - 3rem);
    }

    .editor::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    .editor::-webkit-scrollbar-thumb {
        background-color: var(--tab-inactiveForeground);
    }
</style>
