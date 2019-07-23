const puppeteer = require('puppeteer');

const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.ozon.ru/context/detail/id/136937722/');
  await page.waitFor(100);
  // Код для скрапинга
  const result = await page.evaluate(() => {
    const title = document.querySelector('h1').innerText;
    const price = document.querySelector("meta[itemprop='price']").content;
    const pictureUrl = document.querySelector("meta[itemprop='image']").content; // Large picture
    // Small pic here: const pictureUrl = document.querySelector('._615bd').src;
    return {
      title,
      price,
      pictureUrl
    };
  });
  browser.close();
  return result;
};

scrape().then(value => {
  console.log(value);
});
