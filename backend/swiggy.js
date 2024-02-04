const puppeteer = require('puppeteer');

let number_elements = [];

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.goto('https://www.swiggy.com/instamart/category-listing?categoryName=Cleaning+Essentials&custom_back=true&filterId=639d4a511555a809f1267d24&storeId=1386816&taxonomyType=');

    await page.waitForSelector('.sc-bhqpjJ.jnyQPT', { timeout: 100000 }); // Increased timeout to 60 seconds

    const data = await page.evaluate(() => {
        const elements = [];
        const number_id = [];

        const divs = document.querySelectorAll('.sc-edKZPI.zdrEP');

        divs.forEach(div => {
            const item = {};

            const numberId = div.id.replace('sub-catgory-item-', '');
            item.numberId = numberId;
            number_id.push(numberId);

            const img = div.querySelector('div._GGWtn img');
            item.imageSrc = img ? img.getAttribute('src') : null;

            const p = div.querySelector('p.block.font-norms.bkxfwE.vhtkim._87jUC3');
            item.text = p ? p.textContent.trim() : null;

            // Fetch properties inside ul and li tags
            const ul = div.querySelector('.sc-dycYrt.fsDWwC ul.sc-czkgLR.jmhIjT');
            if (ul) {
                const liList = ul.querySelectorAll('li.sc-SrznA.cFzRji');
                const subItems = [];

                liList.forEach(li => {
                    const subItem = {};

                    const img = li.querySelector('div.image-container img.sc-gEvEer.iZHtRs');
                    subItem.imageSrc = img ? img.getAttribute('src') : null;

                    const title = li.querySelector('div.sc-aXZVg.dKANXe');
                    subItem.title = title ? title.textContent.trim() : null;

                    subItems.push(subItem);
                });

                item.subItems = subItems;
            }

            elements.push(item);
        });

        return { elements, number_id };
    });

    console.log(data.elements);
    number_elements = data.number_id;

    // Log inside the async function or use a Promise
    // console.log(number_elements);
    // subcategory(number_elements);

    await browser.close();
})();
