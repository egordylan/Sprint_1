const userLogin = 'JohnyBravo';
const userPasswordInvalid = 'password1';
const mainLink = 'https://automationteststore.com/';


describe('Login', async function () {

	it('Open the page', async function() {
        await browser.url(mainLink);
        await browser.waitUntil(async function() {
			return (await browser.getTitle()) === 'A place to practice your automation skills!'}, 
			{timeout: 5000, 
			timeoutMsg:'expected text to be different after 5s'});
	});

    it(`shouldn't logged in: '${userLogin}', '${userPasswordInvalid}'`, async function () {
		const link = await $('a[href="https://automationteststore.com/index.php?rt=account/login"]');
        const loginSelector = await $('#loginFrm_loginname');
        const passwordSelector = await $('#loginFrm_password');
        const button = await $('button[title="Login"]');

		await link.click();
        await loginSelector.setValue(userLogin );
        await passwordSelector.setValue(userPasswordInvalid);
        await button.click();

        const alertTitle = await $('.alert.alert-error.alert-danger');
        await expect(alertTitle).toBeDisplayed();
		await expect(alertTitle).toHaveTextContaining('Error: Incorrect login or password provided.');
    });
});

// npx wdio run wdio.conf.js --spec login_smoke_case_negative.js
