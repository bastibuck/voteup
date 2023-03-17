import type { Meta, StoryObj } from "@storybook/react";

import DeleteButton from "./DeleteButton";

const meta: Meta<typeof DeleteButton> = {
  component: DeleteButton,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    visible: {
      control: "boolean",
    },
  },
  decorators: [
    (Story) => (
      <div className="group grid h-96 place-items-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DeleteButton>;

export const Default: Story = {};

export const ForcedVisible: Story = {
  decorators: [
    (Story, ctx) => (
      <>
        <style>
          {`
            [data-name="${ctx.name}"] .opacity-0 { opacity: 1;}
            #storybook-root .opacity-0 { opacity: 1;}
        `}
        </style>

        <div className="group grid h-96 place-items-center">
          <Story />
        </div>
      </>
    ),
  ],
};

export const ForcedVisibleToolTip: Story = {
  decorators: [
    (Story, ctx) => (
      <>
        <style>
          {`
            [data-name="${ctx.name}"] .opacity-0, [data-name="${ctx.name}"] .tooltip:before, [data-name="${ctx.name}"] .tooltip:after { opacity: 1;}
            #storybook-root .opacity-0, #storybook-root .tooltip:before, #storybook-root .tooltip:after { opacity: 1;} 
        `}
        </style>

        <div className="group grid h-96 place-items-center">
          <Story />
        </div>
      </>
    ),
  ],
};
