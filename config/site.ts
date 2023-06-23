export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Confab",
  description: "A voice chat for you to talk with your friends.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },

    {
      title: "Rooms",
      href: "/rooms",
    },
  ],
  links: {
    twitter: "https://twitter.com/abdulachik",
    github: "https://github.com/abdul-hamid-achik/confab",
  },
}
