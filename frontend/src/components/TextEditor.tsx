import React, { useEffect, useState } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Text from '@tiptap/extension-text';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Heading from '@tiptap/extension-heading';
import Codeblock from '@tiptap/extension-code-block';

import '../styles/editor.css'

interface TextEditorProps {
  content: string;
  setContent: (content: string) => void;
  onEditorReady: (editor: Editor) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ content, setContent, onEditorReady }) => {
  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    const newEditor = new Editor({
      extensions: [StarterKit],
      content: content,
      autofocus: false,
      editorProps: {
        attributes: {
          class: "editor-container overflow-hidden bg-white dark:bg-zinc-800 text-black dark:text-white p-6 focus:outline-none",
        },
      },
      onUpdate({ editor }) {
        setContent(editor.getHTML());
      },
      injectCSS: true,
    });

    setEditor(newEditor);
    onEditorReady(newEditor);

    return () => {
      newEditor.destroy();
    };
  }, []);

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content, false);
    }
  }, [content]);
  return (
    <div className="overflow-y-auto border border-gray-600 rounded-md bg-zinc-800 rounded-b-sm h-[80vh] overscroll-contain">
      {editor ? <EditorContent editor={editor} /> : <p>Loading editor...</p>}
    </div>
  );
};

export default TextEditor;