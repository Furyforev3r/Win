import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { tags } from "@lezer/highlight"

const minHighlight = HighlightStyle.define([
    { tag: tags.string, color: "#ffab70" },
    { tag: tags.comment, color: "#6b737c" },
    { tag: tags.keyword, color: "#f97583" },
    { tag: tags.variableName, color: "#79b8ff" },
    { tag: tags.definitionKeyword, color: "#FF7A84" },
    { tag: tags.typeName, color: "#b392f0" },
    { tag: tags.punctuation, color: "#bbbbbb" },
    { tag: tags.atom, color: "#FF7A84" },
    { tag: tags.number, color: "#fff" },
    { tag: tags.propertyName, color: "#b392f0" },
    { tag: tags.operator, color: "#FF7A84" }, 
])

let minTheme = syntaxHighlighting(minHighlight)

export default minTheme