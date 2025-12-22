import { hideKeyboard } from "../../helpers/appStatesHelper";

class SignInForm {
    get signInHeading() {
        return $('~Sign in with email');
    }

    get emailField() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
    }

    get passwordField() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
    }

    get forgotYourPasswordBtn() {
        return $('~Forgot your password?');
    }

    get signInBtn() {
        return $('~Sign in');
    }

    get signInWithGoogleBtn() {
        return $('~Sign in with Google');
    }

    get signInWithAppleBtn() {
        return $('~Sign in with Apple');
    }

    get registerBtn() {
        return $('~Not registered? Register');
    }

    get emailNotification() {
        return $('~Not valid email');
    }

    get passwordNotification() {
        return $(`~Can't be empty`);
    }

    get backBtn() {
        return $('~Back');
    }

    get wrongPasswordErrorNotification() {
        return $('~Wrong password');
    }

    async verifySignInScreenIsOpen() {
        await expect(this.signInHeading).toBeDisplayed();
    }

    async verifySignInScreenIsClosed() {
        await expect(this.signInHeading).not.toBeDisplayed();
    }

    async fillingValuesSignInForm(email, password) {
        await this.emailField.click();
        await this.emailField.setValue(email);
        await this.passwordField.click();
        await this.passwordField.setValue(password);
        await hideKeyboard();
    }

    async clickSignInBtn() {
        await this.signInBtn.click();
    }

    async verifyNotValidEmailError() {
        await expect(this.emailNotification).toBeDisplayed();
    }

    async verifyPasswordCantBeEmptyError() {
        await expect(this.passwordNotification).toBeDisplayed();
    }

    async verifyWrongPasswordErrorNotification() {
        await expect(this.wrongPasswordErrorNotification).toBeDisplayed();
    }

    async clickBackBtn() {
        await this.backBtn.click();
    }

    async openForgotPasswordPopup() {
        await this.forgotYourPasswordBtn.click();
    }

    async openRegisterForm() {
        await this.registerBtn.click();
    }
}

export default new SignInForm();