class BinderForm {
    get binderFormHeading() {
        return $(`~New binder`);
    }

    get nameField() {
        return $(`android.widget.EditText`);
    }

    get imageBtn() {
        return $(`~Image`);
    }

    get cancelBtn() {
        return $(`~Cancel`);
    }

    get createBtn() {
        return $(`~Create`);
    }

    get colorPickerBtn() {
        return $(`//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View[1]/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View`);
    }

    get colorHeading() {
        return $(`~Color`);
    }

    get nameErrorNotification() {
        return $(`~Can't be empty`);
    }

    get editBtn() {
        return $(`~Edit`);
    }

    get collectionSwitcher() {
        return $(`~Collection`);
    }

//*----------------------- List of actions -----------------------*\\

    async verifyBinderFormIsOpen() {
        await expect(this.binderFormHeading).toBeDisplayed();
    }

    async fillInValueIntoNameField(value) {
        await this.nameField.click();
        await this.nameField.setValue(value);
    }

    async editRecordValue(value) {
        await this.nameField.click();
        await this.nameField.clearValue();
        await this.nameField.setValue(value);
    }

    async clickCancelBtn() {
        await this.cancelBtn.click();
    }

    async clickEditBtn() {
        await this.editBtn.click();
    }

    async clickCreateBtn() {
        await this.createBtn.click();
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

    async clickCollectionSwitcher() {
        await this.collectionSwitcher.click();
    }
}

export default new BinderForm();