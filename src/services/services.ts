import { writable, get } from 'svelte/store'
import { iconMap } from './icons'
import { appWindow } from '@tauri-apps/api/window'
import { invoke } from "@tauri-apps/api/tauri"

export const projectPath = writable('')
export const editorOpenPath = writable('')
export const editorsOpen = writable<Array<{ name: string, filePath: string }>>([])

export function setEditorOpenPath(path: string) {
    let fileName = path.split('\\').pop()

    editorOpenPath.set(path)
    appWindow.setTitle(`Win - ${fileName}`)

    if (!get(editorsOpen).includes({ filePath: path, name: fileName || '' })) {
        addEditor(path, fileName || '')
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

export function switchTab(forward: boolean = true) {
    const editors = get(editorsOpen)
    const currentPath = get(editorOpenPath)

    if (editors.length <= 1) return
    const currentIndex = editors.findIndex(editor => editor.filePath === currentPath)

    if (currentIndex === -1) return

    let newIndex = forward
        ? (currentIndex + 1) % editors.length
        : (currentIndex - 1 + editors.length) % editors.length

    const newEditor = editors[newIndex]

    if (newEditor && newEditor.filePath) {
        setEditorOpenPath(newEditor.filePath)
    }
}

export function removeEditor(path: string) {

    editorsOpen.update(editors => {
        let editor_filter = editors.filter(editor => editor.filePath != path)
        
        setEditorOpenPath(editor_filter.at(-1)?.filePath || editor_filter.at(0)?.filePath || '')
        return editor_filter
    })

    if (get(editorsOpen).length <= 1) {
        setEditorOpenPath('')
        appWindow.setTitle(`Win`)
    }
}

type File = {
    name: string
    is_dir?: boolean
}

export function getIcon(file: File): string {
    if (file.is_dir) {
        return iconMap[`folder-${file.name}`] ?? iconMap['folder']
    } else {
        const fileExtension = file.name.split('.').pop()
        return fileExtension ? iconMap[`.${fileExtension}`] ?? iconMap['.txt'] : iconMap['.txt']
    }
}

export function closeProject() {
    editorsOpen.set([])
    projectPath.set('')
    setEditorOpenPath('')
    appWindow.setTitle('Win')
}

export async function getFileType(filePath: string): Promise<string> {
    return invoke("get_file_type", { filePath })
}

export async function getFileContent(filePath: string): Promise<string> {
    return invoke("get_file_content", { filePath })
}

export async function getFileBase64(filePath: string): Promise<string> {
    return invoke("get_file_base64", { filePath })
}

export async function saveFileContent(filePath: string, content: string): Promise<void> {
    return invoke("save_file_content", { filePath, content })
}

export async function getFilesInFolder(folderPath: string) {
    return await invoke("get_files_in_folder", { folderPath: folderPath })
}