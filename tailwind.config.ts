import type { Config } from "tailwindcss";

import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 'sans' is now your body font (Alpino)
        sans: ["var(--font-alpino)", ...defaultTheme.fontFamily.sans],
        // 'satoshi' is your heading font
        satoshi: ["var(--font-satoshi)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;
