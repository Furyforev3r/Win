<script lang="ts">
    import Explorer from "../lib/Explorer/+Explorer.svelte"
    import Code from "../lib/Code/+Code.svelte"
    import Tablist from "$lib/TabList/+Tablist.svelte"
    import { projectPath, editorOpenPath } from "../services/services"
</script>

<div class="container">
    <Explorer projectPath={projectPath} />
    <div>
        <Tablist />
        {#if $editorOpenPath}
            <Code editorPath={$editorOpenPath}/>
        {/if}
    </div>
</div>

<style>
    .container div {
        margin-left: 256px;
    }
</style>
