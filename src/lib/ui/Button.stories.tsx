import { userEvent, within } from "@storybook/testing-library";
import { expect, jest } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    children: "Button label",
  },

  argTypes: {
    variant: { control: "select" },
    size: { control: "select" },
    casing: { control: "select" },
    type: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    onClick: jest.fn(),
  },
  play: ({ canvasElement, args }) => {
    const screen = within(canvasElement);

    const label = new RegExp(args.children?.toString() ?? "", "i");

    userEvent.click(screen.getByRole("button", { name: label }));

    expect(screen.getByRole("button", { name: label })).toBeEnabled();
    expect(args.onClick).toHaveBeenCalled();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: ({ canvasElement, args }) => {
    const screen = within(canvasElement);

    const label = new RegExp(args.children?.toString() ?? "", "i");

    expect(screen.getByRole("button", { name: label })).toBeDisabled();
  },
};
