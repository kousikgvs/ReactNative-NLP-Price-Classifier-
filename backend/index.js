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

// function subcategory(number_elements) {
//   console.log("I am in subcategory function");
//   console.log("Number of elements:", number_elements.length);

//   // Iterate over every element in the array
//   for (let i = 0; i < number_elements.length - 8; i++) {
//     // console.log("Processing element", i, ":", number_elements[i]);
    
//     let base_subcategory_url = "https://www.zeptonow.com/cn/cleaning-essentials/repellents/cid/1a7e46a8-e627-450f-8960-490b550eeee6/scid/";
//     let sub_category_url = base_subcategory_url + number_elements[i];
    
//     // TODO: Send a request to sub_category_url and extract information
//     // Use puppeteer to navigate to sub_category_url and extract required information

//     (async () => {
//         const browser = await puppeteer.launch({headless: 'new'});
//         const page = await browser.newPage();
//       await page.goto(sub_category_url , {timeout: 60000});
//       console.log(sub_category_url);

//       // Extract information based on your instructions
//       const subcategoryData = await page.evaluate(() => {
//         const items = [];

// /**
//  * 
//  * <a id="store-product-e526dd02-ffe0-4176-bef7-c5c2dffa9ba1" class="cursor-pointer rO1D6k baI2eg   !p-3"

// The above tag has 3 sub elements 

// 1st subelement -> <div class="z-[100] absolute overflow-hidden top-0 left-0 ">
//                   This subelement has img tag extract image element url from here store as discount image
// 1st sub element ends here
// ---------------------------------------------------
// 2nd sub element -> div class="relative h-[50%]"> 
// 		   This Tag has further elements in it <div class="relative Zr3QsB">
//  						       Now <div class="relative Zr3QsB"> has img tag in it extract it store as product_image url
// 2nd sub element ends here
// ---------------------------------------------------
// 3rd sub element has follwoing code below
// <div class=""><h4 class="block font-norms Md1FKI  vhtkim !text-sm sm:!text-base mb-2 ">Ariel Matic Front Load Liquid Detergent</h4><span><h4 class="block font-norms Md1FKI  j7HcYM !font-normal  text-skin-primary-void/70 !text-2xs sm:!text-base">2 Liter</h4></span></div>

// get the data from h4 tag and store it as Product name
// get the data from <span> tag which has h4 tag and store it as product quantity

// ---------------------------------------------------
//  * 
//  * 
//  * 
//  */

//         return items;
//       });

//       console.log(subcategoryData);

//       await browser.close();
//     })();
//   }
// }

async function subcategory(number_elements) {
    console.log("I am in subcategory function");
    console.log("Number of elements:", number_elements.length);
  
    for (let i = 0; i < number_elements.length - 8; i++) {
      let base_subcategory_url = "https://www.zeptonow.com/cn/cleaning-essentials/repellents/cid/1a7e46a8-e627-450f-8960-490b550eeee6/scid/";
      let sub_category_url = base_subcategory_url + number_elements[i];
  
      const browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();
      await page.goto(sub_category_url, { timeout: 60000 });
  
      console.log(sub_category_url);
  
      const subcategoryData = await page.evaluate(() => {
        const items = [];
  
        const productElements = document.querySelectorAll('a.cursor-pointer.rO1D6k.baI2eg');
  
        productElements.forEach((productElement) => {
          const item = {};
  
          // Extract discount image URL
          const discountImg = productElement.querySelector("div.z-100.absolute.overflow-hidden.top-0.left-0 img");
          item.discountImage = discountImg ? discountImg.getAttribute('src') : null;
  
          // Extract product image URL
          const productImg = productElement.querySelector('div.relative.h-50 div.relative.Zr3QsB img');
          item.productImage = productImg ? productImg.getAttribute('src') : null;
  
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
  