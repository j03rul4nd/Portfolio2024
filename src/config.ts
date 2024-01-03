// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Joel Benitez";
export const SITE_DESCRIPTION =
  "Welcome to my software engineering realm, where innovation meets code. Delve into my portfolio to witness the diverse range of projects that highlight my expertise in crafting high-performance and scalable software solutions.";
export const TWITTER_HANDLE = "@jowwiiiiii";
export const MY_NAME = "Joel Benitez";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
