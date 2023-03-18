import type { Meta, StoryObj } from "@storybook/react";

import UpVoteButton from "./UpVoteButton";

const meta: Meta<typeof UpVoteButton> = {
  component: UpVoteButton,
  args: {
    visible: true,
  },
  argTypes: {
    visible: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof UpVoteButton>;

export const Default: Story = {};
