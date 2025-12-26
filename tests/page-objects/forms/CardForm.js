import { findElementByNormalizedText } from "../../helpers/appStatesHelper";

class CardForm {
    get rulingStats() {
        return $(`~Ruling`);
    }

    get optionsBtn() {
        return $(`//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View/android.view.View[2]/android.widget.Button`);
    }

    get addToCollectionBtn() {
        return $(`~Add to collection`);
    }

    get addToDeckBtn() {
        return $(`~Add to deck`);
    }

    get shareCardImageBtn() {
        return $(`~Share card image`);
    }

    get previousCardBtn() {
        return $(`//android.widget.ScrollView/android.view.View[2]/android.view.View`);
    } // it also nextCardBtn in case, when only one button is present

    get nextCardBtn() {
        return $(`//android.widget.ScrollView/android.view.View[3]/android.view.View`);
    }

    async openOptionsMenu() {
        await this.optionsBtn.click();
    }

 //*----------------------- List of actions -----------------------*\\

    async clickAddToCollectionBtn() {
        await this.addToCollectionBtn.click();
    }

    async clickAddToDeckBtn() {
        await this.addToDeckBtn.click();
    }

    async clickShareCardImageBtn() {
        await this.shareCardImageBtn.click();
    }

    async verifyValueAppeared(value) {
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

    async openRulingStats() {
        await this.rulingStats.click();
    }

    async openNextSecondCard() {
        await this.previousCardBtn.click();
    }

    async openPreviousCard() {
        await this.previousCardBtn.click();
    }

    async openNextCard() {
        await this.nextCardBtn.click();
    }
}

export default new CardForm();