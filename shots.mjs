import { chromium } from "playwright";
const pages = [
  ["/", "home"],
  ["/about", "about"],
  ["/services", "services"],
  ["/projects", "projects"],
  ["/contact", "contact"],
  ["/properties", "properties"],
  ["/properties/sample-apartment-anayara", "property-detail"],
];
const viewports = [[1440, 900, "desktop"], [390, 844, "mobile"]];
const browser = await chromium.launch();
const errors = {};
for (const [w, h, vp] of viewports) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.on("console", (m) => { if (m.type() === "error") (errors[vp] ||= []).push(m.text().slice(0, 200)); });
  page.on("pageerror", (e) => (errors[vp] ||= []).push("PAGEERROR: " + String(e).slice(0, 200)));
  for (const [path, name] of pages) {
    await page.goto("http://127.0.0.1:3000" + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(1600);
    await page.screenshot({ path: `/tmp/shots/${vp}-${name}-top.png` });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.5));
    await page.waitForTimeout(900);
    await page.screenshot({ path: `/tmp/shots/${vp}-${name}-mid.png` });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(900);
    await page.screenshot({ path: `/tmp/shots/${vp}-${name}-bottom.png` });
  }
  await ctx.close();
}
console.log(JSON.stringify(errors, null, 1));
await browser.close();
