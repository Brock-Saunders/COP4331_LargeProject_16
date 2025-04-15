import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import EditorFooter from "./EditorFooter";

export default {
  title: "Components/EditorFooter",
  component: EditorFooter,
} as Meta<typeof EditorFooter>;

const Template: StoryFn<typeof EditorFooter> = (args) => <EditorFooter {...args} />;

export const Default = Template.bind({});
Default.args = {};