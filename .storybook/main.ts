import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import path from "node:path";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    const tailwindcss = (await import("@tailwindcss/vite")).default;
    return mergeConfig(config, {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "..", "src"),
        },
      },
    });
  },
};

export default config;
