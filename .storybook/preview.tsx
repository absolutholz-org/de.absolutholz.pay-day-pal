import { Global } from "@emotion/react";
import type { Preview } from "@storybook/react-vite";
import React from "react";

import { globalStyles } from "../src/globalStyles";

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <Global styles={globalStyles} />
        <Story />
      </>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
