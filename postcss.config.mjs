import purgecss from "@fullhuman/postcss-purgecss";

export default {
  plugins: [
    purgecss({
      content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
      safelist: ["some-class"],
    }),
  ],
};
