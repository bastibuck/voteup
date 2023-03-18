import type { Meta, StoryObj } from "@storybook/react";

import DeleteButton from "./DeleteButton";

const meta: Meta<typeof DeleteButton> = {
  component: DeleteButton,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    toolTip: "Do you really want to delete this item?",
  },
  argTypes: {
    withFadeIn: {
      control: "boolean",
    },
  },
  decorators: [
    (Story) => (
      <div className="group grid h-48 place-items-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DeleteButton>;

export const Default: Story = {};

export const FadeIn: Story = {
  args: {
    withFadeIn: true,
  },
};

export const TooltipOpen: Story = {
  args: {
    tooltipOpen: true,
  },
};
