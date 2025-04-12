import React, { useEffect, useRef } from 'react'; 
import { Editor  } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import CustomHeading from '../extensions/CustomHeading';
import Strike from '@tiptap/extension-strike'; 
import Toolbar from './Toolbar';

const EditorBox: React.FC = () => {
    const editorContainerRef = useRef<HTMLDivElement>(null); 
    const editorInstanceRef = useRef<Editor | null>(null); 
    const [editor, setEditor] = React.useState<Editor | null>(null); 

    useEffect (() => {
        if (editorContainerRef.current) {
            const newEditor = new Editor({
                element: editorContainerRef.current, 
                extensions: [StarterKit, CustomHeading, Strike], 
                content: '<p> Example Text </p>', 
                autofocus: true, 
                editable: true, 
                injectCSS: false, 
            }); 
            editorInstanceRef.current = newEditor; 
            setEditor(newEditor); 
        }
        return () => {
            editorInstanceRef.current?.destroy();                   // destroy component on unmount 
        }
    }, []); 

    return (
        <div>
            <Toolbar editor={editor} />
            <div ref={editorContainerRef} className='editor-container' />
        </div>
    ); 
}

export default EditorBox;