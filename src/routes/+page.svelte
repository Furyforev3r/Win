<script lang="ts">
    import Explorer from "$lib/Explorer/+Explorer.svelte"
    import Code from "$lib/Code/+Code.svelte"
    import Tablist from "$lib/TabList/+Tablist.svelte"
    import { projectPath, editorOpenPath } from "../services/services"
</script>

<div class="container">
    <Explorer />
    <div class:codeMargin={$editorOpenPath}>
        <Tablist />
        {#if $editorOpenPath}
            <Code editorPath={$editorOpenPath}/>
            {:else}
                <div class="winHome">
                    <div class="winInfo">
                        <h1>Win</h1>
                        <p>Win is a modern and lightweight code editor.</p>
                    </div>
                    <div class="shortcutsExample">
                        <p>Show all comands <span>Ctrl</span> + <span>Shift</span> + <span>P</span></p>
                        <p>Save current file <span>Ctrl</span> + <span>S</span></p>
                        <p>Change tabs <span>Ctrl</span> + <span>Tab</span></p>
                        <p>Close tab <span>Ctrl</span> + <span>W</span></p>
                    </div>
                    <p>Add a ⭐ on <a href="https://github.com/Furyforev3r/Win">github!</a></p>
                </div>
        {/if}
    </div>
</div>

<style>
    .codeMargin {
        margin-left: 256px;
    }

    .winHome {
        margin-left: 256px;
        height: 100dvh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }

    .winInfo {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.3rem;
    }

    .shortcutsExample {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .shortcutsExample p {
        color: rgba(187, 187, 187, 0.6);
    }

    .shortcutsExample span {
        cursor: pointer;
        background: var(--editorRuler-foreground);
        border: 1px solid var(--activityBar-background);
        box-shadow: inset 0 -1px 0 var(--activityBarBadge-background);
        border-radius: 3px;
        font-size: 12px;
        margin: 0 2px;
        padding: 3px 5px;
        transition: background 0.3s;
    }

    .shortcutsExample span:hover {
        background: var(--badge-background);
    }
</style>
