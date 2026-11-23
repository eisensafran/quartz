import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Coding Practices",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: { provider: "plausible" },
    locale: "en-US",
    baseUrl: "github.com/eisensafran/quartz",
    ignorePatterns: [
      "private",
      "templates",
      ".obsidian",
      "obsidian_templates",
      "private Modul 1 Gegenwart",
      "private Modul 2 Representation and Performativity",
    ],
    defaultDateType: "modified",
    generateSocialImages: false,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Inter",
        code: "Victor Mono",
      },
      colors: {
        lightMode: {
          light: "#ffffff",
          lightgray: "#E8EAE8",
          gray: "#707070",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#E63424",
          tertiary: "#2b2b2b",
          highlight: "#E6342410",
          textHighlight: "#B6ECEC",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#343737",
          gray: "#ADADAD",
          darkgray: "#d4d4d4",
          dark: "#E8EAE8",
          secondary: "#E63424",
          tertiary: "#B6ECEC",
          highlight: "#E6342418",
          textHighlight: "#B6ECEC26",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),

      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false, wikilinks: true }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
