import { extendTheme } from "@chakra-ui/react";

const customTheme = {
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
};

const theme = extendTheme(customTheme);

export default theme;
