import type { Page } from "@playwright/test";

/** Scrolls the page end to end so every Reveal has played before checking. */
export const revealAll = async (page: Page) => {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 300) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
};

export const phone = { width: 390, height: 844 };
export const desktop = { width: 1440, height: 900 };
