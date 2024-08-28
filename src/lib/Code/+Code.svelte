<script lang="ts">
    import { onMount } from 'svelte'
    import CodeMirror from "svelte-codemirror-editor"
    import minTheme from "./themes"
    import minStyles from "./styles"
    import toast from 'svelte-french-toast'
    import { languageStore, setLanguageMode } from './languages'
    import { getFileType, getFileContent, getFileBase64, saveFileContent } from '../../services/services'

    export let editorPath: string = ''
    let editorContent: string = ''
    let value: string
    let isImage: boolean = false
    let imageSrc: string = ''


    async function updateContent(path: string) {
        if (path) {
            try {
                const fileType = await getFileType(path)

                if (fileType === 'text' || fileType == 'unknown') {
                    editorContent = await getFileContent(path)
                    value = editorContent
                    setLanguageMode(path)
                    isImage = false
                } else if (fileType === 'image') {
                    isImage = true
                    imageSrc = `data:image/png;base64,${await getFileBase64(path)}`
                } else {
                    toast.error(`Unsupported file type: ${fileType}`, {
                        position: "bottom-right",
                        style: "background: #1f1f1f; color: #CCC; filter: drop-shadow(3px 3px 8px #000);"
                    })
                }
            } catch (error: any) {
                toast.error(`Error opening file: ${error.message}`, {
                    position: "bottom-right",
                    style: "background: #1f1f1f; color: #CCC; filter: drop-shadow(3px 3px 8px #000);"
                })
            }
        }
    }

    async function handleKeydown(event: any) {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault()
            if (!isImage) {
                toast.success(`File saved successfully! ${editorPath}`, {
                    position: "bottom-right",
                    style: "background: #1f1f1f; color: #CCC; filter: drop-shadow(3px 3px 8px #000);"
                })
                await saveFileContent(editorPath, value).then(() => editorContent = value)
            }
        }
    }

    onMount(() => {
        window.addEventListener('keydown', handleKeydown)

        return () => {
            window.removeEventListener('keydown', handleKeydown)
        }
    })

    $: {
        if (editorPath) {
            updateContent(editorPath)
        }
    }
</script>

<div class="editor" class:notSave={editorContent != value}>
    {#if isImage}
        <div class="imagePreviewContainer">
            <img src={imageSrc} alt="Preview" class="image-preview" />
        </div>
    {:else}
        <CodeMirror bind:value={value} lang={$languageStore} theme={minTheme} styles={minStyles} />
    {/if}
</div>

<style>
    .notSave {
        border-left: 1px solid var(--customMarkdownLinks-foreground);
    }

    .editor::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    .editor::-webkit-scrollbar-thumb {
        background-color: var(--tab-inactiveForeground);
    }

    .imagePreviewContainer {
        height: calc(100dvh - 3rem);
        display: grid;
        place-items: center;
    }

    .image-preview {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
</style>
