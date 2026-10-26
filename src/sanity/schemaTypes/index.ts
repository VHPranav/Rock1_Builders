import { faq } from "./faq";
import { galleryGroup } from "./galleryGroup";
import { homePage } from "./homePage";
import { newsPost } from "./newsPost";
import { objectTypes } from "./objects";
import { pageSeo } from "./pageSeo";
import { pageTypes } from "./pages";
import { project } from "./project";
import { siteSettings } from "./siteSettings";

// Documents edited once, not listed (see structure.ts).
export const singletonTypes = new Set([
  "homePage",
  "siteSettings",
  "aboutPage",
  "servicesPage",
  "montenegroPage",
  "legalPage",
  "contactPage",
  "listingPages",
]);

export const schemaTypes = [...objectTypes, siteSettings, homePage, project, newsPost, galleryGroup, faq, pageSeo, ...pageTypes];
