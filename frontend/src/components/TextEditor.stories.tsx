import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import TextEditor from './TextEditor';

const meta: Meta<typeof TextEditor> = {
  title: 'Components/TextEditor',
  component: TextEditor,
};

export default meta;

type Story = StoryObj<typeof TextEditor>;

export const Default: Story = {
  render: () => {
    const [content, setContent] = useState('<p>Hello world!</p>');

    const handleEditorReady = (editor: any) => {
      console.log('Editor is ready', editor);
    };

    return (
      <TextEditor
        content={content}
        setContent={setContent}
        onEditorReady={handleEditorReady}
      />
    );
  },
};
