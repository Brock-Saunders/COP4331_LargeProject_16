import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import HeaderEditor from './HeaderEditor';

interface HeaderEditorProps {
    title: string;
    setTitle: (newTitle: string) => void;
    onEnter: () => void;
  }

export default {
  title: 'Components/HeaderEditor',
  component: HeaderEditor,
  argTypes: {
    title: { control: 'text' },
    onEnter: { action: 'onEnter' },
  },
} as Meta;

const Template: StoryFn<HeaderEditorProps> = (args) => {
  const [title, setTitle] = useState(args.title || '');

  return <HeaderEditor {...args} title={title} setTitle={setTitle} />;
};

export const Default = Template.bind({});
Default.args = {
  title: 'Default Title',
};