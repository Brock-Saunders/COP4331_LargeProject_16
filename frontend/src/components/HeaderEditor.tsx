import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit';

interface HeaderEditorProps {
  title: string;
  setTitle: (newTitle: string) => void;
  onEnter: () => void;
}

const HeaderEditor: React.FC<HeaderEditorProps> = ({ title, setTitle, onEnter }) => {
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const headerInstanceRef = useRef<Editor | null>(null);
  const [editor, setEditor] = useState<Editor | null>(null);
  useEffect(() => {
    if (headerContainerRef.current) {
      const newEditor = new Editor({
        element: headerContainerRef.current,
        extensions: [StarterKit],
        content: title,
        editorProps: {
          attributes: {
            class: "bg-dark-gray-500 text-white p-4 w-full h-full focus:outline-none",
          },
          // switch editors on enter
          handleKeyDown: (view, event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              onEnter();
              return true;
            }
            return false;
          },
        },
        autofocus: true,
        // update header when title changes 
        onUpdate({ editor }) {
          const html = editor.getHTML();
          const text = new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
          setTitle(text);
        }
      });
      headerInstanceRef.current = newEditor;
      setEditor(newEditor);
    }

    return () => {
      headerInstanceRef.current?.destroy();
    }
  }, []);
  useEffect(() => {
    if (editor && editor.getHTML() !== title) {
      editor.commands.setContent(title, false);
    }
  }, [title]);

  return (
    <div className="font-bold text-5xl w-full">
      <div ref={headerContainerRef} className=''></div>
    </div>
  )

}

export default HeaderEditor;