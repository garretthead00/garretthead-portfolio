import { expect, test } from "@playwright/test";
import { desktop, phone, revealAll } from "./helpers";

// Runs in Chrome, Firefox and WebKit, against the build or (BASE_URL) the live site.

test("loads without errors or blocked resources", async ({ page }) => {
  const problems: string[] = [];
  page.on("pageerror", (error) => problems.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") problems.push(message.text());
  });
  page.on("requestfailed", (request) => problems.push(request.url()));

  await page.goto("");
  await revealAll(page);

  expect(problems).toEqual([]);
});

for (const viewport of [phone, desktop]) {
  test(`fits the screen and shows every section at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("");
    await revealAll(page);

    const layout = await page.evaluate(() => ({
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
      faded: [...document.querySelectorAll<HTMLElement>("[style*=opacity]")]
        .filter((element) => Number(getComputedStyle(element).opacity) < 1)
        .map((element) => element.textContent.slice(0, 40)),
    }));

    expect(layout).toEqual({ overflow: 0, faded: [] });
    await expect(page.locator("#resume article")).toHaveCount(5);
  });
}

test("the nav marks the section you jump to", async ({ page }) => {
  await page.setViewportSize(desktop);
  await page.goto("");
  const nav = page.getByRole("navigation", { name: "Sections" });

  await nav.getByRole("link", { name: "Experience" }).click();

  await expect(nav.getByRole("link", { name: "Experience" })).toHaveAttribute(
    "aria-current",
    "location",
  );
});

test.describe("with motion on", () => {
  test.use({ reducedMotion: "no-preference" });

  test("Reduce motion toggle applies and remembers the choice", async ({
    page,
  }) => {
    await page.goto("");
    const toggle = page.getByRole("button", { name: "Reduce motion" });
    await expect(toggle).toHaveAttribute("aria-pressed", "false");

    await toggle.click();
    await page.reload();

    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("html")).toHaveAttribute("data-motion", "reduce");
  });
});
