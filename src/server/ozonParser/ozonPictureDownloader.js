const puppeteer = require('puppeteer');
const fs = require('fs');

async function imageParser(url) {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1200 });
  await page.goto(`${url}`);
  await page.waitFor(20);
  // await page.waitFor(1000);

  const IMAGE_SELECTOR =
    '#__layout > div > div.block-vertical > div:nth-child(4) > div > div.top > div.top-image-column > div.gallery > div > div.view-component.preview-component > div > div.img._96fa6.magnifier-image.shown > img';
  const imageHref = await page.evaluate(sel => {
    return document
      .querySelector(sel)
      .getAttribute('src')
      .replace('/', '');
  }, IMAGE_SELECTOR);

  console.log(imageHref);
  const viewSource = await page.goto(imageHref);
  const picFileName = `productImage${Date.now()}.jpg`;
  fs.writeFile(
    `src/server/public/${picFileName}`,
    await viewSource.buffer(),
    function(err) {
      if (err) {
        return console.log(err);
      }
      console.log('The file was saved!');
    }
  );
  browser.close();
  return picFileName;
}
export default imageParser;
