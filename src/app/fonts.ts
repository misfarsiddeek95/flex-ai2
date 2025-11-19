import localFont from "next/font/local";

export const fontSatoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Variable.woff2",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-VariableItalic.woff2",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-satoshi", // This is the CSS variable name
});

export const fontAlpino = localFont({
  src: [
    {
      path: "../../public/fonts/Alpino-Variable.woff2",
      style: "normal",
    },
    // We don't have a variable italic for Alpino, so we only load the normal style.
  ],
  display: "swap",
  variable: "--font-alpino", // This is the CSS variable name
});
