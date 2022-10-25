const userLogin = 'JohnyBravo';
const userPassword = 'password123';
const mainLink = 'https://automationteststore.com/';


describe('Login', async function () {
    it('Open the page', async function() {
        await browser.url(mainLink);
        await browser.waitUntil(async function() {
			return (await browser.getTitle()) === 'A place to practice your automation skills!'}, 
			{timeout: 5000, 
			timeoutMsg:'expected text to be different after 5s'});
	});

    it(`should logged in: '${userLogin}', '${userPassword}'`, async function () {
        const link = await $('a[href="https://automationteststore.com/index.php?rt=account/login"]');
        const loginSelector = await $('#loginFrm_loginname');
        const passwordSelector = await $('#loginFrm_password');
        const button = await $('button[title="Login"]');
 
        await link.click();
        await loginSelector.setValue(userLogin );
        await passwordSelector.setValue(userPassword);
        await button.click();
    });
    

    it(`confirm that user '${userLogin} logged in'`, async function () {
        const userTitle = await $('.subtext');
        const name = await userTitle.getText();
        expect (await browser.getTitle()).toBe('My Account'); 
        await expect(name).toEqual('Johny');
    });
    
});

// npx wdio run wdio.conf.js --spec login_smoke_case.js
