import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.TagList(),
    Component.Description(),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/eisensafran/quartz",

    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    
  ],
  left: [
    Component.PageTitle(),
    
    Component.MobileOnly(Component.Spacer()),
    
    
    
    Component.Explorer(),
  ],
  right: [
    Component.Search(),

    Component.DesktopOnly(Component.Graph()),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.Darkmode(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.Explorer({folderDefaultState: "collapsed"}),
  ],
  right: [],
}
