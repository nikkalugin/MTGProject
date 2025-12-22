class FooterScreen {
    get homeBtn() {
        return $('~Home\nTab 1 of 5');
    }

    get searchBtn() {
        return $('~Search\nTab 2 of 5');
    }

    get collectionBtn() {
        return $('~Collection\nTab 3 of 5');
    }

    get decksBtn() {
        return $('~Decks\nTab 4 of 5');
    }

    get scanBtn() {
        return $('~Scan\nTab 5 of 5');
    }

    async openHomeScreen() {
        await expect(this.homeBtn).toBeDisplayed();
        await this.homeBtn.click();
    }

    async openSearchScreen() {
        await expect(this.searchBtn).toBeDisplayed();
        await this.searchBtn.click();
    }

    async openCollectionScreen() {
        await expect(this.collectionBtn).toBeDisplayed();
        await this.collectionBtn.click();
    }

    async openDecksScreen() {
        await expect(this.decksBtn).toBeDisplayed();
        await this.decksBtn.click();
    }

    async openScanScreen() {
        await expect(this.scanBtn).toBeDisplayed();
        await this.scanBtn.click();
    }
}

export default new FooterScreen();