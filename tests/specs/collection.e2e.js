import { expect } from '@wdio/globals';
import { activateApp, terminateApp, back } from '../helpers/appStatesHelper';
import FooterScreen from '../page-objects/screens/FooterScreen';
import CollectionScreen from '../page-objects/screens/CollectionScreen';
import BinderForm from '../page-objects/forms/BinderForm';
import ListForm from '../page-objects/forms/ListForm';
import DeleteForm from '../page-objects/forms/DeleteForm';

describe('Collection tests', () => {
    beforeEach(async () => {
        await activateApp("skilldevs.com.manabox");
        await FooterScreen.openCollectionScreen();
        await CollectionScreen.verifyCollectionScreenIsOpen();
    });

    afterEach(async () => {
        await terminateApp("skilldevs.com.manabox");
    });

    it('Verify Binder Form is open successfully', async () => {
        await CollectionScreen.openBinderOrListForm();
        await BinderForm.verifyBinderFormIsOpen();
    });

    it('Verify Binder Form is successfully closed after clicking Cancel Button', async () => {
        await CollectionScreen.openBinderOrListForm();
        await BinderForm.clickCancelBtn();
        await expect(BinderForm.binderFormHeading).not.toBeDisplayed();
    });

    it('Verify Color Picker in Binder Form is open', async () => {
        await CollectionScreen.openBinderOrListForm();
        await BinderForm.openColorPickerForm();
        await BinderForm.verifyColorPickerIsOpen();
    });

    it('Verify Color Picker in Binder Form is successfully closed', async () => {
        await CollectionScreen.openBinderOrListForm();
        await BinderForm.openColorPickerForm();
        await back();
        await expect(BinderForm.colorHeading).not.toBeDisplayed();
    });

    it(`Verify Name field "Can't be empty" error notification in Binder Form is present`, async () => {
        await CollectionScreen.openBinderOrListForm();
        await BinderForm.clickCreateBtn();
        await BinderForm.verifyNameErrorNotificationIsPresent();
    });

    it('Verify List Form is open from Binder Form', async () => {
        await CollectionScreen.openBinderOrListForm();
        await BinderForm.clickCollectionSwitcher();
        await ListForm.verifyListFormIsOpen();
    });

    it('Verify List Form is open', async () => {
        await CollectionScreen.openListsTab();
        await CollectionScreen.openBinderOrListForm();
        await ListForm.verifyListFormIsOpen();
    });

    it('Verify List Form is closed after clicking Cancel button', async () => {
        await CollectionScreen.openListsTab();
        await CollectionScreen.openBinderOrListForm();
        await ListForm.clickCancelBtn();
        await expect(ListForm.listHeading).not.toBeDisplayed(); 
    });

    it('Verify Color Picker in List Form is open', async () => {
        await CollectionScreen.openListsTab();
        await CollectionScreen.openBinderOrListForm();
        await ListForm.openColorPickerForm();
        await ListForm.verifyColorPickerIsOpen();
    });

    it('Verify Color Picker in List Form is closed', async () => {
        await CollectionScreen.openListsTab();
        await CollectionScreen.openBinderOrListForm();
        await ListForm.openColorPickerForm();
        await back();
        await expect(ListForm.colorHeading).not.toBeDisplayed();
    });

    it(`Verify Name field "Can't be empty" error notification in List Form is present`, async () => {
        await CollectionScreen.openListsTab();
        await CollectionScreen.openBinderOrListForm();
        await ListForm.clickCreateBtn();
        await ListForm.verifyNameErrorNotificationIsPresent();
    });

    it('Verify Binder Form is open from List Form', async () => {
        await CollectionScreen.openListsTab();
        await CollectionScreen.openBinderOrListForm();
        await ListForm.clickListSwitcher();
        await BinderForm.verifyBinderFormIsOpen();
    });
});

describe('Adding Collection records', async () => {
    beforeEach(async () => {
        await activateApp("skilldevs.com.manabox");
        await FooterScreen.openCollectionScreen();
        await CollectionScreen.verifyCollectionScreenIsOpen();
    });

    afterEach(async () => {
        await CollectionScreen.openingRecordSettings('test');
        await CollectionScreen.clickDeleteBtn();
        await DeleteForm.removeCollectionRecord();
        await CollectionScreen.verifyRecordIsRemoved('test 0 cards');
        await terminateApp("skilldevs.com.manabox");
    });

    it('Add one Collection record', async () => {
        await CollectionScreen.openBinderOrListForm();
        await BinderForm.fillInValueIntoNameField('test');
        await BinderForm.clickCreateBtn();
        await CollectionScreen.verifyCollectionRecordIsDisplayed('test 0 cards'); 
    });
});

