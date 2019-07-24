const puppeteer = require('puppeteer');
const fs = require('fs');

async function imageParser(url) {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1200 });
  await page.goto(`${url}`);
  await page.waitFor(2000);

  const IMAGE_SELECTOR = '#gallery-image-0 > div > img';
  const imageHref = await page.evaluate(sel => {
    return document
      .querySelector(sel)
      .getAttribute('src')
      .replace('/', '');
  }, IMAGE_SELECTOR);

  console.log(imageHref);
  const viewSource = await page.goto(imageHref);
  fs.writeFile(
    'src/server/public/productImage.jpg',
    await viewSource.buffer(),
    function(err) {
      if (err) {
        return console.log(err);
      }
      console.log('The file was saved!');
    }
  );

  browser.close();
}
export default imageParser;