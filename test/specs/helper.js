async function login (login, password) {
    const loginSelector = await $('#loginFrm_loginname');
    const passwordSelector = await $('#loginFrm_password');
    const button = await $('button[title="Login"]');
    const link = await $('a[href="https://automationteststore.com/index.php?rt=account/login"]');

    await link.click();
    await loginSelector.setValue(login);
    await passwordSelector.setValue(password);
    await button.click();

    const userTitle = await $('.subtext');  
    const name = await userTitle.getText();
    expect (await browser.getTitle()).toBe('My Account'); 
    await expect(name).toEqual('Johny');
}   


module.exports = {login};