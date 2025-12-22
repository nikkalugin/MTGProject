class SettingsScreen {
    get welcomeBtn() {
        return $('~Welcome!\nSetup your ManaBox account');
    }

    async openManaboxAccScreen() {
        await this.welcomeBtn.click();
    }
}

export default new SettingsScreen();