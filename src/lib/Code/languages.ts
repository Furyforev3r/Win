import { writable } from 'svelte/store'
import { javascript } from "@codemirror/lang-javascript"
import { python } from "@codemirror/lang-python"
import { html } from "@codemirror/lang-html"
import { rust } from "@codemirror/lang-rust"

const languageStore = writable(javascript())

export { languageStore }

export function setLanguageMode(path: string) {
    const extension = path.split('.').pop()

    switch (extension) {
        case "ts":
            languageStore.set(javascript({ typescript: true }))
            break
        case "jsx":
        case "tsx":
            languageStore.set(javascript({ typescript: true, jsx: true }))
            break
        case "py":
            languageStore.set(python())
            break
        case "html":
            languageStore.set(html())
            break
        case "rs":
            languageStore.set(rust())
            break
        default:
            languageStore.set(javascript())
            break
    }
}
