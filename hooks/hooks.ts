import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture";
import { getEnv } from "../helper/env/env";
import { options } from "../helper/util/logger";
import { createLogger } from "winston";
import { invokeBrowser } from "../helper/browsers/browserManager";
import fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function() {
  getEnv();
  browser = await invokeBrowser();
})

Before({ tags: "@skip" }, async function () {
  return 'pending';
});

Before({ tags: "@ui" },async function ({ pickle }) {
  const scenarioName = pickle.name + pickle.id;
  context = await browser.newContext({
    recordVideo: {
      dir: "test-results/report/videos"
    }
  });
  await context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true, snapshots: true
  });
  const page = await context.newPage();
  fixture.page = page;
  fixture.logger = createLogger(options(scenarioName));
})

After({ tags: "@ui" }, async function ({ pickle }) {
  if (!fixture.page || !fixture.page.screenshot) {
    console.warn(`⚠️ Página não inicializada — pulando pós-condições de teardown para: ${pickle.name}`);
    return;
  }

  const path = `./test-results/report/trace/${pickle.id}.zip`;
  const img = await fixture.page.screenshot({
    path: `./test-results/report/screenshots/${pickle.name}.png`,
    type: "png"
  });
  const videoPath = await fixture.page.video()?.path();

  await context.tracing.stop({ path });
  await fixture.page.close();
  await context.close();

  this.attach(img, "image/png");

  if (videoPath) {
    const video = fs.readFileSync(videoPath);
    await this.attach(video, "video/webm");
  }
});

AfterAll(async function () {
  await browser.close();
});