<script lang="ts">
    import Explorer from "../lib/Explorer/+Explorer.svelte"
    import Code from "../lib/Code/+Code.svelte"
    import Tablist from "$lib/TabList/+Tablist.svelte"
    import { projectPath, editorOpenPath } from "../services/services"
    import { onDestroy } from 'svelte'

    let currentEditorOpenPath: string | undefined

    const unsubscribe = editorOpenPath.subscribe(value => {
        currentEditorOpenPath = value
    })

    onDestroy(() => {
        unsubscribe()
    })
</script>

<div class="container">
    <Explorer projectPath={projectPath} />
    <div>
        <Tablist />
        {#if currentEditorOpenPath}
            <Code editorPath={currentEditorOpenPath}/>
        {/if}
    </div>
</div>

<style>
    .container div {
        margin-left: 256px;
    }
</style>
