import { driver } from '@wdio/globals';
import { activateApp, terminateApp, back } from '../helpers/appStatesHelper';
import FooterScreen from '../page-objects/screens/FooterScreen';
import SearchScreen from '../page-objects/screens/SearchScreen';

describe('Search tests', () => {
    beforeEach(async () => {
        await activateApp("skilldevs.com.manabox");
        await FooterScreen.openSearchScreen();
        await SearchScreen.verifySearchScreenIsOpen();
    });

    afterEach(async () => {
        await terminateApp("skilldevs.com.manabox");
    });

    it('Search is working', async () => {
        await SearchScreen.fillInValueIntoSearch('Black Lotus');
        await SearchScreen.verifyCardByName('- Black Lotus');
    });

    it('Search still contains value after clicking on "Back" btn', async () => {
        await SearchScreen.fillInValueIntoSearch('Black Lotus');
        await SearchScreen.verifyCardByName('- Black Lotus');
        await back();
        await SearchScreen.verifySearchFieldHasValue('Black Lotus', 'Black Lotus');
    });
});