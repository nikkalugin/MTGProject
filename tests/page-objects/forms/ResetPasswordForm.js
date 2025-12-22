import { hideKeyboard } from "../../helpers/appStatesHelper";

class ResetPasswordForm {
    get resetPasswordHeading() {
        return $('~Reset password');
    }

    get emailField() {
        return $('android.widget.EditText');
    }

    get cancelBtn() {
        return $('~Cancel');
    }

    get submitBtn() {
        return $('~Submit');
    }

    get emailErrorNotification() {
        return $('~Not valid email');
    }

    async verifyResetPasswordPopupIsOpen() {
        await expect(this.resetPasswordHeading).toBeDisplayed();
    }

    async verifyResetPasswordPopupIsClosed() {
        await expect(this.resetPasswordHeading).not.toBeDisplayed();
    }

    async fillInEmailValue(email) {
        await this.emailField.click();
        await this.emailField.setValue(email);
        await hideKeyboard();
    }

    async clickCancelBtn() {
        await this.cancelBtn.click();
    }

    async clickSubmitBtn() {
        await this.submitBtn.click();
    }
}

export default new ResetPasswordForm();