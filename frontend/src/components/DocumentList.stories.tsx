import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import DocumentList from './DocumentList';

export default {
  title: 'Components/DocumentList',
  component: DocumentList,
} as Meta<typeof DocumentList>;

const Template: StoryFn<typeof DocumentList> = () => <DocumentList />;

export const Default = Template.bind({});
Default.args = {};