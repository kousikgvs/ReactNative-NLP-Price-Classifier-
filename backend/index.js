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
  
    for (let i = 0; i < number_elements.length; i++) {
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
  
          // Replace the below to get text instaed of image from
          
          //  <p  class="absolute top-0 text-center text-[0.6rem] leading-3 font-title text-white" this tag is present in div.z-100.absolute.overflow-hidden.top-0.left-0
        // div.z-100.absolute.overflow-hidden.top-0.left-0 
        const discountImg = productElement.querySelector("div.z-100.absolute.overflow-hidden.top-0.left-0 img");
        item.discountImage = discountImg ? discountImg.getAttribute('srcset') : null;
        
          // Extract product image URL
          /**
           * <div class="relative h-[50%]"><div class="relative Zr3QsB"><img alt="Ariel Matic Top Load Liquid Detergent" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" srcset="https://cdn.zeptonow.com/production///tr:w-200,ar-1021-1021,pr-true,f-auto,q-80/cms/product_variant/81f41af9-4ac6-4cf4-b169-edb6b500168c.jpeg 256w, https://cdn.zeptonow.com/production///tr:w-200,ar-1021-1021,pr-true,f-auto,q-80/cms/product_variant/81f41af9-4ac6-4cf4-b169-edb6b500168c.jpeg 384w, https://cdn.zeptonow.com/production///tr:w-200,ar-1021-1021,pr-true,f-auto,q-80/cms/product_variant/81f41af9-4ac6-4cf4-b169-edb6b500168c.jpeg 640w, https://cdn.zeptonow.com/production///tr:w-200,ar-1021-1021,pr-true,f-auto,q-80/cms/product_variant/81f41af9-4ac6-4cf4-b169-edb6b500168c.jpeg 750w, https://cdn.zeptonow.com/production///tr:w-200,ar-1021-1021,pr-true,f-auto,q-80/cms/product_variant/81f41af9-4ac6-4cf4-b169-edb6b500168c.jpeg 828w, https://cdn.zeptonow.com/production///tr:w-200,ar-1021-1021,pr-true,f-auto,q-80/cms/product_variant/81f41af9-4ac6-4cf4-b169-edb6b500168c.jpeg 1080w, https://cdn.zeptonow.com/production///tr:w-200,ar-1021-1021,pr-true,f-auto,q-80/cms/product_variant/81f41af9-4ac6-4cf4-b169-edb6b500168c.jpeg 1200w, https://cdn.zeptonow.com/production///tr:w-200,ar-1021-1021,pr-true,f-auto,q-80/cms/product_variant/81f41af9-4ac6-4cf4-b169-edb6b500168c.jpeg 1920w, https://cdn.zeptonow.com/production///tr:w-200,ar-1021-1021,pr-true,f-auto,q-80/cms/product_variant/81f41af9-4ac6-4cf4-b169-edb6b500168c.jpeg 2048w, https://cdn.zeptonow.com/production///tr:w-200,ar-1021-1021,pr-true,f-auto,q-80/cms/product_variant/81f41af9-4ac6-4cf4-b169-edb6b500168c.jpeg 3840w" src="https://cdn.zeptonow.com/production///tr:w-200,ar-1021-1021,pr-true,f-auto,q-80/cms/product_variant/81f41af9-4ac6-4cf4-b169-edb6b500168c.jpeg" decoding="async" data-nimg="fill" class="relative overflow-hidden false " style="position: absolute; height: 100%; width: 100%; inset: 0px; object-fit: contain; color: transparent;"></div><div class="relative flex justify-between -mx-1 bottom-5"><div class="z-[100] absolute overflow-hidden rounded -right-1"><img alt="P3 - Ad.png" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" srcset="https://cdn.zeptonow.com/production///tr:w-120,ar-28-28,pr-true,f-auto,q-80/inventory/product/55a80cdc-a78d-4408-9913-9d89423e171f-P3_-_Ad.png 256w, https://cdn.zeptonow.com/production///tr:w-120,ar-28-28,pr-true,f-auto,q-80/inventory/product/55a80cdc-a78d-4408-9913-9d89423e171f-P3_-_Ad.png 384w, https://cdn.zeptonow.com/production///tr:w-120,ar-28-28,pr-true,f-auto,q-80/inventory/product/55a80cdc-a78d-4408-9913-9d89423e171f-P3_-_Ad.png 640w, https://cdn.zeptonow.com/production///tr:w-120,ar-28-28,pr-true,f-auto,q-80/inventory/product/55a80cdc-a78d-4408-9913-9d89423e171f-P3_-_Ad.png 750w, https://cdn.zeptonow.com/production///tr:w-120,ar-28-28,pr-true,f-auto,q-80/inventory/product/55a80cdc-a78d-4408-9913-9d89423e171f-P3_-_Ad.png 828w, https://cdn.zeptonow.com/production///tr:w-120,ar-28-28,pr-true,f-auto,q-80/inventory/product/55a80cdc-a78d-4408-9913-9d89423e171f-P3_-_Ad.png 1080w, https://cdn.zeptonow.com/production///tr:w-120,ar-28-28,pr-true,f-auto,q-80/inventory/product/55a80cdc-a78d-4408-9913-9d89423e171f-P3_-_Ad.png 1200w, https://cdn.zeptonow.com/production///tr:w-120,ar-28-28,pr-true,f-auto,q-80/inventory/product/55a80cdc-a78d-4408-9913-9d89423e171f-P3_-_Ad.png 1920w, https://cdn.zeptonow.com/production///tr:w-120,ar-28-28,pr-true,f-auto,q-80/inventory/product/55a80cdc-a78d-4408-9913-9d89423e171f-P3_-_Ad.png 2048w, https://cdn.zeptonow.com/production///tr:w-120,ar-28-28,pr-true,f-auto,q-80/inventory/product/55a80cdc-a78d-4408-9913-9d89423e171f-P3_-_Ad.png 3840w" src="https://cdn.zeptonow.com/production///tr:w-120,ar-28-28,pr-true,f-auto,q-80/inventory/product/55a80cdc-a78d-4408-9913-9d89423e171f-P3_-_Ad.png" width="16" height="16" decoding="async" data-nimg="1" class="relative overflow-hidden false " loading="lazy" style="color: transparent; object-fit: contain;"></div></div></div>
           */
          const productImg = productElement.querySelector('div.relative.h-50 div.relative.Zr3QsB img');
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
  