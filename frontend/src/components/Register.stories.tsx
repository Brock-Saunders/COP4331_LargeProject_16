import React from 'react';
import { Meta, StoryFn} from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Register from './Register';

export default {
  title: 'Components/Register',
  component: Register,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta<typeof Register>;

const Template: StoryFn<typeof Register> = (args) => <Register {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const LoadingState = Template.bind({});
LoadingState.args = {
  // Simulate loading state by mocking the component's internal state
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  // Simulate error state by mocking the component's internal state
};