describe('Adding List records', async () => {
    beforeEach(async () => {
        await activateApp("skilldevs.com.manabox");
        await FooterScreen.openCollectionScreen();
        await CollectionScreen.verifyCollectionScreenIsOpen();
    });

    afterEach(async () => {
        await CollectionScreen.openingRecordSettings('test');
        await CollectionScreen.clickDeleteBtn();
        await DeleteForm.removeCollectionRecord();
        await CollectionScreen.verifyRecordIsRemoved('test 0 cards');
        await terminateApp("skilldevs.com.manabox");
    });

    it('Add one List record', async () => {
        await CollectionScreen.openListsTab();
        await CollectionScreen.openBinderOrListForm();
        await ListForm.fillInValueIntoNameField('test');
        await ListForm.clickCreateBtn();
        await CollectionScreen.verifyCollectionRecordIsDisplayed('test 0 cards'); 
    });
});

describe('Testing settings tools', async () => {
    beforeEach(async () => {
        await activateApp("skilldevs.com.manabox");
        await FooterScreen.openCollectionScreen();
        await CollectionScreen.verifyCollectionScreenIsOpen();
        await CollectionScreen.openBinderOrListForm();
        await BinderForm.fillInValueIntoNameField('test');
        await BinderForm.clickCreateBtn();
    });

    afterEach(async () => {
        await CollectionScreen.openingRecordSettings('test');
        await CollectionScreen.clickDeleteBtn();
        await DeleteForm.removeCollectionRecord();
        await CollectionScreen.verifyRecordIsRemoved('test 0 cards');
        await terminateApp("skilldevs.com.manabox");
    });

    it('Opening record settings', async () => {
        await CollectionScreen.openingRecordSettings('test');
        await CollectionScreen.verifyRecordSettingsAreOpen();
        await back();
    });

    it('Verify Delete Popup is open', async () => {
        await CollectionScreen.openingRecordSettings('test');
        await CollectionScreen.clickDeleteBtn();
        await DeleteForm.verifyDeletePopupIsOpen();
        await back();
    });

    it('Verify Delete Popup is closed', async () => {
        await CollectionScreen.openingRecordSettings('test');
        await CollectionScreen.clickDeleteBtn();
        await DeleteForm.clickCancelBtn();
        await expect(DeleteForm.deleteHeading).not.toBeDisplayed();
    });
});

describe('Editing Collection records', () => {
    beforeEach(async () => {
        await activateApp("skilldevs.com.manabox");
        await FooterScreen.openCollectionScreen();
        await CollectionScreen.verifyCollectionScreenIsOpen();
        await CollectionScreen.openBinderOrListForm();
        await BinderForm.fillInValueIntoNameField('test');
        await BinderForm.clickCreateBtn();
    });

    afterEach(async () => {
        await CollectionScreen.openingRecordSettings('ttt');
        await CollectionScreen.clickDeleteBtn();
        await DeleteForm.removeCollectionRecord();
        await CollectionScreen.verifyRecordIsRemoved('ttt 0 cards');
        await terminateApp("skilldevs.com.manabox");
    });

    it('Edit Collection test record', async () => {
        await CollectionScreen.openingRecordSettings('test');
        await CollectionScreen.clickEditBtn();
        await BinderForm.editRecordValue('ttt');
        await BinderForm.clickEditBtn();
        await CollectionScreen.verifyCollectionRecordIsDisplayed('ttt 0 cards');
    });
});

describe('Editing List records', () => {
    beforeEach(async () => {
        await activateApp("skilldevs.com.manabox");
        await FooterScreen.openCollectionScreen();
        await CollectionScreen.verifyCollectionScreenIsOpen();
        await CollectionScreen.openListsTab();
        await CollectionScreen.openBinderOrListForm();
        await ListForm.fillInValueIntoNameField('test');
        await ListForm.clickCreateBtn();
    });

    afterEach(async () => {
        await CollectionScreen.openingRecordSettings('ttt');
        await CollectionScreen.clickDeleteBtn();
        await DeleteForm.removeCollectionRecord();
        await CollectionScreen.verifyRecordIsRemoved('ttt 0 cards');
        await terminateApp("skilldevs.com.manabox");
    });

    it('Edit Collection test record', async () => {
        await CollectionScreen.openingRecordSettings('test');
        await CollectionScreen.clickEditBtn();
        await ListForm.editRecordValue('ttt');
        await ListForm.clickEditBtn();
        await CollectionScreen.verifyCollectionRecordIsDisplayed('ttt 0 cards');
    });
});