const {login} = require('./helper.js');
const userLogin = 'JohnyBravo';
const userPassword = 'password123';
const mainLink = 'https://automationteststore.com/';
const cathegory = '.nav-pills > li:nth-child(8)';
const subCathegory = 'a[href="https://automationteststore.com/index.php?rt=product/category&path=65_67"]';
const item = 'a[title="Allegiant by Veronica Roth"]';
const quantitySelkector = 'input[name="quantity"]';
const quantity = '1';
const addToCart = '.cart';
const itemTitle = '.align_left > a';
const itemNameForCheck = 'Allegiant by Veronica Roth';
const checkout = '#cart_checkout1';


describe('Shoping card flow behalf of login user', async function () {
    before('Login', async function () {
        await browser.maximizeWindow();
        await browser.url(mainLink);
        await browser.waitUntil(async function() {
			return (await browser.getTitle()) === 'A place to practice your automation skills!'}, 
			{timeout: 5000, 
			timeoutMsg:'expected text to be different after 5s'});
        await login(userLogin, userPassword);
        await (await $('.active.menu_home')).click();
    });

    context('adding goods: ', async function () {
        it(`choose a cathegory of goods`, async function () {
            await (await $(cathegory)).moveTo();
            await (await $(subCathegory)).click();
            
            await (await $(item)).scrollIntoView();
            await (await $(item)).click();

            await (await $(quantitySelkector)).clearValue();
            await (await $(quantitySelkector)).setValue(quantity);

            await (await $(addToCart)).click();
            expect (await browser.getTitle()).toBe('Shopping Cart'); 
        });

        it(`check the cart and checkout`, async function () {
            await expect(await $(itemTitle)).toHaveText(itemNameForCheck);

            const itemQuantity = await (await $('#cart_quantity114')).getValue();
            await expect(itemQuantity).toEqual(quantity);

            await (await $(checkout)).click();
        });

        it(`check confirmation and confirm order`, async function () {
            expect (await browser.getTitle()).toBe('Checkout Confirmation');

            const checkoutBtn = await $('#checkout_btn');
            await checkoutBtn.scrollIntoView();
            await (await $('#checkout_btn')).click()
            
            
            await browser.waitUntil(async function() {
               return (await browser.getTitle()) === 'Your Order Has Been Processed!'}, 
               {timeout: 5000, 
               timeoutMsg:'expected text to be different after 5s'});
            expect(await browser.getTitle()).toBe('Your Order Has Been Processed!')
        });
    });

});

// npx wdio run wdio.conf.js --spec shopping_card_flow_behalf_of_login_user.js
