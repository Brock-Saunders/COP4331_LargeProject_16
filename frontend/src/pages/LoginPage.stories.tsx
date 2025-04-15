import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

export default {
  title: 'Pages/LoginPage',
  component: LoginPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof LoginPage>;

const Template: ComponentStory<typeof LoginPage> = (args) => <LoginPage {...args} />;

export const Default = Template.bind({});
Default.args = {};