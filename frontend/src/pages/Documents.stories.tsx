// Documents.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Documents from '../pages/Documents'; // Adjust path if needed
import '../index.css'; // Tailwind or global styles if needed

const meta: Meta<typeof Documents> = {
  title: 'Pages/Documents',
  component: Documents,
  parameters: {
    layout: 'fullscreen', // optional: makes it look more like a full page
  },
};

export default meta;

type Story = StoryObj<typeof Documents>;

export const Default: Story = {
  render: () => <Documents />,
};
