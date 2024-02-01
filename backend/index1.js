const puppeteer = require('puppeteer');

async function subcategories(numberIds) {
  let results = [];

  for (const numberId of numberIds) {
    let subcategoryData = await scrapeSubcategoryData(numberId);
    results.push(subcategoryData);
  }

  return results;
}

async function scrapeSubcategoryData(numberId) {
  let subcategoryUrl = `https://www.zeptonow.com/cn/cleaning-essentials/repellents/cid/1a7e46a8-e627-450f-8960-490b550eeee6/scid/${numberId}`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(subcategoryUrl);

  // Wait for the div with class 'IS72w1' to load
  await page.waitForSelector('.IS72w1');

  const subcategoryData = await page.evaluate(() => {
    const products = [];

    const productLinks = document.querySelectorAll('a.cursor-pointer.rO1D6k.baI2eg.!p-3');

    productLinks.forEach(link => {
      const product = {};

      const imageDiv = link.querySelector('div.relative.h-[50%] div.relative.Zr3QsB img');
      product.imageSrc = imageDiv ? imageDiv.getAttribute('src') : null;

      const titleDiv = link.querySelector('div h4.block.font-norms.Md1FKI.vhtkim.!text-sm.sm:!text-base.mb-2');
      product.name = titleDiv ? titleDiv.textContent.trim() : null;

      const quantitySpan = link.querySelector('div span.block.font-norms.Md1FKI.j7HcYM.!font-normal.text-skin-primary-void/70.!text-2xs.sm:!text-base');
      product.quantity = quantitySpan ? quantitySpan.textContent.trim() : null;

      const priceDiv = link.querySelector('div.xRRvM1.items-end.!mt-1.sm:mt-4 div._7BB11');
      if (priceDiv) {
        const undiscountedPrice = priceDiv.querySelector('p.block.font-norms.qEiSg9.j7HcYM.line-through.text-skin-primary-void/70.!text-3xs.sm:!text-sm');
        const discountedPrice = priceDiv.querySelector('h4.block.font-norms.Md1FKI.j7HcYM.!text-base');

        product.price = {
          undiscounted: undiscountedPrice ? undiscountedPrice.textContent.trim() : null,
          discounted: discountedPrice ? discountedPrice.textContent.trim() : null,
        };
      }

      products.push(product);
    });

    return products;
  });

  await browser.close();

  return subcategoryData;
}


// Example usage
const numberIds = data.map(category => category.numberId);
subcategories(numberIds)
  .then(results => {
    console.log(results);
  })
  .catch(error => {
    console.error(error);
  });
