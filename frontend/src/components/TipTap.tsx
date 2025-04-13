import React, { useEffect, useRef } from 'react'
import { Editor  } from '@tiptap/core';
import MenuBar from './MenuBar'
import CustomExtensions from '../extensions/CustomHeading'


const TipTap: React.FC = () => {
  const editorContainerRef = useRef<HTMLDivElement>(null); 
  const editorInstanceRef = useRef<Editor | null>(null); 
  const [editor, setEditor] = React.useState<Editor | null>(null); 

  useEffect (() => {
      if (editorContainerRef.current) {
          const newEditor = new Editor({
              element: editorContainerRef.current, 
              extensions: CustomExtensions, 
              content: '<p> Example Text </p>', 
              editorProps: {
                attributes: {
                  class: "h-lvh80 bg-oklch-500", 
                }
              },
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
    <div >
        <MenuBar editor={editor} />
        <div ref={editorContainerRef}></div>
    </div>
  ); 
}

export default TipTap; 

