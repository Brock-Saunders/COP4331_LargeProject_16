import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Homebar from './HomeBar';

const meta: Meta<typeof Homebar> = {
  title: 'Components/Homebar',
  component: Homebar,
  parameters: {
    layout: 'fullscreen', // makes the story fill the screen width
  },
};

export default meta;

type Story = StoryObj<typeof Homebar>;

export const Default: Story = {
  args: {
    username: 'JaneDoe',
    onLogout: () => alert('Logged out!'),
    onCreateNewDocument: () => alert('New document created!'),
  },
  render: (args) => (
    <div className="min-h-screen bg-gray-100">
      <Homebar {...args} />
      <div className="pt-20 p-4"> {/* Content area below navbar */}
        <p>This is the main content area below the fixed Homebar.</p>
      </div>
    </div>
  ),
};
