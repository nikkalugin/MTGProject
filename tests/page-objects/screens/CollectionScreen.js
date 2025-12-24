import { findElementByNormalizedText, holding } from "../../helpers/appStatesHelper";

class CollectionScreen {
    get collectionHeading() {
        return $(`~Collection`);
    }

    get addListOrBinderBtn() {
        return $(`//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View/android.widget.Button`);
    }

    get collectionTab() {
        return $(`~Collection\nTab 1 of 2`);
    }

    get listsTab() {
        return $(`~Lists\nTab 2 of 2`);
    }

    get allCollectionBtn() {
        return $(`~All collection`);
    }

    get editBtn() {
        return $(`~Edit`);
    }

    get deleteBtn() {
        return $(`~Delete`);
    }

//*----------------------- List of actions -----------------------*\\

    async verifyCollectionScreenIsOpen() {
        await expect(this.collectionHeading).toBeDisplayed();
    }

    async openBinderOrListForm() {
        await this.addListOrBinderBtn.click();
    }

    async openCollectionTab() {
        await this.collectionTab.click();
    }

    async openListsTab() {
        await this.listsTab.click();
    }

    async openAllCollectionScreen() {
        await this.allCollectionBtn.click();
    }

    async verifyRecordAppeared(value) {
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

    async openingRecordSettings(x, y) {
        await holding(x, y);
    }

    async verifyRecordSettingsAreOpen() {
        await expect(this.editBtn).toBeDisplayed();
    }

    async clickDeleteBtn() {
        await this.deleteBtn.click();
    }

    async clickEditBtn() {
        await this.editBtn.click();
    }
}

export default new CollectionScreen();