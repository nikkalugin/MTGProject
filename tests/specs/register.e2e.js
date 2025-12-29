import { driver } from '@wdio/globals';
import HomeScreen from '../page-objects/screens/HomeScreen';
import SettingsScreen from '../page-objects/screens/SettingsScreen';
import ManaboxScreen from '../page-objects/screens/ManaboxScreen';
import RegisterForm from '../page-objects/forms/RegisterForm';
import SignInForm from '../page-objects/forms/SignInForm';
import { activateApp, terminateApp } from '../helpers/appStatesHelper';

describe('Register tests', () => {
    beforeEach(async () => {
        await activateApp("skilldevs.com.manabox");
        await HomeScreen.verifyHomePageIsOpen();
        await HomeScreen.openSettingsScreen();
        await SettingsScreen.openManaboxAccScreen();
        await ManaboxScreen.clickRegisterBtn();
        await RegisterForm.verifyRegisterFormIsOpen();
    });

    afterEach(async () => {
        await terminateApp("skilldevs.com.manabox");
    });

    it('All fields are empty errors', async () => {
        await RegisterForm.clickRegisterBtn();
        await RegisterForm.verifyNotValidEmailError();
        await RegisterForm.verifyWeakPasswordError();
        await RegisterForm.verifyWeakRepeatPasswordError();
    });

    it('Passwords are weak error notifications', async () => {
        await RegisterForm.fillingValuesRegisterForm('qwe@qwe.com', '', '');
        await RegisterForm.clickRegisterBtn();
        await expect(RegisterForm.emailNotification).not.toBeDisplayed();
        await RegisterForm.verifyWeakPasswordError();
        await RegisterForm.verifyWeakRepeatPasswordError();
    });

    it('Email and repeat password fields are empty errors', async () => {
        await RegisterForm.fillingValuesRegisterForm('', 'Qwerty123!', '');
        await RegisterForm.clickRegisterBtn();
        await RegisterForm.verifyNotValidEmailError();
        await RegisterForm.verifyPasswordsDontMatchErrors();
    });

    it('Sign In Page is open', async () => {
        await RegisterForm.openSignInForm();
        await SignInForm.verifySignInScreenIsOpen();
    });
});