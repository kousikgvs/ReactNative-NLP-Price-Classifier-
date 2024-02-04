const puppeteer = require('puppeteer');

let number_elements = [];

(async () => {
    const browser = await puppeteer.launch({headless: 'new'});
  const page = await browser.newPage();

  await page.goto('https://www.zeptonow.com/cn/cleaning-essentials/liquid-detergents-additives/cid/1a7e46a8-e627-450f-8960-490b550eeee6/scid/dfb37880-b40f-4783-9502-a56e12edbabc');

  await page.waitForSelector('.lCuCWJ');

  const data = await page.evaluate(() => {
    const elements = [];
    var number_id = [];

    const divs = document.querySelectorAll('div[id^="sub-catgory-item-"]');

    divs.forEach(div => {
      const item = {};

      const numberId = div.id.replace('sub-catgory-item-', '');
      item.numberId = numberId;
      number_id.push(numberId);

      const img = div.querySelector('div._GGWtn img');
      item.imageSrc = img ? img.getAttribute('src') : null;

      const p = div.querySelector('p.block.font-norms.bkxfwE.vhtkim._87jUC3');
      item.text = p ? p.textContent.trim() : null;

      elements.push(item);
    });

    return { elements, number_id };
  });

  console.log(data.elements);
  number_elements = data.number_id;

  // Log inside the async function or use a Promise
  // console.log(number_elements);
  subcategory(number_elements);

  await browser.close();
})();


async function subcategory(number_elements) {
    console.log("I am in subcategory function");
    console.log("Number of elements:", number_elements.length);
  
    for (let i = 0; i < number_elements.length ; i++) {
      let base_subcategory_url = "https://www.zeptonow.com/cn/cleaning-essentials/repellents/cid/1a7e46a8-e627-450f-8960-490b550eeee6/scid/";
      let sub_category_url = base_subcategory_url + number_elements[i];
  
      const browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();
      await page.goto(sub_category_url, { timeout: 100000 });
  
      console.log(sub_category_url);
  
      const subcategoryData = await page.evaluate(() => {
        const items = [];
  
        const productElements = document.querySelectorAll('a.cursor-pointer.rO1D6k.baI2eg');
  
        productElements.forEach((productElement) => {
          const item = {};
  
          // const productImg = productElement.querySelector('div.relative h-[50%] div.relative.Zr3QsB img');
          const productImg = productElement.querySelector('.relative.h-\\[50\\%\\] .relative.Zr3QsB img');
          item.productImage = productImg ? productImg.getAttribute('srcset') : null;
          
  
          // Extract product name and quantity
          const productName = productElement.querySelector('div h4.block.font-norms.Md1FKI.vhtkim').textContent.trim();
          const productQuantity = productElement.querySelector('div span h4.block.font-norms.Md1FKI.j7HcYM').textContent.trim();
  
          item.productName = productName;
          item.productQuantity = productQuantity;
  
          items.push(item);
        });
  
        return items;
      });
  
      console.log(subcategoryData);
  
      await browser.close();
    }
  }
  