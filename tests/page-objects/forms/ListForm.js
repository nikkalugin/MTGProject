class ListForm {
    get listHeading() {
        return $(`~New list`);
    }

    get listSwitcher() {
        return $(`~List`);
    }

    get cancelBtn() {
        return $(`~Cancel`);
    }

    get createBtn() {
        return $(`~Create`);
    }

    get nameField() {
        return $(`android.widget.EditText`);
    }

    get nameErrorNotification() {
        return $(`~Can't be empty`);
    }

    get colorPickerBtn() {
        return $(`//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View[1]/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View`);
    }

    get colorHeading() {
        return $(`~Color`);
    }

//*----------------------- List of actions -----------------------*\\

    async verifyListFormIsOpen() {
        await expect(this.listHeading).toBeDisplayed();
    }

    async clickCancelBtn() {
        await this.cancelBtn.click();
    }

    async clickCreateBtn() {
        await this.createBtn.click();
    }

    async fillInValueIntoNameField(value) {
        await this.nameField.click();
        await this.nameField.setValue(value);
    }

    async clickListSwitcher() {
        await this.listSwitcher.click();
    }

    async openColorPickerForm() {
        await this.colorPickerBtn.click();
    }

    async verifyColorPickerIsOpen() {
        await expect(this.colorHeading).toBeDisplayed();
    }

    async verifyNameErrorNotificationIsPresent() {
        await expect(this.nameErrorNotification).toBeDisplayed();
    }
}

export default new ListForm();