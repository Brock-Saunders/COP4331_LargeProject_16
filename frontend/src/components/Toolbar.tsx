import React from 'react';

interface ToolbarProps {
    editor: any; 
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
    if(!editor) {
        return null; 
    }

    return (
        <div className='toolbar'>
            {/* Strike through button */}
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                Strike
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                Bold
            </button>

            {/* Headings h1..h3 */}
            <button
                onClick={() => editor.chain().focus().toggleHeading( { level: 1}).run()}
                className={editor.isActive('heading', { level: 1}) ? 'is-active': ''}
            >
                H1
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading( { level: 2}).run()}
                className={editor.isActive('heading', { level: 2}) ? 'is-active': ''}
            >
                H2
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading( { level: 3}).run()}
                className={editor.isActive('heading', { level: 3}) ? 'is-active': ''}
            >
                H3
            </button>
        </div>
    )
}

export default Toolbar; 