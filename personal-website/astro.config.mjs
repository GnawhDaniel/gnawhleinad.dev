// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import { setupIntegration } from "./integrations/db_update";

// https://astro.build/config
export default defineConfig({
  site: "https://gnawhleinad.dev",

  fonts: [{
      provider: fontProviders.local(),
      name: "MPlus1P",
      cssVariable: "--font-MPlus1P",
      options: {
          variants: [{
              src: ['./src/assets/fonts/MPLUS1p-Regular.ttf'],
              weight: 'normal',
              style: 'normal'
          }]
          }
  }],

  integrations: [setupIntegration],
});