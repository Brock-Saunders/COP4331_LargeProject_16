import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from './RegisterPage';

export default {
  title: 'Pages/RegisterPage',
  component: RegisterPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof RegisterPage>;

const Template: ComponentStory<typeof RegisterPage> = (args) => <RegisterPage {...args} />;

export const Default = Template.bind({});
Default.args = {};