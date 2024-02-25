const { Builder, Browser, By, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
  await driver.get("http://localhost:8000");
});

afterEach(async () => {
  await driver.quit();
});


describe("Duel Duo tests", () => {
  test("page loads with title", async () => {
    await driver.wait(until.titleIs("Duel Duo"), 10000);
  });

  test("clicking the Draw button displays the div with id = 'choices'", async () => {
    await driver.findElement(By.id("draw")).click();
    const choicesDiv = await driver.findElement(By.id("choices"));
    const choiceDivdisplayed = await choicesDiv.isDisplayed();
    expect(choiceDivdisplayed).toBe(true);
  });

  test("clicking an 'Add to Duo' button displays the player-duo div", async () => {
    await driver.findElement(By.id("draw")).click();
    await driver.wait(until.elementLocated(By.className("bot-btn")), 10000).click();
    const playerDuoDiv = await driver.findElement(By.id("player-duo"));
    const playerDuoDivdisplayed = await playerDuoDiv.isDisplayed();
    expect(playerDuoDivdisplayed).toBe(true);
  });

  test("removing a bot from 'player-duo' moves it back to 'choices'", async () => {
    await driver.findElement(By.id("draw")).click();

    const addOneBotButton = await driver.wait(until.elementLocated(By.className("bot-btn")), 10000);
    await addOneBotButton.click();
    
    let choicesDiv = await driver.findElement(By.id("choices"));
    let botsInChoices = await choicesDiv.findElements(By.css(".bot-card"));
    expect(botsInChoices.length).toBe(4);

    const removeButton = await driver.findElement(By.css("button.bot-btn[onclick*='putBotBack']"),10000);
    await removeButton.click();
    let updatedBotsInChoices = await choicesDiv.findElements(By.css(".bot-card"));
    expect(updatedBotsInChoices.length).toBe(5);
  });
});