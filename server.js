const express = require("express");
const bots = require("./src/botsData");
const shuffle = require("./src/shuffle");
const Rollbar = require('rollbar')
require('dotenv').config();

const playerRecord = {
  wins: 0,
  losses: 0,
};
const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/public'))


const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});
console.log(process.env.ROLLBAR_ACCESS_TOKEN)

// Add up the total health of all the robots
const calculateTotalHealth = (robots) =>
  robots.reduce((total, { health }) => total + health, 0);

// Add up the total damage of all the attacks of all the robots
const calculateTotalAttack = (robots) =>
  robots
    .map(({ attacks }) =>
      attacks.reduce((total, { damage }) => total + damage, 0)
    )
    .reduce((total, damage) => total + damage, 0);

// Calculate both players' health points after the attacks
const calculateHealthAfterAttack = ({ playerDuo, compDuo }) => {
  const compAttack = calculateTotalAttack(compDuo);
  const playerHealth = calculateTotalHealth(playerDuo);
  const playerAttack = calculateTotalAttack(playerDuo);
  const compHealth = calculateTotalHealth(compDuo);

  return {
    compHealth: compHealth - playerAttack,
    playerHealth: playerHealth - compAttack,
  };
};

app.get("/api/robots", (req, res) => {
  rollbar.info('Show robots')
  try {
    res.status(200).send(botsArr);
    rollbar.info('Show robot successful')
  } catch (error) {
    rollbar.error('ERROR GETTING BOTS')
    console.error("ERROR GETTING BOTS", error);
    res.sendStatus(400);
  }
});

app.get("/api/robots/shuffled", (req, res) => {
  try {
    let shuffled = shuffle(bots);
    rollbar.info('Someone shuffed')
    res.status(200).send(shuffled);
  } catch (error) {
    rollbar.error('ERROR GETTING SHUFFLED BOTS')
    console.error("ERROR GETTING SHUFFLED BOTS", error);
    res.sendStatus(400);
  }
});

app.post("/api/duel", (req, res) => {
  try {
    rollbar.info('Someone started duel')
    const { compDuo, playerDuo } = req.body;
    const { compHealth, playerHealth } = calculateHealthAfterAttack({
      compDuo,
      playerDuo,
    });

    // comparing the total health to determine a winner
    if (compHealth > playerHealth) {
      playerRecord.losses += 1;
      rollbar.info('Display Result')
      res.status(200).send("You lost!");
    } else {
      playerRecord.losses += 1;
      rollbar.info('Display Result')
      res.status(200).send("You won!");
    }
    rollbar.info('Duel Completed')

  } catch (error) {
    console.log("ERROR DUELING", error);
    res.sendStatus(400);
  }
});

app.get("/api/player", (req, res) => {
  try {
    rollbar.info('Display playrecord')
    res.status(200).send(playerRecord);
  } catch (error) {
    rollbar.error('ERROR GETTING PLAYER STATS')
    console.log("ERROR GETTING PLAYER STATS", error);
    res.sendStatus(400);
  }
});

app.listen(8000, () => {
  console.log(`Listening on 8000`);
});
