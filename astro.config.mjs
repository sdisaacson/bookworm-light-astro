import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tina from "astro-tina";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tina from "astro-tina";
import vercel from "@astrojs/vercel/serverless";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig(
  {
    devToolbar: {
      enabled: true,
    },
    output: "server",
    adapter: vercel({
      webAnalytics: {
        enabled: true,
      },
      maxDuration: 8,
      isr: true,
      imageService: true,
    }),
    site: config.site.base_url
      ? config.site.base_url
      : "https://theaipapers.com",
    base: config.site.base_path ? config.site.base_path : "/",
    trailingSlash: config.site.trailing_slash ? "always" : "never",
    image: {},
    integrations: [
      react(),
      tina(),
      sitemap(),
      tailwind({
        config: {
          applyBaseStyles: false,
        },
      }),
      AutoImport({
        imports: [
          "@/shortcodes/Button",
          "@/shortcodes/Accordion",
          "@/shortcodes/Notice",
          "@/shortcodes/Video",
          "@/shortcodes/Youtube",
          "@/shortcodes/Tabs",
          "@/shortcodes/Tab",
        ],
      }),
      mdx(),
    ],
    redirects: {
      "/tag/[tag]": "/tag/[tag]/1",
    },
    markdown: {
      remarkPlugins: [
        remarkToc,
        [
          remarkCollapse,
          {
            test: "Table of contents",
          },
        ],
      ],
      shikiConfig: {
        theme: "one-dark-pro",
        wrap: true,
      },
      extendDefaultPlugins: true,
    },
  },
  partytown({
    config: {
      forward: ["dataLayer.push"],
    },
  }),
);
