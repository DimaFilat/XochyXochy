// const puppeteer = require('puppeteer');

// const scrape = async url => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(`${url}`);
//   await page.waitFor(20);

//   const result = await page.evaluate(() => {
//     const title = document.querySelector('h1').innerText;
//     const price = document.querySelector("meta[itemprop='price']").content;
//     // const pictureUrl = document.querySelector("meta[itemprop='image']").content; // Large picture
//     // Small pic here: 
//     const pictureUrl = document.querySelector('._615bd').src;
//     return {
//       title,
//       price,
//       pictureUrl
//     };
//   });
//   browser.close();
//   return result;
// };

// export default scrape;
