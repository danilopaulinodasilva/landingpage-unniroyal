// astro.config.mjs

import { defineConfig } from "astro/config";
import relativeLinks from "astro-relative-links";
import { imageService } from "@unpic/astro/service";

// https://astro.build/config
export default defineConfig({
  integrations: [relativeLinks()],
  image: {
    service: imageService(),
  },
});
