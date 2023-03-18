import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

import { ToolTip } from "./ToolTip";

const meta: Meta<typeof ToolTip> = {
  component: ToolTip,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="group grid h-48 place-items-center">
        <Story />
      </div>
    ),
  ],

  args: {
    children: (
      <Button size="sm" casing="normal">
        Hover to show tooltip
      </Button>
    ),
    toolTip: "Tooltip content",
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToolTip>;

export const Default: Story = {};
