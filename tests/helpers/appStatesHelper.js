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

export async function scrollDown(times = 1) {
    try {
        for (let i = 0; i < times; i++) {
            await driver.performActions([
                {
                    type: 'pointer',
                    id: 'finger1',
                    parameters: { pointerType: 'touch' },
                    actions: [
                        { type: 'pointerMove', duration: 0, x: 540, y: 1500 },
                        { type: 'pointerDown', button: 0 },
                        { type: 'pause', duration: 250 },
                        { type: 'pointerMove', duration: 1000, x: 540, y: 700 },
                        { type: 'pointerUp', button: 0 },
                        { type: 'pause', duration: 250 }
                    ]
                }
            ]);
            await driver.releaseActions();
        }
    } catch (error) {
        console.error(`Failed to scrolling down ${error}`);
        throw error;
    }
}

// export async function scrollLeft(times = 1) {
//     try {
//         for (let i = 0; i < times; i++) {
//             await driver.performActions([
//                 {
//                     type: 'pointer',
//                     id: 'finger1',
//                     parameters: { pointerType: 'touch' },
//                     actions: [
//                         { type: 'pointerMove', duration: 0, x: 1000, y: 1200 },
//                         { type: 'pointerDown', button: 0 },
//                         { type: 'pause', duration: 250 },
//                         { type: 'pointerMove', duration: 1000, x: 400, y: 1200 },
//                         { type: 'pointerUp', button: 0 },
//                         { type: 'pause', duration: 250 }
//                     ]
//                 }
//             ]);
//         }
//     } catch (error) {
//         console.error(`Failed to scrolling left ${error}`);
//         throw error;
//     }
// }

// export async function scrollRight(times = 1) {
//     try {
//         for (let i = 0; i < times; i++) {
//             await driver.performActions([
//                 {
//                     type: 'pointer',
//                     id: 'finger1',
//                     parameters: { pointerType: 'touch' },
//                     actions: [
//                         { type: 'pointerMove', duration: 0, x: 100, y: 1200 },
//                         { type: 'pointerDown', button: 0 },
//                         { type: 'pause', duration: 250 },
//                         { type: 'pointerMove', duration: 1000, x: 700, y: 1200 },
//                         { type: 'pointerUp', button: 0 },
//                         { type: 'pause', duration: 250 }
//                     ]
//                 }
//             ]);
//         }
//     } catch (error) {
//         console.error(`Failed to scrolling right ${error}`);
//         throw error;
//     }
// }

export function normalizeCardName(rawText) {
    return rawText
        .replace(/-\s*\n/g, '')
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}