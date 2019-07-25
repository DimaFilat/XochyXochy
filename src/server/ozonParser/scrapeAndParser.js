const puppeteer = require('puppeteer');
const fs = require('fs');

const scrapeAndParser = async url => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${url}`);
  await page.waitFor(20);
  const result = await page.evaluate(() => {
    const title = document.querySelector('h1').innerText;
    const price = document.querySelector("meta[itemprop='price']").content;
    const pictureUrl = document.querySelector("meta[itemprop='image']").content; // Large picture
    // Small pic here:
    // const pictureUrl = document.querySelector('._615bd').src;
    return {
      title,
      price,
      pictureUrl
    };
  });

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
  return { result: { picFileName, ...result } };
};

export default scrapeAndParser;
