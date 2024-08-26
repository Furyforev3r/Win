import { writable, get } from 'svelte/store'

export const projectPath = ''
export const editorOpenPath = writable('')
export const editorsOpen = writable<Array<{ name: string, filePath: string }>>([])

export function setEditorOpenPath(path: string) {
    editorOpenPath.set(path)

    if (!get(editorsOpen).includes({ filePath: path, name: path.split('\\').pop() || '' })) {
        addEditor(path, path.split('\\').pop() || '')
    }
}

export function addEditor(filePath: string, name: string) {
    editorsOpen.update(editors => {
        const isPathAlreadyOpen = editors.some(editor => editor.filePath === filePath)
        if (!isPathAlreadyOpen) {
            return [...editors, { name, filePath }]
        }
        return editors
    })
}

export function removeEditor(name: string) {
    let name_split: any = name.split('\\').pop()

    editorsOpen.update(editors => {
        let editor_filter = editors.filter(editor => editor.name != name_split)
        
        setEditorOpenPath(editor_filter.at(-1)?.filePath || editor_filter.at(0)?.filePath || '')
        return editor_filter
    })

    if (get(editorsOpen).length <= 1) {
        setEditorOpenPath('')
    }
}