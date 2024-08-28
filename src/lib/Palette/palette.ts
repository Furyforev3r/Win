import { writable } from "svelte/store"

export const itens = [
    { title: "Save file", shortcut: ['Ctrl', 'S'] },
    { title: "Show all comands", shortcut: ['Ctrl', 'O'] },
    { title: "Close tab", shortcut: ['Ctrl', 'W'] },
    { title: "Change tab", shortcut: ['Ctrl', 'Tab'] },
]

export const searchResults: any = writable([])

export function searchCommand(query: any) {
    const filter = itens.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
    )

    searchResults.set(filter)
}