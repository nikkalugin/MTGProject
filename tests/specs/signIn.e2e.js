import { driver } from '@wdio/globals';
import HomeScreen from '../page-objects/screens/HomeScreen';
import SettingsScreen from '../page-objects/screens/SettingsScreen';
import ManaboxScreen from '../page-objects/screens/ManaboxScreen';
import RegisterForm from '../page-objects/forms/RegisterForm';
import SignInForm from '../page-objects/forms/SignInForm';
import { activateApp, terminateApp } from '../helpers/appStatesHelper';
import ResetPasswordForm from '../page-objects/forms/ResetPasswordForm';

describe('Sign In tests', () => {
    beforeEach(async () => {
        await activateApp("skilldevs.com.manabox");
        await HomeScreen.verifyHomePageIsOpen();
        await HomeScreen.openSettingsScreen();
        await SettingsScreen.openManaboxAccScreen();
        await ManaboxScreen.clickSignInBtn();
        await SignInForm.verifySignInScreenIsOpen();
    });

    afterEach(async () => {
        await terminateApp("skilldevs.com.manabox");
    });

    it('All fields are empty errors', async () => {
        await SignInForm.clickSignInBtn();
        await SignInForm.verifyNotValidEmailError();
        await SignInForm.verifyPasswordCantBeEmptyError();
    });

    it('Password cant be empty error notification', async () => {
        await SignInForm.fillingValuesSignInForm('qwe@qwe.com', '');
        await SignInForm.clickSignInBtn();
        await expect(SignInForm.emailNotification).not.toBeDisplayed();
        await SignInForm.verifyPasswordCantBeEmptyError();
    });

    it('Email cant be empty error notification', async () => {
        await SignInForm.fillingValuesSignInForm('', 'Qwerty123!');
        await SignInForm.clickSignInBtn();
        await SignInForm.verifyNotValidEmailError();
        await expect(SignInForm.passwordNotification).not.toBeDisplayed();
    });

    it('Wrong password notification is present', async () => {
        await SignInForm.fillingValuesSignInForm('qwe@qwe.com', 'Qwerty123!');
        await SignInForm.clickSignInBtn();
        await expect(SignInForm.emailNotification).not.toBeDisplayed();
        await expect(SignInForm.passwordNotification).not.toBeDisplayed();
        await SignInForm.verifyWrongPasswordErrorNotification();
    });

    it('Register Page is open', async () => {
        await SignInForm.openRegisterForm();
        await RegisterForm.verifyRegisterFormIsOpen();
    });

    it('Verify Reset Password Popup is open', async () => {
        await SignInForm.openForgotPasswordPopup();
        await ResetPasswordForm.verifyResetPasswordPopupIsOpen();
    });

    it('Verify Reset Password Popup is closed', async () => {
        await SignInForm.openForgotPasswordPopup();
        await ResetPasswordForm.verifyResetPasswordPopupIsOpen();
        await ResetPasswordForm.clickCancelBtn();
        await ResetPasswordForm.verifyResetPasswordPopupIsClosed();
    });
});