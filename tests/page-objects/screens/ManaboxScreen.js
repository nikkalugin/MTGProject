class ManaboxScreen {
    get manaboxHeading() {
        return $('~ManaBox Account');
    }

    get registerBtn() {
        return $('~Register');
    }

    get signInBtn() {
        return $('~Sign in');
    }

    async verifyManaboxScreenIsOpen() {
        await expect(this.manaboxHeading).toBeDisplayed();
    }

    async clickRegisterBtn() {
        await this.registerBtn.click();
    }

    async clickSignInBtn() {
        await this.signInBtn.click();
    }
}

export default new ManaboxScreen();