// Captures the preloader at fixed moments. Usage: node scripts/intro.mjs <outDir> [width]
import { chromium } from "playwright-core";
const [out = "_shots", w = "1440"] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const p = await b.newPage({ viewport: { width: +w, height: 900 } });
await p.goto("http://127.0.0.1:3047/", { waitUntil: "domcontentloaded" });
const t0 = Date.now();
for (const t of [400, 1000, 1600, 2150, 2450, 3200]) {
  await p.waitForTimeout(Math.max(0, t - (Date.now() - t0)));
  await p.screenshot({ path: `${out}/intro-${t}.jpg`, type: "jpeg", quality: 60 });
}
await b.close();
