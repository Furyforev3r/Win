let minStyles = {
    "&": {
        width: "calc(100dvw - 256px)",
        fontFamily: 'JetBrains Mono, monospace',
    },
    ".cm-scroller": {
        overflow: 'hidden',
    },
    ".cm-content, .cm-gutters": {
        fontSize: "14px",
        lineHeight: "1.8",
    },
    ".cm-gutters": {
        paddingInline: "1rem",
    },
    ".cm-gutterElement": {
        color: "var(--editorLineNumber-foreground)"
    },
    ".cm-gutters, .cm-activeLineGutter": {
        background: "var(--editor-background)",
        border: "none"
    },
    ".cm-foldPlaceholder": {
        padding: "0.2rem",
        background: "var(--statusBarItem-prominentBackground)",
        color: "var(--editorLineNumber-foreground)",
        border: "none"
    },
    ".cm-activeLine": {
        background: "rgba(68, 68, 68, 0.5)",
    },
    ".cm-cursor": {
        borderLeft: "2px solid var(--editorLineNumber-foreground)",
        borderRadius: "3px",
    },
    ".cm-tooltip-autocomplete": {
        overflow: "hidden",
        background: "var(--activityBar-background)",
        border: "none",
    },
    ".cm-tooltip-autocomplete > ul": {
        listStyle: "none",
        fontFamily: "JetBrains Mono, monospace",
    },
    ".cm-tooltip-autocomplete > ul > li": {
        lineHeight: "1.8",
        cursor: "pointer",
        overflow: "hidden",
        textOverflow: "ellipsis",
        borderRadius: "0.8px"
    },
    ".cm-tooltip-autocomplete > ul > li[aria-selected]": {
        background: "var(--statusBarItem-prominentBackground)",
        color: "white",
    },
    ".cm-tooltip-autocomplete-disabled > ul > li[aria-selected]": {
        background: "#777",
    },
    ".cm-tooltip-autocomplete > ul::-webkit-scrollbar": {
        width: "10px",
        height: "10px"
    },

    ".cm-tooltip-autocomplete > ul::-webkit-scrollbar-thumb": {
        backgroundColor: "var(--tab-inactiveForeground)",
    }
}

export default minStyles