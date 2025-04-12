import React, { useEffect, useRef } from 'react'; 
import { Editor  } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import CustomHeading from '../extensions/CustomHeading';

const EditorBox: React.FC = () => {
    const editorContainerRef = useRef<HTMLDivElement>(null); 
    const editorInstanceRef = useRef<Editor | null>(null); 

    useEffect (() => {
        if (editorContainerRef.current) {
            editorInstanceRef.current = new Editor({
                element: editorContainerRef.current, 
                extensions: [StarterKit, CustomHeading],
                // Place holder contents 
                content: '<p> Example Text </p>',
                autofocus: true, 
                editable: true, 
                injectCSS: true
            }); 
        }
        return () => {
            editorInstanceRef.current?.destroy();                   // destroy component on unmount 
        }
    }, []); 

    return <div ref={editorContainerRef} className='editor-container' />; 
}

export default EditorBox;