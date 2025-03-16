import { test, expect } from '@playwright/test';

test('Like posts', async ({ page }) => {

    // Navigate to login page
    await page.goto('https://x.com/i/flow/login');

    // Perform login (replace with actual selectors and credentials)
    await page.fill('//input[@name="text"]', 'littlefingerschemes@outlook.com');
    await page.click('//span[text()="Next"]');
    // await page.fill('//input[@name="text"]', 'PBaeilish15925');
    const input = page.locator('//input[@name="text"]');
    await input.fill('PBaeilish15925');
    await input.press('Enter');
    await page.fill('input[name="password"]', 'Test@1234');
    await page.click('//span[text()="Log in"]');
    await page.click('//span[text()="Following"]');


    // Navigate to the "Following" section

    await page.waitForSelector('//article'); // Wait for posts to load

    let likedCount = 0;
    let previousHeight = 0;

    while (likedCount < 3) {
    // Get all visible posts
    const posts = await page.$$('//article');

    for (const post of posts) {
        if (likedCount >= 3) break;

        // Find the like button inside the post
        const likeButton = await post.$('//button[@data-testid="like"]');

        if (likeButton) {
            await likeButton.click();
            likedCount++;
            console.log(`Liked post ${likedCount}`);
            await page.waitForTimeout(500); // Mimic human behavior
        }
    }

    if (likedCount < 3) {
    // Scroll down to load more posts
        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight);
        });

        await page.waitForTimeout(2000); // Wait for new posts to load

        // Check if we have reached the end of the page (optional)
        const newHeight = await page.evaluate(() => document.body.scrollHeight);
        if (newHeight === previousHeight) break; // Stop if no new content is loaded
        previousHeight = newHeight;
        }
    }

});
