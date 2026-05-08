import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

const docs = await getCollection("docs", ({ data }) => !data.draft);

const NAVY: [number, number, number] = [0, 33, 46];
const TEAL_MID: [number, number, number] = [0, 89, 105];
const TEAL_LIGHT: [number, number, number] = [103, 196, 188];
const OFF_WHITE: [number, number, number] = [235, 235, 235];

type PageData = { title: string; description: string };

const staticPages: Record<string, PageData> = {
  home: {
    title: "Cosmo",
    description: "The free, open-source Astro launchpad for fast, scalable static sites.",
  },
  docs: {
    title: "Docs",
    description: "Guides for building with the Cosmo Astro template — tokens, collections, SEO, deployment.",
  },
  blueprint: {
    title: "Built with Cosmo",
    description: "Behind-the-scenes on how this site was built on top of Cosmo.",
  },
  roadmap: {
    title: "What's next for Cosmo",
    description: "The current build and what the future holds.",
  },
  privacy: {
    title: "Privacy Policy",
    description: "How we handle your data on cosmo.dyslecix.dev.",
  },
};

const docPages: Record<string, PageData> = Object.fromEntries(
  docs.map((doc) => [
    doc.id,
    {
      title: doc.data.title,
      description: doc.data.description ?? "A guide for building with the Cosmo Astro template.",
    },
  ]),
);

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "route",
  pages: { ...staticPages, ...docPages },
  getImageOptions: (_path, page: PageData) => ({
    title: page.title,
    description: page.description,
    logo: { path: "./src/assets/icon-dark.png", size: [72, 72] as [number, number] },
    bgGradient: [NAVY, TEAL_MID],
    border: { color: TEAL_LIGHT, width: 20, side: "inline-start" as const },
    font: {
      title: {
        color: OFF_WHITE,
        size: 70,
        weight: "Bold" as const,
        families: ["Space Mono"],
        lineHeight: 1.1,
      },
      description: {
        color: TEAL_LIGHT,
        size: 36,
        families: ["Space Mono"],
        lineHeight: 1.4,
      },
    },
    fonts: ["https://api.fontsource.org/v1/fonts/space-mono/latin-400-normal.ttf", "https://api.fontsource.org/v1/fonts/space-mono/latin-700-normal.ttf"],
    padding: 60,
  }),
});
