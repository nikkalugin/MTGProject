class HomeScreen {
    get homeHeading() {
        return $('~Home');
    }

    get settingsBtn() {
        return $('~Settings');
    }

    async verifyHomePageIsOpen() {
        await this.homeHeading.waitForDisplayed();
        await expect(this.homeHeading).toBeDisplayed();
    }

    async openSettingsScreen() {
        await this.settingsBtn.click();
    }
}

export default new HomeScreen();