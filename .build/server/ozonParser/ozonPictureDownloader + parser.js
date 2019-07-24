'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1200 });
  await page.goto(`https://www.ozon.ru/context/detail/id/146775356/`);

  const IMAGE_SELECTOR = '#gallery-image-0 > div > img';
  let imageHref = await page.evaluate(sel => {
    return document.querySelector(sel).getAttribute('src').replace('/', '');
  }, IMAGE_SELECTOR);

  console.log(imageHref);
  var viewSource = await page.goto(imageHref);
  fs.writeFile('.productImage.jpg', (await viewSource.buffer()), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  });

  // скрапинг
  const scrape = async url => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`${url}`);
    await page.waitFor(20);
    // Код для скрапинга
    const result = await page.evaluate(() => {
      const title = document.querySelector('h1').innerText;
      const price = document.querySelector("meta[itemprop='price']").content;
      const pictureUrl = document.querySelector("meta[itemprop='image']").content; // Large picture
      console.log(title);
      console.log(price);
      console.log(pictureUrl);

      // Small pic here: const pictureUrl = document.querySelector('._615bd').src;
      return {
        title,
        price,
        pictureUrl
      };
    });
    // browser.close();
    return result;
  };
  scrape();

  browser.close();
}

// run();