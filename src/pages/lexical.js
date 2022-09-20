import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import TreeViewPlugin from 'lexical/plugins/TreeViewPlugin'
import ToolbarPlugin from 'lexical/plugins/ToolbarPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { ListItemNode, ListNode } from '@lexical/list'
import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { TRANSFORMERS } from '@lexical/markdown'
import { $generateHtmlFromNodes } from '@lexical/html'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { $getRoot, $getSelection } from 'lexical'

import ListMaxIndentLevelPlugin from 'lexical/plugins/ListMaxIndentLevelPlugin'
import CodeHighlightPlugin from 'lexical/plugins/CodeHighlightPlugin'
import AutoLinkPlugin from 'lexical/plugins/AutoLinkPlugin'
import exampleTheme from 'lexical/themes/ExampleTheme'
import { Box, Button, Stack } from '@chakra-ui/react'
import { useState } from 'react'

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>
}

const editorConfig = {
  // The editor theme
  theme: exampleTheme,
  // Handling of errors during update
  onError(error) {
    throw error
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
}

function SaveButton() {}

export default function Editor() {
  const [editable, setEditable] = useState(true)
  const [rootNote, setRootNode] = useState(null)
  const [content, saveContent] = useState('')
  const [globalEditor, setGlobalEditor] = useState(null)

  function toggleSave() {
    // globalEditor.setEditable(!editable)
    setEditable(!editable)
  }

  function onChange(state, editor) {
    state.read(() => {
      const root = $getRoot()
      setRootNode(root)
    })
  }

  return (
    <Stack align="center">
      <LexicalComposer initialConfig={{ ...editorConfig, editable }}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
            />
            <HistoryPlugin />
            {/* <TreeViewPlugin /> */}
            <AutoFocusPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <OnChangePlugin onChange={onChange} />
          </div>
        </div>
      </LexicalComposer>

      <Button onClick={toggleSave}>{editable ? 'save' : 'edit'}</Button>
    </Stack>
  )
}
