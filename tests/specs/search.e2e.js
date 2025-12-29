import { driver } from '@wdio/globals';
import { activateApp, terminateApp, back, scrollDown } from '../helpers/appStatesHelper';
import FooterScreen from '../page-objects/screens/FooterScreen';
import SearchScreen from '../page-objects/screens/SearchScreen';
import CardForm from '../page-objects/forms/CardForm';

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
        await SearchScreen.verifyCardIsDisplayed('Black Lotus');
    });

    it('Search still contains value after clicking on "Back" btn', async () => {
        await SearchScreen.fillInValueIntoSearch('Black Lotus');
        await SearchScreen.verifyCardIsDisplayed('Black Lotus');
        await back();
        await SearchScreen.verifySearchFieldHasValue('Black Lotus');
    });

    it('Filter legalities are working', async () => {
        await SearchScreen.clickFilterLegalityValue('Standard');
        await SearchScreen.verifyLegalityFilterValueIsDisplayed('Standard Legal');
        await SearchScreen.clickFilterLegalityValue('Standard Legal');
        await SearchScreen.verifyLegalityFilterValueIsDisplayed('Standard Banned');
        await SearchScreen.clickFilterLegalityValue('Standard Banned');
        await SearchScreen.verifyLegalityFilterValueIsDisplayed('Standard Not legal');
        await SearchScreen.clickFilterLegalityValue('Standard Not legal');
        await SearchScreen.verifyLegalityFilterValueIsDisplayed('Standard');
    });

    it('Remove filter value by using Bin button', async () => {
        await SearchScreen.clickFilterLegalityValue('Standard');
        await SearchScreen.verifyLegalityFilterValueIsDisplayed('Standard Legal');
        await SearchScreen.clickBinBtn();
        await SearchScreen.verifyLegalityFilterValueIsDisplayed('Standard');
    });

    it('Verify that filter is still enable after switching to other pages', async () => {
        await SearchScreen.clickFilterLegalityValue('Standard');
        await SearchScreen.verifyLegalityFilterValueIsDisplayed('Standard Legal');
        await SearchScreen.openSetsTab();
        await SearchScreen.openCardsTab();
        await SearchScreen.verifyLegalityFilterValueIsDisplayed('Standard Legal');
    });

    it('Verify filter values are open and closed', async () => {
        await SearchScreen.openMoreFilterValues();
        await SearchScreen.verifyLegalityFilterValueIsDisplayed('Gladiator');
        await SearchScreen.closeFilterValues();
        await SearchScreen.verifyFilterValueIsntVisible('Gladiator');
    });

    it('Verify one hidden filter value is present after clicking it', async () => {
        await SearchScreen.openMoreFilterValues();
        await SearchScreen.clickFilterLegalityValue('PreDH');
        await SearchScreen.closeFilterValues();
        await SearchScreen.verifyLegalityFilterValueIsDisplayed('PreDH Legal');
    });

    it('Verify chosen Type Line is displayed', async () => {
        await SearchScreen.fillInTypeLineValue('Artifact');
        await SearchScreen.verifyFilterConditionsAreDisplayed(['IS', 'Artifact']);
    });

    it('Verify Bin button is work on List Screen', async () => {
        await SearchScreen.fillInTypeLineValue('Creature');
        await SearchScreen.clickApproveBtn();
        await SearchScreen.clickBinBtn();
        await SearchScreen.verifyFilterValueIsntVisible('Creature');
    });

    it('Add values into Stats dropdown', async () => {
        await SearchScreen.addStatsValue(3);
        await SearchScreen.verifyFilterConditionsAreDisplayed('3');
    });

    it('Open first card of the list and verify its Type = Creature', async () => {
        await SearchScreen.fillInTypeLineValue('Creature');
        await SearchScreen.clickApproveBtn();
        await SearchScreen.openFirstCardOnList();
        await CardForm.verifyCardNameIsDisplayed('"Lifetime" Pass Holder');
        await CardForm.verifyCardByType(`Creature — Zombie Guest 2/1`);
    });

    it('Verify chosen card has necessary Legal legality', async () => {
        await SearchScreen.openMoreFilterValues();
        await SearchScreen.clickFilterLegalityValue('PreDH');
        await SearchScreen.clickApproveBtn();
        await SearchScreen.openFirstCardOnList();
        await CardForm.openRulingStats();
        await scrollDown();
        await CardForm.verifyLegalityValueIsPresent('Legal PreDH');
    });

    it('Verify chosen card has necessary Banned Legality', async () => {
        await SearchScreen.clickFilterLegalityValue('Brawl');
        await SearchScreen.clickFilterLegalityValue('Brawl Legal');
        await SearchScreen.verifyLegalityFilterValueIsDisplayed('Brawl Banned');
        await SearchScreen.clickApproveBtn();
        await SearchScreen.openFirstCardOnList();
        await CardForm.openRulingStats();
        await scrollDown();
        await CardForm.verifyLegalityValueIsPresent('Banned Brawl');
    });

    it('Verify chosen card has necessary Not Legal legality', async () => {
        await SearchScreen.clickFilterLegalityValue('Historic');
        await SearchScreen.clickFilterLegalityValue('Historic Legal');
        await SearchScreen.clickFilterLegalityValue('Historic Banned');
        await SearchScreen.verifyLegalityFilterValueIsDisplayed('Historic Not legal');
        await SearchScreen.clickApproveBtn();
        await SearchScreen.openFirstCardOnList();
        await CardForm.openRulingStats();
        await scrollDown();
        await CardForm.verifyLegalityValueIsPresent('Not legal Historic');
    });

    it('Open Sets Screen and verify first sets record', async () => {
        await SearchScreen.openSetsTab();
        await SearchScreen.verifySetRecordIsDisplayed('Marvel Super Heroes Commander (MSC)');
    });

    it('Open first Sets record and verify it', async () => {
        await SearchScreen.openSetsTab();
        await SearchScreen.clickNecessarySetRecord('Marvel Super Heroes Commander (MSC) 4 cards SPOILER 26/06/2026');
        await SearchScreen.verifySetHeadingIsDisplayed('Marvel Super Heroes Commander')
    });

    it('Open first card in first set record and verify it', async () => {
        await SearchScreen.openSetsTab();
        await SearchScreen.clickNecessarySetRecord('Marvel Super Heroes Commander (MSC) 4 cards SPOILER 26/06/2026');
        await SearchScreen.openFirstCardOnList();
        await CardForm.verifyCardNameIsDisplayed('Invisible Woman');
    });

    it('Verify Language list is open', async () => {
        await SearchScreen.clickNecessaryLanguageValue('English');
        await SearchScreen.verifyLanguageListIsOpen();
    });

    it('Open Language List, choose Japanese language and verify it has chosen', async () => {
        await SearchScreen.clickNecessaryLanguageValue('English');
        await SearchScreen.clickNecessaryLanguageValue('Japanese');
        await SearchScreen.verifyLanguageValueIsDisplayed('Japanese');
    });

    it('Scrolling to the next card', async () => {
        await SearchScreen.clickFilterLegalityValue(`Modern`);
        await SearchScreen.clickApproveBtn();
        await SearchScreen.openFirstCardOnList();
        await CardForm.verifyCardNameIsDisplayed('+2 Mace');
        await CardForm.openNextSecondCard();
        await CardForm.verifyCardNameIsDisplayed('A Killer Among Us');
    });

    it('Scrolling to the previous card', async () => {
        await SearchScreen.clickFilterLegalityValue(`Modern`);
        await SearchScreen.clickApproveBtn();
        await SearchScreen.openSecondCardOnList();
        await CardForm.verifyCardNameIsDisplayed('A Killer Among Us');
        await CardForm.openPreviousCard();
        await CardForm.verifyCardNameIsDisplayed('+2 Mace');
    });

    it.skip('some test blah blah blah', async () => {
        await SearchScreen.verifySearchScreenIsOpen();
    });
});