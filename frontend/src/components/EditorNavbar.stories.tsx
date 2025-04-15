import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import EditorNavbar from "./EditorNavbar";

export default {
  title: "Components/EditorNavbar",
  component: EditorNavbar,
} as Meta<typeof EditorNavbar>;

const Template: StoryFn<typeof EditorNavbar> = (args) => <EditorNavbar {...args} />;

export const Default = Template.bind({});
Default.args = {};