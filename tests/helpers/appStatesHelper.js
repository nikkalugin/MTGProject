export async function activateApp(appPackage) {
    try {
        await driver.activateApp(appPackage);
    } catch (error) {
        console.error(`Failed to activate app: ${error}`);
        throw error;
    }
}

export async function terminateApp(appPackage) {
    try {
        await driver.terminateApp(appPackage);
    } catch (error) {
        console.error(`Failed to terminate app: ${error}`);
        throw error;
    }
}

export async function hideKeyboard() {
    try {
        await driver.hideKeyboard();
    } catch (error) {
        console.error(`Failed to hide mobile keyboard: ${error}`);
        throw error;
    }
}

export async function back() {
    try {
        await driver.back();
    } catch (error) {
        console.error(`Failed to back: ${error}`);
        throw error;
    }
}