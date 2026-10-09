import type { Preview } from "@storybook/react-vite";
import "../styles/theme.css";
const preview: Preview = {
  parameters: { controls: { expanded: true }, a11y: { test: "error" } },
};
export default preview;
