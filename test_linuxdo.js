import { connect } from "puppeteer-bypass-cf";

while (true) {
  console.log("Start of test.js");
  const { page, browser } = await connect({
    headless: false,
    args: [],
    customConfig: {},
    skipTarget: [],
    fingerprint: false,
    turnstile: true,
    connectOption: {},
  });
  var cl = setInterval(() => {
    page
      .screenshot({ path: "example.png", fullPage: true })
      .catch((e) => console.log(e.message));
  }, 1000);
  console.log("Connected to browser");
  // https://nopecha.com/demo/cloudflare  https://linux.do
  await page.goto("https://nopecha.com/demo/cloudflare", {
    waitUntil: "domcontentloaded",
  });
  console.log("Navigated to page");
  await page.waitForSelector(".link_row", {
    timeout: 60000,
  });
  // await page.screenshot({ path: 'example.png' });
  clearInterval(cl);
  await browser.close();
  console.log("End of test.js");
}
