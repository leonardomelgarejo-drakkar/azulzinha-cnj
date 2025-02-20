import { Before, BeforeAll } from "@cucumber/cucumber";
import { getEnv } from "../helper/env/env";

BeforeAll(async function() {
  getEnv();
})

Before({ tags: "@skip" }, async function () {
  return "skipped";
});
