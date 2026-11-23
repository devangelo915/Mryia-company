/* Local-only: boot memory Mongo + next start, screenshot every admin section, exit. */
const { spawn } = require("child_process");
const fs = require("fs");

const SECTIONS = ["home","hero","about","impact","stats","services","team","news","videos","heads","contact","footer","account"];
const SECTION_LABELS = {
  home: "الرئيسية", hero: "الواجهة الرئيسية", about: "عن المركز", impact: "إحصائيات الأداء",
  stats: "إحصائيات الإنتاج", services: "الخدمات", team: "الفريق", news: "الأخبار",
  videos: "الفيديوهات", heads: "عناوين الأقسام", contact: "التواصل والسوشيال", footer: "التذييل", account: "الحساب",
};

async function main() {
  const { MongoMemoryServer } = require("mongodb-memory-server");
  const mms = await MongoMemoryServer.create();
  const uri = mms.getUri("mryia");
  console.log("mongo up");

  const server = spawn("npx", ["next", "start", "-p", "3100"], {
    env: { ...process.env, MONGODB_URI: uri, ADMIN_PASSWORD: "test123456" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.stderr.on("data", (d) => process.stderr.write(d));

  // wait for server
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch("http://localhost:3100/api/admin/status");
      if (r.ok) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  console.log("next up");

  fs.mkdirSync("/tmp/shots", { recursive: true });
  const puppeteer = require("puppeteer");
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--font-render-hinting=none"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  await page.goto("http://localhost:3100/admin", { waitUntil: "networkidle0", timeout: 60000 });
  await page.waitForSelector('input[type="email"]', { timeout: 30000 });
  await page.type('input[type="email"]', "admin@mraya-konda.com");
  await page.type('input[type="password"]', "test123456");
  await page.click('button[type="submit"]');
  await page.waitForFunction(() => document.body.innerText.includes("أهلاً بك في لوحة تحكم مرايا"), { timeout: 30000 });
  console.log("logged in");

  for (const id of SECTIONS) {
    const label = SECTION_LABELS[id];
    const clicked = await page.evaluate((lbl) => {
      const btn = [...document.querySelectorAll("button")].find((b) => (b.innerText || "").trim() === lbl);
      if (btn) { btn.click(); return true; }
      return false;
    }, label);
    if (!clicked) { console.log("NAV MISS", id); continue; }
    await new Promise((r) => setTimeout(r, 1400));
    await page.screenshot({ path: `/tmp/shots/${String(SECTIONS.indexOf(id) + 1).padStart(2, "0")}-${id}.png`, fullPage: true });
    console.log("shot", id);
  }

  await browser.close();
  server.kill("SIGTERM");
  await mms.stop();
  console.log("done");
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
