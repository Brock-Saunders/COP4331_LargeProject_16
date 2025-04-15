import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import MenuBar from './MenuBar';
import TextEditor from './TextEditor';

const meta: Meta<typeof MenuBar> = {
  title: 'Components/MenuBar',
  component: MenuBar,
};

export default meta;

type Story = StoryObj<typeof MenuBar>;

export const WithEditor: Story = {
  render: () => {
    const [editorInstance, setEditorInstance] = useState<any>(null);
    const [content, setContent] = useState('<p>Type something here</p>');

    return (
      <div className="p-4 space-y-4 bg-zinc-900 min-h-screen text-white">
        {/* Pass the real editor instance into MenuBar */}
        {editorInstance && <MenuBar editor={editorInstance} />}
        
        {/* Render the actual editor */}
        <TextEditor
          content={content}
          setContent={setContent}
          onEditorReady={(editor) => setEditorInstance(editor)}
        />
      </div>
    );
  },
};
