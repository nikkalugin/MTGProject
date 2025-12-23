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
        await SearchScreen.verifyValueAppeared('Black Lotus');
    });

    it('Search still contains value after clicking on "Back" btn', async () => {
        await SearchScreen.fillInValueIntoSearch('Black Lotus');
        await SearchScreen.verifyValueAppeared('Black Lotus');
        await back();
        await SearchScreen.verifySearchFieldHasValue('Black Lotus');
    });

    it('Filter legalities are working', async () => {
        await SearchScreen.clickFilterLegalityValue('Standard');
        await SearchScreen.verifyValueAppeared('Standard Legal');
        await SearchScreen.clickFilterLegalityValue('Standard Legal');
        await SearchScreen.verifyValueAppeared('Standard Banned');
        await SearchScreen.clickFilterLegalityValue('Standard Banned');
        await SearchScreen.verifyValueAppeared('Standard Not legal');
        await SearchScreen.clickFilterLegalityValue('Standard Not legal');
        await SearchScreen.verifyValueAppeared('Standard');
    });

    it('Remove filter value by using Bin button', async () => {
        await SearchScreen.clickFilterLegalityValue('Standard');
        await SearchScreen.verifyValueAppeared('Standard Legal');
        await SearchScreen.clickBinBtn();
        await SearchScreen.verifyValueAppeared('Standard');
    });

    it('Verify that filter is still enable after switching to other pages', async () => {
        await SearchScreen.clickFilterLegalityValue('Standard');
        await SearchScreen.verifyValueAppeared('Standard Legal');
        await SearchScreen.openSetsTab();
        await SearchScreen.openCardsTab();
        await SearchScreen.verifyValueAppeared('Standard Legal');
    });

    it('Verify filter values are open and closed', async () => {
        await SearchScreen.openMoreFilterValues();
        await SearchScreen.verifyValueAppeared('Gladiator');
        await SearchScreen.closeFilterValues();
        await SearchScreen.verifyFilterValueIsntVisible('Gladiator');
    });

    it('Verify one hidden filter value is present after clicking it', async () => {
        await SearchScreen.openMoreFilterValues();
        await SearchScreen.clickFilterLegalityValue('PreDH');
        await SearchScreen.closeFilterValues();
        await SearchScreen.verifyValueAppeared('PreDH Legal')
    });

    it('Verify chosen Type Line is displayed', async () => {
        await SearchScreen.fillInTypeLineValue('Artifact');
        await SearchScreen.verifyValueAppeared(['IS', 'Artifact']);
    });

    it('Verify Bin button is work on List Screen', async () => {
        await SearchScreen.fillInTypeLineValue('Creature');
        await SearchScreen.verifyValueAppeared(['IS', 'Creature']);
        await SearchScreen.clickApproveBtn();
        await SearchScreen.clickBinBtn();
        await SearchScreen.verifyFilterValueIsntVisible('Creature');
    });

    it.only('Add values into Stats dropdown', async () => {
        await SearchScreen.addStatsValue(3);
        await SearchScreen.verifyValueAppeared(['=', '3']);
    });
});