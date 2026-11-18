import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const wcagTags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

const phone = { width: 390, height: 844 };
const desktop = { width: 1440, height: 900 };
const viewports = [
  { width: 320, height: 640 },
  phone,
  { width: 768, height: 1024 },
  desktop,
];

/** Scrolls the page end to end so every Reveal has played before checking. */
const revealAll = async (page: Page) => {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 300) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
};

for (const viewport of viewports) {
  test(`no WCAG 2.2 AA violations at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("");
    await revealAll(page);

    const { violations } = await new AxeBuilder({ page })
      .withTags(wcagTags)
      .analyze();

    expect(violations.map((violation) => violation.id)).toEqual([]);
  });
}

test("skip link moves focus into the main content", async ({ page }) => {
  await page.goto("");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();

  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("the active section link is marked without relying on color", async ({
  page,
}) => {
  for (const viewport of [phone, desktop]) {
    await page.setViewportSize(viewport);
    await page.goto("");
    const active = page.locator('nav:visible [aria-current="location"]');
    await expect(active).toHaveCSS("text-decoration-line", "underline");
  }
});

test("focused elements are never hidden behind the header or the phone tab bar", async ({
  page,
}) => {
  await page.setViewportSize(phone);
  await page.goto("");

  const hidden: string[] = [];
  for (let step = 0; step < 40; step += 1) {
    await page.keyboard.press("Tab");
    const result = await page.evaluate(() => {
      const element = document.activeElement;
      if (!(element instanceof HTMLElement) || element === document.body) {
        return null;
      }
      const box = element.getBoundingClientRect();
      const header = document.querySelector("header");
      const tabBar = document.querySelector("nav.fixed");
      const inBars =
        element.closest("header") !== null ||
        element.closest("nav.fixed") !== null ||
        element.getAttribute("href") === "#main";
      const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
      const tabBarTop = tabBar?.getBoundingClientRect().top ?? innerHeight;
      // WCAG 2.4.11 (AA): a focused element must not be entirely hidden.
      const isHidden =
        !inBars && (box.bottom <= headerBottom || box.top >= tabBarTop);
      return { name: element.textContent.trim(), isHidden };
    });
    if (!result) break;
    if (result.isHidden) hidden.push(result.name);
  }

  expect(hidden).toEqual([]);
});
