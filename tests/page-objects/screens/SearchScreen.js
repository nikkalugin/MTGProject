import { hideKeyboard } from "../../helpers/appStatesHelper";

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

    // get searchFieldWithValue() {
    //     return $(`android.widget.EditText`);
    // }

    get xBtn() {
        return $(`android=new UiSelector().className("android.view.View").instance(8)`);
    }

    get foundedCard() {
        return $(`~-\nBlack Lotus`);
    }

    async verifySearchScreenIsOpen() {
        await expect(this.searchScreen).toBeDisplayed();
    }

    async fillInValueIntoSearch(value) {
        await this.searchField.click();
        await this.searchField.setValue(value);
        await hideKeyboard();
    }

    async verifyCardByName() {
        await expect(this.foundedCard).toBeDisplayed();
    }

    async verifySearchFieldHasValue(value, text) {
        const searchValue = $(`//android.widget.EditText[@text="${value}"]`)
        await expect(searchValue).toHaveText(text);
    } 

    async clickXBtn() {
        await this.xBtn.click();
    }
}

export default new SearchScreen();