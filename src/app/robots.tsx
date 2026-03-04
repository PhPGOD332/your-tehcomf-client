import { CLIENT_URL, pagesLinks } from "@/shared/constants";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          pagesLinks.main,
          pagesLinks.portfolio,
          `${pagesLinks.portfolio}/`,
          `${pagesLinks.portfolio}/*`,
          pagesLinks.contacts,
          `${pagesLinks.contacts}/`,
          pagesLinks.aboutCompany,
          `${pagesLinks.aboutCompany}/`,
        ],
        disallow: [
          "/*?*",
          `${pagesLinks.privacyPolicy}/`
        ],
      },
      {
        userAgent: "Googlebot",
        allow: [
          pagesLinks.main,
          pagesLinks.portfolio,
          `${pagesLinks.portfolio}/`,
          `${pagesLinks.portfolio}/*`,
          pagesLinks.contacts,
          `${pagesLinks.contacts}/`,
          pagesLinks.aboutCompany,
          `${pagesLinks.aboutCompany}/`,
        ],
        disallow: [
          "/*?*",
          `${pagesLinks.privacyPolicy}/`
        ],
      },
    ],
    sitemap: `${CLIENT_URL}/sitemap.xml`,
  };
}
