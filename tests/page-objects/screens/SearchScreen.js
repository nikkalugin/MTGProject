import { hideKeyboard, findElementByNormalizedText } from "../../helpers/appStatesHelper";

class SearchScreen {
    get searchScreen() {
        return $(`id=android:id/content`);
    }

    get cardsTab() {
        return $(`~Cards\nTab 1 of 2`);
    }

    get setsTab() {
        return $(`~Sets\nTab 2 of 2`);
    }

    get searchField() {
        return $(`android=new UiSelector().className("android.widget.EditText").instance(0)`);
    }

    get xBtn() {
        return $(`android=new UiSelector().className("android.view.View").instance(8)`);
    }

    get foundedCard() {
        return $(`~-\nBlack Lotus`);
    }

    get binBtn() {
        return $(`//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View/android.widget.Button[1]`);
    }

    get approveBtn() {
        return $(`//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View/android.widget.Button[2]`);
    }

    get moreBtn() {
        return $(`~More`);
    }

    get lessBtn() {
        return $(`~Less`);
    }

    get typeLineDropdown() {
        return $(`android=new UiSelector().className("android.widget.EditText").instance(1)`);
    }

    get statsDropdown() {
        return $(`android=new UiSelector().className("android.widget.EditText").instance(2)`);
    }

    get addBtnForStatsDropdown() {
        return $(`(//android.widget.Button[@content-desc="Add"])[1]`);
    }

    get firstCardOnList() {
        return $$('android.widget.ImageView')[0];
    }

    get secondCardOnList() {
        return $$(`android.widget.ImageView`)[1];
    }

    get languageList() {
        return $(`~Language`);
    }

 //*----------------------- List of actions -----------------------*\\

    async verifyCardIsDisplayed(cardName) {
        const card = $(`//android.widget.ImageView[contains(@content-desc, "${cardName}")]`);
        await expect(card).toBeDisplayed();
    }

    async verifyLanguageValueIsDisplayed(value) {
        const language = $(`//android.widget.Button[contains(@content-desc, "${value}")]`);
        await expect(language).toBeDisplayed();
    }

    async verifyLegalityFilterValueIsDisplayed(value) {
        const parts = Array.isArray(value) ? value : value.split(' ').filter(Boolean);

        const containsConditions = parts.map(part => `contains(@content-desc, "${part}")`).join(' and ');
        
        const legality = $(`//android.view.View[${containsConditions}]`);
        await expect(legality).toBeDisplayed();
    }

    async verifySetRecordIsDisplayed(name) {
        const parts = Array.isArray(name) ? name : name.split(' ').filter(Boolean);

        const containsConditions = parts.map(part => `contains(@content-desc, "${part}")`).join(' and ');
       
        const setRecord = $(`//android.widget.Button[${containsConditions}]`);
        await expect(setRecord).toBeDisplayed();
    }

    async verifySetHeadingIsDisplayed(name) {
        const parts = Array.isArray(name) ? name : name.split(' ').filter(Boolean);

        const containsConditions = parts.map(part => `contains(@content-desc, "${part}")`).join(' and ');
       
        const setHeading = $(`//android.view.View[${containsConditions}]`);
        await expect(setHeading).toBeDisplayed();
    }

    async openFirstCardOnList() {
        await this.firstCardOnList.click();
    }

    async openSecondCardOnList() {
        await this.secondCardOnList.click();
    }

    async verifySearchScreenIsOpen() {
        await expect(this.searchScreen).toBeDisplayed();
    }

    async addStatsValue(value) {
        await this.statsDropdown.click();
        await this.statsDropdown.setValue(value);
        await hideKeyboard();
        await this.addBtnForStatsDropdown.click();
    }

    async openSetsTab() {
        await this.setsTab.click();
    }

    async openCardsTab() {
        await this.cardsTab.click();
    }

    async fillInValueIntoSearch(value) {
        await this.searchField.click();
        await this.searchField.setValue(value);
        await hideKeyboard();
    }

    async verifySearchFieldHasValue(value) {
        const searchValue = $(`//android.widget.EditText[@text="${value}"]`)
        await expect(searchValue).toHaveText(value);
    } 

    async clickXBtn() {
        await this.xBtn.click();
    }

    async verifyFilterValueIsntVisible(value) {
        const fitlerValue = $(`~${value}`);
        await expect(fitlerValue).not.toBeDisplayed();
    }

    async clickFilterLegalityValue(value) {
        const matchedElements = await findElementByNormalizedText(value);
        if (matchedElements.length !== 1) {
            throw new Error(
                `Expected exactly 1 element with text "${value}", but found ${matchedElements.length}`
            );
        }
        const element = matchedElements[0];
        await element.waitForDisplayed();
        await element.click();
    }

    async verifyFilterConditionsAreDisplayed(values) {
        const expectedValues = Array.isArray(values) ? values : [values];

        for (const value of expectedValues) {
            const matchedElements = await findElementByNormalizedText(value);
            if (matchedElements.length !== 1) {
                throw new Error(
                    `Expected exactly 1 element with text "${value}", but found ${matchedElements.length}`
                );
            }
            const element = matchedElements[0];
            await element.waitForDisplayed();
            await expect(element).toBeDisplayed();
        }
    }

    async clickNecessarySetRecord(value) {
        const matchedElements = await findElementByNormalizedText(value);
        if (matchedElements.length !== 1) {
            throw new Error(
                `Expected exactly 1 element with text "${value}", but found ${matchedElements.length}`
            );
        }
        const element = matchedElements[0];
        await element.waitForDisplayed();
        await element.click();
    }

    async clickNecessaryLanguageValue(value) {
        const matchedElements = await findElementByNormalizedText(value);
        if (matchedElements.length !== 1) {
            throw new Error(
                `Expected exactly 1 element with text "${value}", but found ${matchedElements.length}`
            );
        }
        const element = matchedElements[0];
        await element.waitForDisplayed();
        await element.click();
    }

    async verifyLanguageListIsOpen() {
        await expect(this.languageList).toBeDisplayed();
    }

    async clickBinBtn() {
        await this.binBtn.click();
    }

    async clickApproveBtn() {
        await this.approveBtn.click();
    }

    async openMoreFilterValues() {
        await this.moreBtn.click();
    }

    async closeFilterValues() {
        await this.lessBtn.click();
    }

    async fillInTypeLineValue(value) {
        await this.typeLineDropdown.click();
        await this.typeLineDropdown.setValue(value);
        await hideKeyboard();
    }
}

export default new SearchScreen();