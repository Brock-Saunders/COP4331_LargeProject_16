import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import FileSideBar from "./FileSideBar";

export default {
  title: "Components/FileSideBar",
  component: FileSideBar,
  argTypes: {
    onSelectFile: { action: "onSelectFile" },
    onAddnewFile: { action: "onAddnewFile" },
  },
} as Meta<typeof FileSideBar>;

const Template: StoryFn<typeof FileSideBar> = (args) => <FileSideBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  files: [
    { _id: "1", userId: "user1", title: "File 1", content: "Content 1", createdAt: "2025-04-01", updatedAt: "2025-04-02" },
    { _id: "2", userId: "user1", title: "File 2", content: "Content 2", createdAt: "2025-04-03", updatedAt: "2025-04-04" },
    { _id: "3", userId: "user1", title: "File 3", content: "Content 3", createdAt: "2025-04-05", updatedAt: "2025-04-06" },
  ],
  currentFileId: "2",
};