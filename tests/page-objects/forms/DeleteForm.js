class DeleteForm {
    get popupDeleteBtn() {
        return $(`//android.widget.Button[@content-desc="Delete"]`);
    }

    get deleteHeading() {
        return $(`//android.view.View[@content-desc="Delete"]`);
    }

    get cancelBtn() {
        return $(`~Cancel`);
    }

//*----------------------- List of actions -----------------------*\\

    async verifyDeletePopupIsOpen() {
        await expect(this.deleteHeading).toBeDisplayed();
    }

    async removeCollectionRecord() {
        await this.popupDeleteBtn.click();
    }

    async clickCancelBtn() {
        await this.cancelBtn.click();
    }
}

export default new DeleteForm();