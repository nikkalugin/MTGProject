import { hideKeyboard } from "../../helpers/appStatesHelper";

class RegisterForm {
    get registerHeading() {
        return $('~Register with email');
    }

    get emailField() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
    }

    get passwordField() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
    }

    get repeatPasswordField() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(2)');
    }

    get registerBtn() {
        return $('~Register');
    }

    get signInWithGoogleBtn() {
        return $('~Sign in with Google');
    }

    get signInWithAppleBtn() {
        return $('~Sign in with Apple');
    }

    get signInBtn() {
        return $('~Already an user? Sign in');
    }

    get emailNotification() {
        return $('~Not valid email');
    }

    get passwordNotification() {
        return $('(//android.view.View[@content-desc="Weak password, need at least 6 characters"])[1]');
    }

    get passwordErrorPasswordsDontMatch() {
        return $(`android=new UiSelector().description("Passwords don't match").instance(0)`);
    }

    get repeatPasswordErrorPasswordsDontMatch() {
        return $(`android=new UiSelector().description("Passwords don't match").instance(1)`);
    }

    get repeatPasswordNotification() {
        return $('(//android.view.View[@content-desc="Weak password, need at least 6 characters"])[2]');
    }

    get backBtn() {
        return $('~Back');
    }

    async verifyRegisterFormIsOpen() {
        await expect(this.registerHeading).toBeDisplayed();
    }

    async verifyRegisterFormIsClosed() {
        await expect(this.registerHeading).not.toBeDisplayed();
    }

    async fillingValuesRegisterForm(email, password, resetPassword) {
        await this.emailField.click();
        await this.emailField.setValue(email);
        await this.passwordField.click();
        await this.passwordField.setValue(password);
        await this.repeatPasswordField.click();
        await this.repeatPasswordField.setValue(resetPassword);
        await hideKeyboard();
    }

    async clickRegisterBtn() {
        await this.registerBtn.click();
    }

    async verifyNotValidEmailError() {
        await expect(this.emailNotification).toBeDisplayed();
    }

    async verifyWeakPasswordError() {
        await expect(this.passwordNotification).toBeDisplayed();
    }

    async verifyWeakRepeatPasswordError() {
        await expect(this.repeatPasswordNotification).toBeDisplayed();
    }

    async verifyPasswordsDontMatchErrors() {
        await expect(this.passwordErrorPasswordsDontMatch).toBeDisplayed();
        await expect(this.repeatPasswordErrorPasswordsDontMatch).toBeDisplayed();
    }

    async clickBackBtn() {
        await this.backBtn.click();
    }

    async openSignInForm() {
        await this.signInBtn.click();
    }
}

export default new RegisterForm();