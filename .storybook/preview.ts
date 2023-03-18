import type { Preview } from "@storybook/react";

import "../src/styles/globals.css";

const preview: Preview = {
  argTypes: {
    onClick: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      sort: "alpha",
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
