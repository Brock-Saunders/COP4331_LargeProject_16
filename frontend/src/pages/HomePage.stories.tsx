import React from "react";
import CardPage from "./HomePage";
import { Meta, StoryFn } from "@storybook/react";

// Default export for Storybook
export default {
  title: "Pages/HomePage", // Storybook folder and component name
  component: CardPage,
  parameters: {
    layout: "fullscreen", // Makes the story load in fullscreen mode
  },
} as Meta<typeof CardPage>;

// Template for the component
const Template: StoryFn<typeof CardPage> = (args) => <CardPage {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  // Add props if HomePage accepts any dynamic props in the future
};